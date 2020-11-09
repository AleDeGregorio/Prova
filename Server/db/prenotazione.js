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

// utility function for table "prenotazione"

// return all table
const all = async () => {
    return new Promise((resolve, reject) => {

        Connection.query('SELECT * FROM prenotazione', (err, results) => {
            if(err) {
                return reject(new NotFound('Nessuna prenotazione registrata'));
            }
            resolve(results);
        });
    });
}

// get prenotazione from id_prenotazione
const getPrenotazione = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM prenotazione ' +
            'WHERE id_prenotazione = ' +  req.id_prenotazione + '; ',
            (err, results) => {
            if(err) {
                return reject(new NotFound('Prenotazione non trovata'));
            }
            resolve(results);
        });
    });
}

// get prenotazione from ref_soggiornante
const getPrenotazioneSoggiornante = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM prenotazione ' +
            'WHERE ref_soggiornante = "' +  req.ref_soggiornante + '"',
            (err, results) => {
            if(err) {
                return reject(new NotFound('Nessuna prenotazione relativa al soggiornante'));
            }
            resolve(results);
        });
    });
}

// get prenotazione from ref_cliente
const getPrenotazioneCliente = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM prenotazione, proprieta, soggiornante ' +
            'WHERE ref_cliente = "' +  req.ref_cliente + '" AND ref_proprieta = id_proprieta AND ref_soggiornante = cf_sogg',
            (err, results) => {
            if(err) {
                return reject(new NotFound('Nessuna prenotazione relativa al cliente'));
            }
            resolve(results);
        });
    });
}

// get prenotazione from ref_proprietario
const getPrenotazioneProprietario = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM prenotazione ' +
            'WHERE ref_proprietario = "' +  req.ref_proprietario + '"',
            (err, results) => {
            if(err) {
                return reject(new NotFound('Nessuna prenotazione relativa al proprietario'));
            }
            resolve(results);
        });
    });
}

// get prenotazione from ref_proprieta
const getPrenotazioneProprieta = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM prenotazione ' +
            'WHERE ref_proprieta = ' +  req.ref_proprieta + '; ',
            (err, results) => {
            if(err) {
                return reject(new NotFound("Nessuna prenotazione relativa all'alloggio"));
            }
            resolve(results);
        });
    });
}

// get prenotazioni da accettare from ref_proprietario
const getPrenotazioneAccettazione = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM prenotazione ' +
            'WHERE ref_proprietario = "' + req.ref_proprietario + '" AND accettata = false;',
            (err, results) => {
                if(err) {
                    return reject(new NotFound('Nessuna prenotazione da accettare'));
                }
                resolve(results);
            }
        );
    });
}

// get prenotazioni già accettate from ref_proprietario
const getPrenotazioneAccettata = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM prenotazione ' +
            'WHERE ref_proprietario = "' + req.ref_proprietario + '" AND accettata = true;',
            (err, results) => {
                if(err) {
                    return reject(new NotFound('Nessuna prenotazione accettata'));
                }
                resolve(results);
            }
        );
    });
}

// accetta prenotazione in pendenza
const accettaPrenotazione = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'UPDATE prenotazione ' +
            'SET accettata = true ' +
            'WHERE id_prenotazione = ' + req.id_prenotazione + ';',
            (err, results) => {
                if(err) {
                    return reject(new NotFound('Prenotazione non trovata'));
                }
                resolve(results);
            }
        );
    });
}

// update fields
const updatePrenotazione = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'UPDATE prenotazione ' +
            'SET ref_soggiornante = "' + req.ref_soggiornante + '", ref_cliente = "' + req.ref_cliente +
            '", ref_proprietario = "' + req.ref_proprietario + '", ref_proprieta = ' + req.ref_proprieta +
            ', num_soggiornanti = ' + req.num_soggiornanti + ', costo = ' + req.costo + ', caparra = ' + req.caparra +
            ', data_partenza = "' + req.data_partenza + '", data_ritorno = "' + req.data_ritorno + '", accettata = ' + req.accettata + ' ' +
            'WHERE id_prenotazione = ' + req.id_prenotazione + '; ',
            (err, results) => {
                if(err) {
                    return reject(new NotFound('Prenotazione non trovata'));
                }
                resolve(results);
            }
        );
    })
}

// insert new prenotazione
const insertPrenotazione = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'INSERT INTO prenotazione (ref_soggiornante, ref_cliente, ref_proprietario, ref_proprieta, num_soggiornanti, ' +
                'costo, caparra, data_partenza, data_ritorno, accettata) VALUES ' +
            '("' + req.ref_soggiornante + '", "' + req.ref_cliente + '", "' + req.ref_proprietario + '", ' + req.ref_proprieta + 
            ', ' + req.num_soggiornanti + ', ' + req.costo + ', ' + req.caparra + ', "' + req.data_partenza + '", "' + 
            req.data_ritorno + '", false)',
            (err, results) => {
                if(err) {
                    return reject(new BadRequest("Si è verificato un errore nell'inserimento"));
                }
                resolve(results);
        });
    });
}

// controllo vincolo 28 giorni
const checkSoggiornante = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT @sogg := "' + req.ref_soggiornante + '"; ' +
            'SELECT @anno := ' + req.anno + '; ' +
            'SELECT pre.id_prenotazione, pre.ref_soggiornante, pre.data_partenza, pre.data_ritorno, SUM(pre.data_ritorno - pre.data_partenza) AS tot_giorni ' +
            'FROM prenotazione pre, proprieta pro ' + 
            'WHERE pre.ref_proprieta = pro.id_proprieta AND ' +
            'pro.tipo_proprieta = "cv" AND pre.ref_soggiornante = @sogg AND ' +
            'YEAR(pre.data_ritorno) = @anno ' +
            'GROUP BY pre.ref_soggiornante, YEAR(pre.data_ritorno);',
            (err, results) => {
                if(err) {
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessuna corrispondenza trovata'));
                }
                else {
                    if(results[0].tot_giorni > 27) {
                        return reject(new BadRequest('Il soggiornante ha superato il vincolo dei 28 giorni'));
                    }
                    else {
                        console.log('Il soggiornante è idoneo alla prenotazione');
                        resolve(results);
                    }

                }
            }
        )
    })
}

module.exports = all;
module.exports = getPrenotazione;
module.exports = getPrenotazioneSoggiornante;
module.exports = getPrenotazioneCliente;
module.exports = getPrenotazioneProprietario;
module.exports = getPrenotazioneProprieta;
module.exports = getPrenotazioneAccettazione;
module.exports = getPrenotazioneAccettata;
module.exports = accettaPrenotazione;
module.exports = updatePrenotazione;
module.exports = insertPrenotazione;
module.exports = checkSoggiornante;

module.exports = {
    all,
    getPrenotazione,
    getPrenotazioneSoggiornante,
    getPrenotazioneCliente,
    getPrenotazioneProprietario,
    getPrenotazioneProprieta,
    getPrenotazioneAccettazione,
    getPrenotazioneAccettata,
    accettaPrenotazione,
    updatePrenotazione,
    insertPrenotazione,
    checkSoggiornante
}