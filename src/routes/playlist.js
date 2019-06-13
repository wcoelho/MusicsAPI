const PlaylistQueries = require('../queries/playlist_queries');
const cors = require('cors');
const request = require('request');

let queries;
let playlists = [];
let playlistUri = "https://api.spotify.com/v1/playlists/";

module.exports = function(app, dao) {
    const baseURL = "/api/v1/playlists";
    queries = new PlaylistQueries(dao)

    //Rota para recuperação da lista de playlists
    app.get(baseURL, cors(), (req, res) => {

        const token = req.query["token"];

        if(token==null)
        {
            getAll(res);

        } else {

            var url = "https://api.spotify.com/v1/me/playlists";
            request(
                {
                    url : url,
                    headers : {"Authorization" : "Bearer " + token}
                }, (err, res_int, body) => {        
            if (err) { return console.error(err); }                
                const data = JSON.parse(body);
                if(data.items!=null && Object.keys(data.items).length>0)
                {
                    data.items.forEach(checkAndSavePlaylists);
                    res.send(playlists);
                } else if(data.error) {//Erro, geralmente quando o toke expira
                    res.send(body);
                } else {
                    res.send({erro : 'Nenhuma playlist encontrada' });
                }
            });
        }
    });  
}

function checkAndSavePlaylists(element)
{
    const name = element.name;
    const ownerId = element.owner.id;
    const id = element.id;
    const playlist = getBySpotifyIds(id, ownerId);
    if(playlist == [])
    {   console.log(`Salvando playlist ${name}`);
        queries.create(name, id, ownerId);
    } else {
        console.log(`Playlist ${name} já cadastrada`);
    }

    playlists.push({nome: name, url : playlistUri+id});
}

function getBySpotifyUserId(id, res) {
    queries.getBySpotifyUserId(id)
        .then((pl) => {
        if (pl == null) {        
            return null;
        } else {
            console.log(`Dados da playlist recuperados do banco de dados`);      
            return pl;
        }
        });    
}

function getBySpotifyIds(playlistId, ownerId) {
    queries.getBySpotifyIds(playlistId,ownerId)
        .then((pl) => {
            if (pl == null) {        
                return null;
            } else {               
                return pl;
            }
        });    
}

function getAll(res) {
    let playlists = [];
    queries.getAll()
        .then((pl) => {
        if (pl.length == 0) {
            res.json({erro: 'Nenhuma playlist encontrada'});
        } else {
            console.debug(`Lista de playlists recuperada do banco de dados`);
            pl.forEach(function(element,index)
            {
                playlists.push({nome: pl[index].nome, url : playlistUri+pl[index].idSpotifyPlaylist})
            })
            res.send(playlists);
        }
        });
}