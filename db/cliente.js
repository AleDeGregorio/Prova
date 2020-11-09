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

// utility function for table "cliente"

// return all table
const all = async () => {
    return new Promise((resolve, reject) => {

        Connection.query('SELECT * FROM cliente', (err, results) => {
            if(err) {
                return reject(new GeneralError('Nessun cliente registrato'));
            }
            resolve(results);
        });
    });
}

// get cliente from email_cl
const getUser = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM cliente ' +
            'WHERE email_cl = ' + '"' +  req.email + '"', (err, results) => {
            if(err) {
                return reject(new NotFound('Cliente non trovato'));
            }
            resolve(results);
        });
    });
}

// update fields
const updateUser = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'UPDATE cliente ' +
            'SET nome_cl = "' + req.nome + '", cognome_cl = "' + req.cognome +
            '", data_nascita_cl = "' + req.nascita + '", telefono_cl = "' + req.telefono + '" ' + 
            'WHERE email_cl = "' + req.email + '"',
            (err, results) => {
                if(err) {
                    return reject(new NotFound('Cliente non trovato'));
                }
                resolve(results);
            }
        );
    });
}

// insert new cliente with encrypted password
const insertUser = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT @pass := SHA2("' + req.password + '", 512); ' +
            'INSERT INTO cliente VALUES ' +
            '("' + req.email + '", @pass, "' + req.nome + '", "' + req.cognome + '", "' + 
            req.nascita + '", "' + req.telefono + '"); ',
            (err, results) => {
                if(err) {
                    return reject(new GeneralError("Si è verificato un errore nell'inserimento"));
                }
                resolve(results);
            }
        );
    });
}

// login using encrypted password
const login = async(req, res, next) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' + 
            'FROM cliente ' +
            'WHERE email_cl = "' + req.email + '"; ',
            (err, results) => {
                if(err) {
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Cliente non trovato'));
                }
                else{
                    // istanziamo l'algoritmo di hashing
                    let pwdhash = crypto.createHash('sha512');
                    // cifriamo la password
                    pwdhash.update(req.password);
                    // otteniamo la stringa esadecimale
                    let encpwd = pwdhash.digest('hex');

                    if(encpwd != results[0].password_cl) {
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

/* insert new cliente
const insertUser = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'INSERT INTO cliente VALUES ' +
            '("' + req.email + '", ' + req.password + ', "'  + '", "' + req.nome + '", "' + req.cognome + '", "' + 
            req.nascita + '", "' + req.telefono + '")',
            (err, results) => {
                if(err) {
                    return reject(err);
                }
                resolve(results);
        });
    });
}*/

module.exports = all;
module.exports = getUser;
module.exports = updateUser;
module.exports = insertUser;
module.exports = login;

module.exports = {
    all,
    getUser,
    updateUser,
    insertUser,
    login
}