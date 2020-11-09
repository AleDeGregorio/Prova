var express = require('express');
var DB = require('../db');

var router = express.Router();

// show all table cliente
// indirizzo: /cliente/all
router.get('/all', async (req, res, next) => {
    try {
        let cliente = await DB.Cliente.all();
        res.json(cliente);
    } catch(e) {
        next(e);
    }
});

// show searched cliente (by email_cl)
// indirizzo: /searchCliente/results
router.post('/results', async(req, res, next) => {
    try {
        let search = await DB.Cliente.getUser(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// update fields of table cliente
// indirizzo: /updateCliente/fields
router.post('/fields', async(req, res, next) => {
    try {
        let update = await DB.Cliente.updateUser(req.body);
        res.json(update);
    }
    catch(e) {
        next(e);
    }
});

// insert new user in table cliente (with encrypted password)
// indirizzo: /insertCliente/new
router.post('/new', async(req, res, next) => {
    try {
        let insert = await DB.Cliente.insertUser(req.body);
        res.json(insert);
    }
    catch(e) {
        next(e);
    }
});

// login user of table cliente (using encrypted password)
// indirizzo: /loginCliente/clienteLogged
router.post('/clienteLogged', async(req, res, next) => {
    try {
        let login = await DB.Cliente.login(req.body);
        res.json(login);
    }
    catch(e) {
        next(e);
    }
})

module.exports = router;