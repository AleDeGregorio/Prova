//var Connection = require('./index');
// prova
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

// utility function for table "b_and_b"

// return all table
const all = async () => {
    return new Promise((resolve, reject) => {

        Connection.query('SELECT * FROM b_and_b', (err, results) => {
            if(err) {
                return reject(new NotFound('Nessun b&b registrato'));
            }
            resolve(results);
        });
    });
}

// get b&b from ref_proprieta_bb
const getBB = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM b_and_b ' +
            'WHERE ref_proprieta_bb = ' + req.ref_proprieta_bb + '; ', (err, results) => {
            if(err) {
                return reject(new NotFound('Nessun b&b relativo al proprietario'));
            }
            resolve(results);
        });
    });
}

// update fields
const updateBB = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'UPDATE b_and_b ' +
            'SET check_in = ' + req.check_in + ', check_out = ' + req.check_out + ' ' +
            'WHERE ref_proprieta_bb = ' + req.ref_proprieta_bb + '; ',
            (err, results) => {
                if(err) {
                    return reject(new NotFound('B&B non trovato'));
                }
                resolve(results);
            }
        );
    })
}

// insert new b&b
const insertBB = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'INSERT INTO b_and_b VALUES ' +
            '(' + req.ref_proprieta_bb + ', ' + req.check_in + ', ' + req.check_out + ')',
            (err, results) => {
                if(err) {
                    return reject(new BadRequest("Si è verificato un errore nell'inserimento"));
                }
                resolve(results);
        });
    });
}

module.exports = all;
module.exports = getBB;
module.exports = updateBB;
module.exports = insertBB;

module.exports = {
    all,
    getBB,
    updateBB,
    insertBB
}