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

// utility function for table "tassa_soggiorno"

// return all table
const all = async () => {
    return new Promise((resolve, reject) => {

        Connection.query('SELECT * FROM tassa_soggiorno', (err, results) => {
            if(err) {
                return reject(new NotFound('Nessuna tassa di soggiorno registrata'));
            }
            resolve(results);
        });
    });
}

// get tassa from id_tassa
const getTassa = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM tassa_soggiorno ' +
            'WHERE id_tassa = ' +  req.id_tassa + '; ', (err, results) => {
            if(err) {
                return reject(new NotFound('Tassa di soggiorno non trovata'));
            }
            resolve(results);
        });
    });
}

// get tassa from ref_soggiornante
const getTassaSoggiornante = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM tassa_soggiorno ' +
            'WHERE ref_soggiornante = "' +  req.ref_soggiornante + '"', (err, results) => {
            if(err) {
                return reject(new NotFound('Nessuna tassa di soggiorno relativa al soggiornante'));
            }
            resolve(results);
        });
    });
}

// get tassa from ref_prenotazione
const getTassaPrenotazione = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM tassa_soggiorno ' +
            'WHERE ref_prenotazione = ' + req.ref_prenotazione + '; ', (err, results) => {
            if(err) {
                return reject(new NotFound('Nessuna tassa di soggiorno relativa alla prenotazione'));
            }
            resolve(results);
        });
    });
}

// get tassa from ref_proprietario
const getTassaProprietario = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM tassa_soggiorno ' +
            'WHERE ref_proprietario = ' + '"' +  req.ref_proprietario + '"', (err, results) => {
            if(err) {
                return reject(new NotFound('Nessuna tassa di soggiorno relativa al proprietario'));
            }
            resolve(results);
        });
    });
}

// update fields
const updateTassa= async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'UPDATE tassa_soggiorno ' +
            'SET ref_soggiornante = "' + req.ref_soggiornante + '", ref_prenotazione = ' + req.ref_prenotazione + 
            ', ref_proprietario = "' + req.ref_proprietario + '", ammontare = ' + req.ammontare + ' ' +
            'WHERE id_tassa = ' + req.id_tassa + '; ',
            (err, results) => {
                if(err) {
                    return reject(new NotFound('Tassa di soggiorno non trovata'));
                }
                resolve(results);
            }
        );
    });
}

// insert new tassa
const insertTassa = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'INSERT INTO tassa_soggiorno (ref_soggiornante, ref_prenotazione, ref_proprietario, ammontare) VALUES ' +
            '("' + req.ref_soggiornante + '", ' + req.ref_prenotazione + ', "' + 
            req.ref_proprietario + '", ' + req.ammontare + ')',
            (err, results) => {
                if(err) {
                    return reject(new BadRequest("Si è verificato un errore nell'inserimento"));
                }
                resolve(results);
        });
    });
}

module.exports = all;
module.exports = getTassa;
module.exports = getTassaSoggiornante;
module.exports = getTassaPrenotazione;
module.exports = getTassaProprietario;
module.exports = updateTassa;
module.exports = insertTassa;

module.exports = {
    all,
    getTassa,
    getTassaSoggiornante,
    getTassaPrenotazione,
    getTassaProprietario,
    updateTassa,
    insertTassa
}