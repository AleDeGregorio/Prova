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

// utility function for table "stanza"

// return all table
const all = async () => {
    return new Promise((resolve, reject) => {

        Connection.query('SELECT * FROM stanza', (err, results) => {
            if(err) {
                return reject(new NotFound('Nessuna stanza registrata'));
            }
            resolve(results);
        });
    });
}

// get stanza from id_stanza
const getStanza = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM stanza ' +
            'WHERE id_stanza = ' +  req.id_stanza + '; ', (err, results) => {
            if(err) {
                return reject(new NotFound('Stanza non trovata'));
            }
            resolve(results);
        });
    });
}

// get stanza from ref_bb
const getStanzaBB = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM stanza ' +
            'WHERE ref_bb = ' +  req.ref_bb + '; ', (err, results) => {
            if(err) {
                return reject(new NotFound('Nessuna stanza relativa al b&b'));
            }
            resolve(results);
        });
    });
}

// get stanza from tipologia
const getStanzaTipologia = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM stanza ' +
            'WHERE tipologia = ' +  req.tipologia + '; ', (err, results) => {
            if(err) {
                return reject(new NotFound('Nessuna stanza corrisponde alla tipologia selezionata'));
            }
            resolve(results);
        });
    });
}

// get stanza from ref_bb && tipologia
const getStanzaBBTipologia = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM stanza ' +
            'WHERE ref_bb = ' +  req.ref_bb + ' AND tipologia = ' + req.tipologia + ';',
            (err, results) => {
            if(err) {
                return reject(new NotFound('Nessuna stanza trovata'));
            }
            resolve(results);
        });
    });
}

// update fields
const updateStanza= async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'UPDATE stanza ' +
            'SET tipologia = ' + req.tipologia + ', tariffa_stanza = ' + req.tariffa_stanza +
            ', imgST_path1 = "./Images/' + req.id_stanza + '_' + req.ref_bb + '_1.jpg"' +
            ', imgST_path2 = "./Images/' + req.id_stanza + '_' + req.ref_bb + '_2.jpg"' +
            ', imgST_path3 = "./Images/' + req.id_stanza + '_' + req.ref_bb + '_3.jpg"' +
            ', imgST_path4 = "./Images/' + req.id_stanza + '_' + req.ref_bb + '_4.jpg" ' +
            'WHERE id_stanza = ' + req.id_stanza + '; ',
            (err, results) => {
                if(err) {
                    return reject(new NotFound('Stanza non trovata'));
                }
                resolve(results);
            }
        );
    });
}

// insert new stanza
const insertStanza = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'INSERT INTO stanza (ref_bb, tipologia, tariffa_stanza) VALUES ' +
            '(' + req.ref_bb + ', ' + req.tipologia + ', ' + req.tariffa_stanza + '); ' +
            'SELECT @id := (SELECT id_stanza ' +
                            'FROM stanza ' +
                            'HAVING id_stanza >= ALL (SELECT id_stanza ' +
                                                    'FROM stanza)); ' +
            'SELECT @ref_bb := (SELECT ref_bb ' +
                                'FROM stanza ' +
                                'GROUP BY id_stanza ' +
                                'HAVING id_stanza >= ALL (SELECT id_stanza ' +
                                                        'FROM stanza)); ' +
            'UPDATE stanza ' +
            'SET imgST_path1 = CONCAT("./Images/", CAST(@id AS CHAR), "_", CAST(@ref_bb AS CHAR), "_1.jpg"), ' +
                'imgST_path2 = CONCAT("./Images/", CAST(@id AS CHAR), "_", CAST(@ref_bb AS CHAR), "_2.jpg"), ' +
                'imgST_path3 = CONCAT("./Images/", CAST(@id AS CHAR), "_", CAST(@ref_bb AS CHAR), "_3.jpg"), ' +
                'imgST_path4 = CONCAT("./Images/", CAST(@id AS CHAR), "_", CAST(@ref_bb AS CHAR), "_4.jpg") ' +
            'WHERE id_stanza = @id; ',
            (err, results) => {
                if(err) {
                    return reject(new BadRequest("Si è verificato un errore nell'inserimento"));
                }
                resolve(results);
        });
    });
}

module.exports = all;
module.exports = getStanza;
module.exports = getStanzaBB;
module.exports = getStanzaTipologia;
module.exports = getStanzaBBTipologia;
module.exports = updateStanza;
module.exports = insertStanza;

module.exports = {
    all,
    getStanza,
    getStanzaBB,
    getStanzaTipologia,
    getStanzaBBTipologia,
    updateStanza,
    insertStanza
}