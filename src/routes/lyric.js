const express = require('express')

const router = express()

router.get("/", function (req, res) {    
    res.send('Lyric');
})

router.post("/", function (req, res) {    
    res.send('Lyric post');
})

router.put("/", function (req, res) {    
    res.send('Lyric put');
})

router.delete("/", function (req, res) {    
    res.send('Lyric del');
})
  
module.exports = router;