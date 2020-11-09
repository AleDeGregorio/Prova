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
                    Connection.query(
                        'SELECT * ' +
                        'FROM proprietario ' +
                        'WHERE email_prop = "' + req.email + '"; ',
                        (err, results) => {
                            if(err) {
                                return reject(new GeneralError('Si è verificato un errore'));
                            }
                            if(results.length < 1) {
                                return reject(new NotFound('Cliente non trovato'));
                            }
                            else {
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

module.exports = login;

module.exports = {
    login
}