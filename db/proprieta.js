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

//requiring custom errors 
var { GeneralError, BadRequest, NotFound } = require('../utils/errors');

// utility function for table "proprieta"

// return all table
const all = async () => {
    return new Promise((resolve, reject) => {

        Connection.query('SELECT * FROM proprieta', (err, results) => {
            if(err) {
                return reject(new NotFound('Nessuna proprietà registrata'));
            }
            resolve(results);
        });
    });
}

// get proprieta from id_proprieta
const getProprieta = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE id_proprieta = ' +  req.id_proprieta + '; ', (err, results) => {
            if(err) {
                return reject(new NotFound('Nessuna proprietà trovata'));
            }
            resolve(results);
        });
    });
}

// get proprieta from nome_proprieta
const getProprietaNome = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE nome_proprieta = "' +  req.nome_proprieta + '"', (err, results) => {
            if(err) {
                return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
            }
            resolve(results);
        });
    });
}

// get proprieta from localita
const getProprietaLocalita = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE localita = "' +  req.localita + '"', (err, results) => {
            if(err) {
                return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
            }
            resolve(results);
        });
    });
}

// get proprieta from provincia
const getProprietaProvincia = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE provincia = "' +  req.provincia + '"', (err, results) => {
            if(err) {
                return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
            }
            resolve(results);
        });
    });
}

// get proprieta from tipo_proprieta
const getProprietaTipo = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE tipo_proprieta = "' +  req.tipo_proprieta + '"', (err, results) => {
            if(err) {
                return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
            }
            resolve(results);
        });
    });
}

// get proprieta from tipo_proprieta = cv && ref_proprietario
const getProprietaCVProprietario = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta, casa_vacanza ' +
            'WHERE id_proprieta = ref_proprieta_cv AND ' +
            'tipo_proprieta = "' +  req.tipo_proprieta + '" AND ref_proprietario = "' + req.ref_proprietario + '"; ', 
            (err, results) => {
            if(err) {
                return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
            }
            resolve(results);
        });
    });
}

// get proprieta from tipo_proprieta = bb && ref_proprietario
const getProprietaBBProprietario = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta, b_and_b ' +
            'WHERE id_proprieta = ref_proprieta_bb AND ' +
            'tipo_proprieta = "' +  req.tipo_proprieta + '" AND ref_proprietario = "' + req.ref_proprietario + '"; ', 
            (err, results) => {
            if(err) {
                return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
            }
            resolve(results);
        });
    });
}

// get proprieta from servizi
const getProprietaServizi = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE servizi = "' +  req.servizi + '"', (err, results) => {
            if(err) {
                return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
            }
            resolve(results);
        });
    });
}

// get proprieta from ref_proprietario
const getProprietaProprietario = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE ref_proprietario = "' +  req.ref_proprietario + '"', (err, results) => {
            if(err) {
                return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
            }
            resolve(results);
        });
    });
}

// get proprieta from localita && tipo_proprieta
const getProprietaLocalitaTipo = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE localita = "' +  req.localita + '" AND tipo_proprieta = "' + req.tipo_proprieta + '"', 
            (err, results) => {
            if(err) {
                return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
            }
            resolve(results);
        });
    });
}

// get proprieta from provincia && tipo_proprieta
const getProprietaProvinciaTipo = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE provincia = "' +  req.provincia + '" AND tipo_proprieta = "' + req.tipo_proprieta + '"', 
            (err, results) => {
            if(err) {
                return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
            }
            resolve(results);
        });
    });
}

// get proprieta from localita && servizi
const getProprietaLocalitaServizi = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE localita = "' +  req.localita + '" AND servizi = "' + req.servizi + '"', 
            (err, results) => {
            if(err) {
                return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
            }
            resolve(results);
        });
    });
}

// get proprieta from provincia && servizi
const getProprietaProvinciaServizi = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE provincia = "' +  req.provincia + '" AND servizi = "' + req.servizi + '"', 
            (err, results) => {
            if(err) {
                return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
            }
            resolve(results);
        });
    });
}

// get proprieta from tipo_proprieta && servizi
const getProprietaTipoServizi = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE tipo_proprieta = "' +  req.tipo_proprieta + '" AND servizi = "' + req.servizi + '"', 
            (err, results) => {
            if(err) {
                return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
            }
            resolve(results);
        });
    });
}

// get proprieta from localita && tipo_proprieta && servizi
const getProprietaLocalitaTipoServizi = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE localita = "' +  req.localita + '" AND tipo_proprieta = "' + req.tipo_proprieta + '" AND servizi = "' + req.servizi + '"',
            (err, results) => {
            if(err) {
                return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
            }
            resolve(results);
        });
    });
}

// get proprieta from provincia && tipo_proprieta && servizi
const getProprietaProvinciaTipoServizi = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE provincia = "' +  req.provincia + '" AND tipo_proprieta = "' + req.tipo_proprieta + '" AND servizi = "' + req.servizi + '"',
            (err, results) => {
            if(err) {
                return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
            }
            resolve(results);
        });
    });
}

// elaborazione del form di ricerca di un alloggio, nel caso più generale
// ----------METODO PRINCIPALE DA USARE PER LA RICERCA----------
const ricercaAlloggio = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT @tipo := "' + (req.tipo == '' ? '%%' : req.tipo) + '"; ' +
            'SELECT @localita := "' + (req.localita == '' ? '%%' : req.localita) + '"; ' +
            'SELECT @provincia := "' + (req.provincia == '' ? '%%' : req.provincia) + '"; ' +
            'SELECT @servizi := "' + (req.servizi == '' ? '%%' : req.servizi) + '"; ' +
            'SELECT @posti := ' + (req.posti == '' ? '"%%"' : req.posti) + '; ' +
            'SELECT @tariffa := ' + (req.tariffa == '' ? '"%%"' : req.tariffa) + '; ' +
            'SELECT DISTINCT p.nome_proprieta, p.indirizzo, p.localita, p.tipo_proprieta, p.servizi, ' +
                'IF(@tipo = "cv", c.tariffa_casa, s.tariffa_stanza) AS tariffa, ' +
                'IF(@tipo = "cv", c.posti_letto, s.tipologia) AS posti, p.descrizione ' +
            'FROM proprieta p, casa_vacanza c, b_and_b b, stanza s ' +
            'WHERE p.id_proprieta = IF(@tipo = "cv", c.ref_proprieta_cv, b.ref_proprieta_bb) AND b.ref_proprieta_bb = s.ref_bb AND ' +
                'p.localita LIKE @localita AND p.provincia LIKE @provincia AND p.servizi LIKE @servizi AND ' +
                '(c.posti_letto LIKE @posti OR s.tipologia LIKE @posti) AND (c.tariffa_casa LIKE @tariffa OR s.tariffa_stanza LIKE @tariffa);',
            (err, results) => {
                if(err) {
                    return reject(new NotFound('Nessun alloggio corrisponde ai criteri di ricerca'));
                }
                resolve(results);
            }
        )
    })
}

// update fields
const updateProprieta= async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'UPDATE proprieta ' +
            'SET nome_proprieta = "' + req.nome_proprieta + '", indirizzo = "' + req.indirizzo +
            '", localita = "' + req.localita + '", provincia = "' + req.provincia +
            '", tipo_proprieta = "' + req.tipo_proprieta + '", servizi = "' + req.servizi + '", ref_proprietario = "' + req.ref_proprietario +
            '", descrizione = "' + req.descrizione + '" ' +
            'WHERE id_proprieta= ' + req.id_proprieta+ '; ',
            (err, results) => {
                if(err) {
                    return reject(new NotFound('Proprietà non trovata'));
                }
                resolve(results);
            }
        );
    });
}

// insert new proprieta
const insertProprieta = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'INSERT INTO proprieta (nome_proprieta, indirizzo, localita, provincia, tipo_proprieta, servizi, ref_proprietario, descrizione) VALUES ' +
            '("' + req.nome_proprieta + '", "' + req.indirizzo + '", "' + req.localita + '", "' + req.provincia +
            '", "' + req.tipo_proprieta + '", "' + req.servizi + '", "' + req.ref_proprietario + '", "' + req.descrizione + '"); ',
            (err, results) => {
                if(err) {
                    return reject(new BadRequest("Si è verificato un errore nell'inserimento"));
                }
                resolve(results);
        });
    });
}

module.exports = all;
module.exports = getProprieta;
module.exports = getProprietaNome;
module.exports = getProprietaLocalita;
module.exports = getProprietaProvincia;
module.exports = getProprietaTipo;
module.exports = getProprietaCVProprietario;
module.exports = getProprietaBBProprietario
module.exports = getProprietaServizi;
module.exports = getProprietaProprietario;
module.exports = getProprietaLocalitaTipo;
module.exports = getProprietaProvinciaTipo;
module.exports = getProprietaLocalitaServizi;
module.exports = getProprietaProvinciaServizi;
module.exports = getProprietaTipoServizi;
module.exports = getProprietaLocalitaTipoServizi;
module.exports = getProprietaProvinciaTipoServizi;
module.exports = ricercaAlloggio;
module.exports = updateProprieta;
module.exports = insertProprieta;

module.exports = {
    all,
    getProprieta,
    getProprietaNome,
    getProprietaLocalita,
    getProprietaProvincia,
    getProprietaTipo,
    getProprietaCVProprietario,
    getProprietaBBProprietario,
    getProprietaServizi,
    getProprietaProprietario,
    getProprietaLocalitaTipo,
    getProprietaProvinciaTipo,
    getProprietaLocalitaServizi,
    getProprietaProvinciaServizi,
    getProprietaTipoServizi,
    getProprietaLocalitaTipoServizi,
    getProprietaProvinciaTipoServizi,
    ricercaAlloggio,
    updateProprieta,
    insertProprieta
}