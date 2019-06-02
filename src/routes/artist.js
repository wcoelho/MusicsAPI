const express = require('express')

const router = express()

router.get("/", function (req, res) {    res.send('Artist');
})

router.post("/", function (req, res) {    res.send('Artist post');
})

router.put("/", function (req, res) {    res.send('Artist put');
})

router.delete("/", function (req, res) {    res.send('Artist del');
})
  
module.exports = router;