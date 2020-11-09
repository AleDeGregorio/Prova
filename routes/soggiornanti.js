var express = require('express');
var DB = require('../db');

var router = express.Router();

// show all table soggiornante
// indirizzo: /soggiornanti/all
router.get('/all', async (req, res, next) => {
    try {
        let soggiornante = await DB.Soggiornante.all();
        res.json(soggiornante);
    } catch(e) {
        next(e);
    }
});

// show searched soggiornante (by cf)
// indirizzo: /searchSoggiornante/results
router.post('/results', async(req, res, next) => {
    try {
        let search = await DB.Soggiornante.getSoggiornante(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// update fields of table Soggiornante
// indirizzo: /updateSoggiornante/fields
router.post('/fields', async(req, res, next) => {
    try {
        let update = await DB.Soggiornante.updateSoggiornante(req.body);
        res.json(update);
    }
    catch(e) {
        next(e);
    }
});

// insert new user in table soggiornante
// indirizzo: /insertSoggiornante/new
router.post('/new', async(req, res, next) => {
    try {
        let insert = await DB.Soggiornante.insertUser(req.body);
        res.json(insert);
    }
    catch(e) {
        next(e);
    }
})

module.exports = router;