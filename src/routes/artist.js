const express = require('express')

const router = express()

router.get("/", function (req, res) { //endereco da requisicao onde e retornado hello world
    res.send('Artist');
})

router.post("/", function (req, res) { //endereco da requisicao onde e retornado hello world
    res.send('Artist post');
})

router.put("/", function (req, res) { //endereco da requisicao onde e retornado hello world
    res.send('Artist put');
})

router.delete("/", function (req, res) { //endereco da requisicao onde e retornado hello world
    res.send('Artist del');
})
  
module.exports = router;