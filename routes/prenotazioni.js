var express = require('express');
var DB = require('../db');

var router = express.Router();

// show all table prenotazione
// indirizzo: /prenotazioni/all
router.get('/all', async (req, res, next) => {
    try {
        let prenotazione = await DB.Prenotazione.all();
        res.json(prenotazione);
    } catch(e) {
        next(e);
    }
});

// show searched prenotazione (by id_prenotazione)
// indirizzo: /searchPrenotazione/results
router.post('/results', async(req, res, next) => {
    try {
        let search = await DB.Prenotazione.getPrenotazione(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// show searched prenotazione (by ref_soggiornante)
// indirizzo: /searchPrenotazioneSoggiornante/prenotazioneSoggiornante
router.post('/prenotazioneSoggiornante', async(req, res, next) => {
    try {
        let search = await DB.Prenotazione.getPrenotazioneSoggiornante(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// show searched prenotazione (by ref_cliente)
// indirizzo: /searchPrenotazioneCliente/prenotazioneCliente
router.post('/prenotazioneCliente', async(req, res, next) => {
    try {
        let search = await DB.Prenotazione.getPrenotazioneCliente(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// show searched prenotazione (by ref_proprietario)
// indirizzo: /searchPrenotazioneProprietario/prenotazioneProprietario
router.post('/prenotazioneProprietario', async(req, res, next) => {
    try {
        let search = await DB.Prenotazione.getPrenotazioneProprietario(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// show searched prenotazione (by ref_proprieta)
// indirizzo: /searchPrenotazioneProprieta/prenotazioneProprieta
router.post('/prenotazioneProprieta', async(req, res, next) => {
    try {
        let search = await DB.Prenotazione.getPrenotazioneProprieta(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// show searched prenotazione with accettata = false (by ref_proprietario)
// indirizzo: /getPrenotazioniAccettazione/prenotazioniAccettazione
router.post('/prenotazioniAccettazione', async(req, res, next) => {
    try {
        let prenAcc = await DB.Prenotazione.getPrenotazioneAccettazione(req.body);
        res.json(prenAcc);
    }
    catch(e) {
        next(e);
    }
});

// show searched prenotazione with accettata = true (by ref_proprietario)
// indirizzo: /getPrenotazioniAccettate/prenotazioniAccettate
router.post('/prenotazioniAccettate', async(req, res, next) => {
    try {
        let prenAcc = await DB.Prenotazione.getPrenotazioneAccettata(req.body);
        res.json(prenAcc);
    }
    catch(e) {
        next(e);
    }
});

// accetta prenotazione in pendenza (da id_prenotazione)
// indirizzo: /accettaPrenotazione/accettata
router.post('/accettata', async(req, res, next) => {
    try {
        let accetta = await DB.Prenotazione.accettaPrenotazione(req.body);
        res.json(accetta);
    }
    catch(e) {
        next(e);
    }
})

// update fields of table Prenotazione
// indirizzo: /updatePrenotazione/fields
router.post('/fields', async(req, res, next) => {
    try {
        let update = await DB.Prenotazione.updatePrenotazione(req.body);
        res.json(update);
    }
    catch(e) {
        next(e);
    }
});

// insert new prenotazione in table prenotazione
// indirizzo: /insertPrenotazione/new
router.post('/new', async(req, res, next) => {
    try {
        let insert = await DB.Prenotazione.insertPrenotazione(req.body);
        res.json(insert);
    }
    catch(e) {
        next(e);
    }
});

// controlla vincolo dei 28 giorni per prenotazione casa vacanza
// indirizzo: /checkSoggiornante/resultIdoneita
router.post('/resultIdoneita', async(req, res, next) => {
    try {
        let check = await DB.Prenotazione.checkSoggiornante(req.body);
        res.json(check);
    }
    catch(e) {
        next(e);
    }
})

module.exports = router;