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

// utility function for table "soggiornante"

// return all table
const all = async () => {
    return new Promise((resolve, reject) => {

        Connection.query('SELECT * FROM soggiornante', (err, results) => {
            if(err) {
                return reject(new NotFound('Nessun soggiornante registrato'));
            }
            resolve(results);
        });
    });
}

// get soggiornante from cf
const getSoggiornante = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM soggiornante ' +
            'WHERE cf_sogg = ' + '"' +  req.cf + '"', (err, results) => {
            if(err) {
                return reject(new NotFound('Soggiornante non trovato'));
            }
            resolve(results);
        });
    });
}

// update fields
const updateSoggiornante= async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'UPDATE soggiornante ' +
            'SET nome = "' + req.nome + '", cognome = "' + req.cognome +
            '", nascita = "' + req.nascita + '" ' +
            'WHERE cf_sogg = "' + req.cf+ '"',
            (err, results) => {
                if(err) {
                    return reject(new NotFound('Nessun soggiornante trovato'));
                }
                resolve(results);
            }
        );
    });
}

// insert new soggiornante
const insertSoggiornante = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'INSERT INTO soggiornante VALUES ' +
            '("' + req.cf + '", "' + req.nome + '", "' + req.cognome + '", "' + req.nascita +  '")',
            (err, results) => {
                if(err) {
                    return reject(new NotFound("Si è verificato un errore nell'inserimento"));
                }
                resolve(results);
        });
    });
}

module.exports = all;
module.exports = getSoggiornante;
module.exports = updateSoggiornante;
module.exports = insertSoggiornante;

module.exports = {
    all,
    getSoggiornante,
    updateSoggiornante,
    insertSoggiornante
}