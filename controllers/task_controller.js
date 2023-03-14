const express = require('express');
const router = express.Router();
const db = require('./../db'); // it opens index.js by default


router.get('/', (req, res) => {
    res.render('home');
})




module.exports = router;