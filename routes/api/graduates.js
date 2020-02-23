const express =  require('express');
const router = express.Router();
const Graduate = require('../../models/Graduate');


router.get('/test', (req, res) =>
    res.json({ msg: "Test" })
    );




    module.exports = router;