var express = require('express');
var DB = require('../db');

var router = express.Router();

// show all table b_and_b
// indirizzo: /BB/all
router.get('/all', async (req, res, next) => {
    try {
        let bb = await DB.B_and_b.all();
        res.json(bb);
    } catch(e) {
        next(e);
    }
});

// show searched b&b (by ref_proprieta_bb)
// indirizzo: /searchBB/results
router.post('/results', async(req, res, next) => {
    try {
        let search = await DB.B_and_b.getBB(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// update fields of table b_and_b
// indirizzo: /updateBB/fields
router.post('/fields', async(req, res, next) => {
    try {
        let update = await DB.B_and_b.updateBB(req.body);
        res.json(update);
    }
    catch(e) {
        next(e);
    }
});

// insert new b&b in table b_and_b
// indirizzo: /insertBB/new
router.post('/new', async(req, res, next) => {
    try {
        let insert = await DB.B_and_b.insertBB(req.body);
        res.json(insert);
    }
    catch(e) {
        next(e);
    }
});

module.exports = router;