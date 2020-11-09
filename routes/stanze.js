var express = require('express');
var DB = require('../db');

var router = express.Router();

// show all table stanza
// indirizzo: /stanze/all
router.get('/all', async (req, res) => {
    try {
        let stanza = await DB.Stanza.all();
        res.json(stanza);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// show searched stanza (by id_stanza)
// indirizzo: /searchStanza/results
router.post('/results', async(req, res) => {
    try {
        let search = await DB.Stanza.getStanza(req.body);
        res.json(search);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// show searched stanza (by ref_bb)
// indirizzo: /searchStanzaBB/stanzaBB
router.post('/stanzaBB', async(req, res) => {
    try {
        let search = await DB.Stanza.getStanzaBB(req.body);
        res.json(search);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// show searched stanza (by tipologia)
// indirizzo: /searchStanzaTipologia/stanzaTipologia
router.post('/stanzaTipologia', async(req, res) => {
    try {
        let search = await DB.Stanza.getStanzaTipologia(req.body);
        res.json(search);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// show searched stanza (by ref_bb && tipologia)
// indirizzo: /searchStanzaBBTipologia/stanzaBBTipologia
router.post('/stanzaBBTipologia', async(req, res) => {
    try {
        let search = await DB.Stanza.getStanzaBBTipologia(req.body);
        res.json(search);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// update fields of table Stanza
// indirizzo: /updateStanza/fields
router.post('/fields', async(req, res) => {
    try {
        let update = await DB.Stanza.updateStanza(req.body);
        res.json(update);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// insert new stanza in table stanza
// indirizzo: /insertStanza/new
router.post('/new', async(req, res) => {
    try {
        let insert = await DB.stanza.insertStanza(req.body);
        res.json(insert);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// caricamento foto
// indirizzo: /uploadFotoST/upload
router.post('/upload', async(req, res, next) => {
    try {
        let foto1 = req.files.foto1 ? req.files.foto1 : null;
        let foto2 = req.files.foto2 ? req.files.foto2 : null;
        let foto3 = req.files.foto3 ? req.files.foto3 : null;
        let foto4 = req.files.foto4 ? req.files.foto4 : null;
        let filename1 = foto1 ? foto1.name : null;
        let filename2 = foto2 ? foto2.name : null;
        let filename3 = foto3 ? foto3.name : null;
        let filename4 = foto4 ? foto4.name : null;
        if(foto1) {
            foto1.mv('../../public/Images/' + filename1);
        }
        if(foto2) {
            foto2.mv('../../public/Images/' + filename2);
        }
        if(foto3) {
            foto3.mv('../../public/Images/' + filename3);
        }
        if(foto4) {
            foto4.mv('../../public/Images/' + filename4);
        }
        res.send("file uploaded");
    }
    catch(e) {
        next(e);
    }
});

module.exports = router;