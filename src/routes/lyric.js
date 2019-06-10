const express = require('express')
const request = require('request');

const router = express()

router.get("/", function (req, res) { 
    const music = req.query["titulo"];
    const artist = req.query["artista"];//Opcional
    if(music==null) { res.send("{ \"erro\":\"O título da música é obrigatório\"}"); }
    
    var url = 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?apikey=c39d3ce1436ee73e524a1774bf47bdc8&q_track='+music;
    url = (artist!=null)?url+'&q_artist='+artist:url;
    request(url, { json: true }, (err, res_int, body) => {        
    if (err) { return console.error(err); }
        if(body.message.body.lyrics==null)
        {
            res.send("{ \"erro\":\"Nenhuma letra encontrada\"}")
        } else {
            res.send(body.message.body.lyrics.lyrics_body);
        }
    });    
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