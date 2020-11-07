var express = require('express');
var DB = require('../db');

var router = express.Router();

// show all table tassa_soggiorno
// indirizzo: /tasse/all
router.get('/all', async (req, res, next) => {
    try {
        let tassa_soggiorno = await DB.Tassa_soggiorno.all();
        res.json(tassa_soggiorno);
    } catch(e) {
        next(e);
    }
});

// show searched tassa_soggiorno (by id)
// indirizzo: /searchTassa/results
router.post('/results', async(req, res, next) => {
    try {
        let search = await DB.Tassa_soggiorno.getTassa(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// show searched tassa_soggiorno (by ref_soggiornante)
// indirizzo: /searchTassaSoggiornante/tassaSoggiornante
router.post('/tassaSoggiornante', async(req, res, next) => {
    try {
        let search = await DB.Tassa_soggiorno.getTassaSoggiornante(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// show searched tassa_soggiorno (by ref_prenotazione)
// indirizzo: /searchTassaPrenotazione/tassaPrenotazione
router.post('/tassaPrenotazione', async(req, res, next) => {
    try {
        let search = await DB.Tassa_soggiorno.getTassaPrenotazione(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// update fields of table tassa_soggiorno
// indirizzo: /updateTassa/fields
router.post('/fields', async(req, res, next) => {
    try {
        let update = await DB.Tassa.updateTassa(req.body);
        res.json(update);
    }
    catch(e) {
        next(e);
    }
});

// show searched tassa_soggiorno (by ref_proprietario)
// indirizzo: /searchTassaProprietario/tassaProprietario
router.post('/tassaProprietario', async(req, res, next) => {
    try {
        let search = await DB.Tassa_soggiorno.getTassaProprietario(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// insert new tassa in table tassa_soggiorno
// indirizzo: /insertTassa/new
router.post('/new', async(req, res, next) => {
    try {
        let insert = await DB.Tassa_soggiorno.insertTassa(req.body);
        res.json(insert);
    }
    catch(e) {
        next(e);
    }
})

module.exports = router;