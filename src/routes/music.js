const express = require('express')

const router = express()

router.get("/", function (req, res) {
    res.send('Music');
})

router.get("/", function (req, res) {
    res.send('Music');
})

router.post("/", function (req, res) {
    res.send('Music post');
})

router.put("/", function (req, res) {
    res.send('Music put');
})

router.delete("/", function (req, res) {
    res.send('Music del');
})
 
module.exports = router;