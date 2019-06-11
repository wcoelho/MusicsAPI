const express = require('express')
const request = require('request');

const router = express()

router.get("/", function (req, res) {
    const token = req.query["token"];
    const music = req.query["titulo"];
    const artist = req.query["artista"];

    var url = "https://api.spotify.com/v1/search?q="+music+"&type=track";
    url = (artist!=null)?url+'&q_artist='+artist:url;
    console.log(url);
    request(
        {
            url : url,
            headers : {
                "Authorization" : "Bearer " + token
            }
        }, (err, res_int, body) => {        
    if (err) { return console.error(err); }
        res.send(body);
    });
    //curl -X GET "https://api.spotify.com/v1/search?q=tania%20bowra&type=artist" -H "Authorization: Bearer {your access token}"

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