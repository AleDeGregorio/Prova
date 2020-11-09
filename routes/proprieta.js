var express = require('express');
var DB = require('../db');

var router = express.Router();

// show all table proprieta
// indirizzo: /proprieta/all
router.get('/all', async (req, res, next) => {
    try {
        let proprieta = await DB.Proprieta.all();
        res.json(proprieta);
    } catch(e) {
        next(e);
    }
});

// show searched proprieta (by id_proprieta)
// indirizzo: /searchProprieta/results
router.post('/results', async(req, res, next) => {
    try {
        let search = await DB.Proprieta.getProprieta(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// show searched proprieta (by nome_proprieta)
// indirizzo: /searchProprietaNome/proprietaNome
router.post('/proprietaNome', async(req, res, next) => {
    try {
        let search = await DB.Proprieta.getProprietaNome(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// show searched proprieta (by localita)
// indirizzo: /searchProprietaLocalita/proprietaLocalita
router.post('/proprietaLocalita', async(req, res, next) => {
    try {
        let search = await DB.Proprieta.getProprietaLocalita(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// show searched proprieta (by Provincia)
// indirizzo: /searchProprietaProvincia/proprietaProvincia
router.post('/proprietaProvincia', async(req, res, next) => {
    try {
        let search = await DB.Proprieta.getProprietaProvincia(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// show searched proprieta (by Tipo)
// indirizzo: /searchProprietaTipo/proprietaTipo
router.post('/proprietaTipo', async(req, res, next) => {
    try {
        let search = await DB.Proprieta.getProprietaTipo(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// show searched proprieta (by Tipo = cv && ref_proprietario)
// indirizzo: /searchProprietaCVProprietario/proprietaCVProprietario
router.post('/proprietaCVProprietario', async(req, res, next) => {
    try {
        let search = await DB.Proprieta.getProprietaCVProprietario(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// show searched proprieta (by Tipo = bb && ref_proprietario)
// indirizzo: /searchProprietaCVProprietario/proprietaBBProprietario
router.post('/proprietaBBProprietario', async(req, res, next) => {
    try {
        let search = await DB.Proprieta.getProprietaBBProprietario(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// show searched proprieta (by Servizi)
// indirizzo: /searchProprietaServizi/proprietaServizi
router.post('/proprietaServizi', async(req, res, next) => {
    try {
        let search = await DB.Proprieta.getProprietaServizi(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// show searched proprieta (by Proprietario)
// indirizzo: /searchProprietaProprietario/proprietaProprietario
router.post('/proprietaProprietario', async(req, res, next) => {
    try {
        let search = await DB.Proprieta.getProprietaProprietario(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// show searched proprieta (by localitaTipo)
// indirizzo: /searchProprietaLocalitaTipo/proprietaLocalitaTipo
router.post('/proprietaLocalitaTipo', async(req, res, next) => {
    try {
        let search = await DB.Proprieta.getProprietaLocalitaTipo(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// show searched proprieta (by Provincia && Tipo)
// indirizzo: /searchProprietaProvinciaTipo/proprietaProvinciaTipo
router.post('/proprietaProvinciaTipo', async(req, res, next) => {
    try {
        let search = await DB.Proprieta.getProprietaProvinciaTipo(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// show searched proprieta (by localitaServizi)
// indirizzo: /searchProprietaLocalitaServizi/proprietaLocalitaServizi
router.post('/proprietaLocalitaServizi', async(req, res, next) => {
    try {
        let search = await DB.Proprieta.getProprietaLocalitaServizi(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// show searched proprieta (by Provincia && Servizi)
// indirizzo: /searchProprietaProvinciaServizi/proprietaProvinciaServizi
router.post('/proprietaProvinciaServizi', async(req, res, next) => {
    try {
        let search = await DB.Proprieta.getProprietaProvinciaServizi(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// show searched proprieta (by Tipo && Servizi)
// indirizzo: /searchProprietaTipoServizi/proprietaTipoServizi
router.post('/proprietaTipoServizi', async(req, res, next) => {
    try {
        let search = await DB.Proprieta.getProprietaTipoServizi(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// show searched proprieta (by localitaTipoServizi)
// indirizzo: /searchProprietaLocalitaTipoServizi/proprietaLocalitaTipoServizi
router.post('/proprietaLocalitaTipoServizi', async(req, res, next) => {
    try {
        let search = await DB.Proprieta.getProprietaLocalitaTipoServizi(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// show searched proprieta (by Provincia && Tipo && Servizi)
// indirizzo: /searchProprietaProvinciaTipoServizi/proprietaProvinciaTipoServizi
router.post('/proprietaProvinciaTipoServizi', async(req, res, next) => {
    try {
        let search = await DB.Proprieta.getProprietaProvinciaTipoServizi(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
});

// elaborazione del form di ricerca di un alloggio, nel caso più generale
// ----------METODO PRINCIPALE DA USARE PER LA RICERCA----------
// indirizzo: /ricercaAlloggio/risultati
router.post('/risultati', async(req, res, next) => {
    try {
        let search = await DB.Proprieta.ricercaAlloggio(req.body);
        res.json(search);
    }
    catch(e) {
        next(e);
    }
})

// update fields of table Proprieta
// indirizzo: /updateProprieta/fields
router.post('/fields', async(req, res, next) => {
    try {
        let update = await DB.Proprieta.updateProprieta(req.body);
        res.json(update);
    }
    catch(e) {
        next(e);
    }
});

// insert new proprieta in table proprieta
// indirizzo: /insertProprieta/new
router.post('/new', async(req, res, next) => {
    try {
        let insert = await DB.Proprieta.insertProprieta(req.body);
        res.json(insert);
    }
    catch(e) {
        next(e);
    }
})

module.exports = router;