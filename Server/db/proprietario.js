//var Connection = require('./index');

// connection to mysql db
var mysql = require('mysql');
var Connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'user',
    database: 'progetto',
    password: 'user',
    multipleStatements: true
});


Connection.connect(function(err) {
    if(err) throw err;
});

//requiring crypto for password encrypting
var crypto = require('crypto');
//requiring custom errors 
var { GeneralError, BadRequest, NotFound } = require('../utils/errors');

// utility function for table "proprietario"

// return all table
const all = async () => {
    return new Promise((resolve, reject) => {

        Connection.query('SELECT * FROM proprietario', (err, results) => {
            if(err) {
                return reject(new NotFound('Nessun proprietario registrato'));
            }
            resolve(results);
        });
    });
}

// get proprietario from email_prop
const getUser = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprietario ' +
            'WHERE email_prop_prop = ' + '"' +  req.email + '"', (err, results) => {
            if(err) {
                return reject(new NotFound('Proprietario non trovato'));
            }
            resolve(results);
        });
    });
}

// get guadagni proprietario, from email_prop && range date di ricerca
const getGuadagni = async(req) => {
    return new Promise((resolve, reject) => {
        
        Connection.query(
            'SELECT @prop := "' + req.email + '"; ' +
            'SELECT @data_1 := "' + req.data_1 + '"; ' +
            'SELECT @data_2 := "' + req.data_2 + '"; ' +
            'SELECT pro.email_prop, (SUM(pre.costo) + SUM(pre.caparra)) AS tot_guadagni ' +
            'FROM prenotazione pre, proprietario pro ' +
            'WHERE pre.ref_proprietario = pro.email_prop AND pro.email_prop = @prop AND ' +
            'pre.data_partenza >= @data_1 AND pre.data_partenza <= @data_2 ' +
            'GROUP BY pro.email_prop;',
            (err, results) => {
                if(err) {
                    return reject(new NotFound('Nessun guadagno trovato'));
                }
                resolve(results);
            }
        )
    })
}

// get guadagni proprietario, from email_prop && range date di ricerca && tipo_proprieta
const getGuadagniTipo = async(req) => {
    return new Promise((resolve, reject) => {
        
        Connection.query(
            'SELECT @prop := "' + req.email + '"; ' +
            'SELECT @data_1 := "' + req.data_1 + '"; ' +
            'SELECT @data_2 := "' + req.data_2 + '"; ' +
            'SELECT @tipo := "' + req.tipo + '"; ' +
            'SELECT pro.email_prop, (SUM(pre.costo) + SUM(pre.caparra)) AS tot_guadagni ' +
            'FROM prenotazione pre, proprietario pro, proprieta p ' +
            'WHERE pre.ref_proprietario = pro.email_prop AND pro.email_prop = p.ref_proprietario AND ' +
            ' pre.ref_proprieta = p.id_proprieta AND pro.email_prop = @prop AND p.tipo_proprieta = @tipo AND ' +
            'pre.data_partenza >= @data_1 AND pre.data_partenza <= @data_2 ' +
            'GROUP BY pro.email_prop;',
            (err, results) => {
                if(err) {
                    return reject(new NotFound('Nessun guadagno trovato'));
                }
                resolve(results);
            }
        )
    })
}

// get guadagni proprietario, from email_prop && range date di ricerca && id_proprieta
const getGuadagniProprieta = async(req) => {
    return new Promise((resolve, reject) => {
        
        Connection.query(
            'SELECT @prop := "' + req.email + '"; ' +
            'SELECT @data_1 := "' + req.data_1 + '"; ' +
            'SELECT @data_2 := "' + req.data_2 + '"; ' +
            'SELECT @id := "' + req.id + '"; ' +
            'SELECT pro.email_prop, (SUM(pre.costo) + SUM(pre.caparra)) AS tot_guadagni ' +
            'FROM prenotazione pre, proprietario pro, proprieta p ' +
            'WHERE pre.ref_proprietario = pro.email_prop AND pro.email_prop = p.ref_proprietario AND ' +
            ' pre.ref_proprieta = p.id_proprieta AND pro.email_prop = @prop AND p.id_proprieta = @id AND ' +
            'pre.data_partenza >= @data_1 AND pre.data_partenza <= @data_2 ' +
            'GROUP BY pro.email_prop;',
            (err, results) => {
                if(err) {
                    return reject(new NotFound('Nessun guadagno trovato'));
                }
                resolve(results);
            }
        )
    })
}

// update fields
const updateUser= async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'UPDATE proprietario ' +
            'SET nome_prop = "' + req.nome + '", cognome_prop = "' + req.cognome +
            '", data_nascita_prop = "' + req.nascita + '", num_documento = "' + req.num_documento +
            '", telefono_prop = "' + req.telefono + '" ' +
            'WHERE email_prop = "' + req.email+ '"',
            (err, results) => {
                if(err) {
                    return reject(new NotFound('Nessun proprietario trovato'));
                }
                resolve(results);
            }
        );
    });
}

/* insert new proprietario
const insertUser = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'INSERT INTO proprietario VALUES ' +
            '("' + req.cf + '", "' + req.nome + '", "' + req.cognome + '", "' + req.nascita + '", "' + req.num_documento +
            '", "' + req.telefono + '", "' + req.email + '", "' + req.password + '")',
            (err, results) => {
                if(err) {
                    return reject(err);
                }
                resolve(results);
        });
    });
}*/

// insert new proprietario with encrypted password
const insertUser = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT @pass := SHA2("' + req.password + '", 512); ' +
            'INSERT INTO proprietario VALUES ' +
            '("' + req.email + '", @pass, "' + req.nome + '", "' + req.cognome + '", "' + req.nascita + '", "' + req.num_documento +
            '", "' + req.telefono + '", NULL); ',
            (err, results) => {
                if(err) {
                    return reject(new BadRequest("Si è verificato un errore nell'inserimento"));
                }
                resolve(results);
            }
        )
    });
}

// update fields
const invioDati = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'UPDATE proprietario ' +
            'SET ultimo_invio_dati = "' + req.data + '" ' +
            'WHERE email_prop = "' + req.email+ '"; ',
            (err, results) => {
                if(err) {
                    return reject(new NotFound('Nessun proprietario trovato'));
                }
                resolve(results);
            }
        );
    });
}

// get ultima data invio dati ufficio turismo
const getDataInvio = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT ultimo_invio_dati ' +
            'FROM proprietario ' +
            'WHERE email_prop = "' + req.email + '"; ',
            (err, results) => {
                if(err) {
                    return reject(new NotFound('Nessun proprietario trovato'));
                }
                resolve(results);
            }
        );
    });
}

// login using encrypted password
const login = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' + 
            'FROM proprietario ' +
            'WHERE email_prop = "' + req.email + '"; ',
            (err, results) => {
                if(err) {
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Proprietario non trovato'));
                }
                else{
                    // istanziamo l'algoritmo di hashing
                    let pwdhash = crypto.createHash('sha512');
                    // cifriamo la password
                    pwdhash.update(req.password);
                    // otteniamo la stringa esadecimale
                    let encpwd = pwdhash.digest('hex');

                    if(encpwd != results[0].password_prop) {
                        return reject(new BadRequest('Password errata'));
                    }
                    else {
                        console.log('Utente autenticato');
                        resolve(results);
                    }
                }
            }
        );
    });
}


module.exports = all;
module.exports = getUser;
module.exports = getGuadagni;
module.exports = getGuadagniTipo;
module.exports = getGuadagniProprieta;
module.exports = updateUser;
module.exports = invioDati;
module.exports = getDataInvio;
module.exports = insertUser;
module.exports = login;

module.exports = {
    all,
    getUser,
    getGuadagni,
    getGuadagniTipo,
    getGuadagniProprieta,
    updateUser,
    invioDati,
    getDataInvio,
    insertUser,
    login
}