const express = require('express')

const router = express()

router.get("/", function (req, res) { //endereco da requisicao onde e retornado hello world
    res.send('Lyric');
})

router.post("/", function (req, res) { //endereco da requisicao onde e retornado hello world
    res.send('Lyric post');
})

router.put("/", function (req, res) { //endereco da requisicao onde e retornado hello world
    res.send('Lyric put');
})

router.delete("/", function (req, res) { //endereco da requisicao onde e retornado hello world
    res.send('Lyric del');
})
  
module.exports = router;