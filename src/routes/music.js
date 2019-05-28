const express = require('express')

const router = express()

router.get("/", function (req, res) { //endereco da requisicao onde e retornado hello world
    res.send('Music');
})

router.get("/", function (req, res) { //endereco da requisicao onde e retornado hello world
    res.send('Music');
})

router.post("/", function (req, res) { //endereco da requisicao onde e retornado hello world
    res.send('Music post');
})

router.put("/", function (req, res) { //endereco da requisicao onde e retornado hello world
    res.send('Music put');
})

router.delete("/", function (req, res) { //endereco da requisicao onde e retornado hello world
    res.send('Music del');
})
 
module.exports = router;