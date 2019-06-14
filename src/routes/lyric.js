const request = require('request');
const LyricQueries = require('../queries/lyric_queries');
const MusicQueries = require('../queries/music_queries');
const ArtistQueries = require('../queries/artist_queries');
const cors = require('cors');

const circuitBreaker = require('opossum');
const client = require('roi');

const circuit = circuitBreaker(client.get);

let queries;

module.exports = function(app, dao) {
    const baseURL = "/api/v1/letras"
    queries = new LyricQueries(dao);
    artistQueries = new ArtistQueries(dao);
    musicQueries = new MusicQueries(dao);

    // Rota para adição de letras
    app.post(baseURL, cors(), (req, res) => {
        // As informações da letra serão armazenadas no banco de dados
        const { titulo, letra } = getLyricData(req);
        queries.create(titulo, letra)
        .then((data) => { // Se a operação de criação for bem sucedida, retorna os dados com o id
        let letra = req.body;
        letra.id = data.id;
        res.status(201).send(letra);
        })    
    });

    // Rota para atualizar dados de uma letra
    app.put(`${baseURL}/:id`, cors(), (req, res) => {
        // Verifica a consistência entre os ids do corpo da mensagem e do parâmetro
        if(req.params.id!=req.body.id)
        {
            res.status(500).json({erro: 'Ocorreu um erro em sua requisição. Consulte o administrador.'});
        } else {
            // As informações da letra serão atualizadas no banco de dados
            const { titulo, letra } = getLyricData(req);
            const id = req.params.id;
            queries.update(id, titulo, letra);

            // Recupera todos os campos
            getById(id, res);
        }
    
    });

    //Rota para recuperação da lista de letras
    app.get(baseURL, cors(), (req, res) => {
        // As letras serão buscadas no banco de dados
        const music = req.query["titulo"];
        const artist = req.query["artista"];//Opcional
        //Se a musica não for fornecida, recupera lista do banco de dados
        if(music==null) { 
            getAll(res); 
        } else {

            var url = 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?apikey=c39d3ce1436ee73e524a1774bf47bdc8&q_track='+music;
            url = (artist!=null)?url+'&q_artist='+artist:url;

            //Check URL with circuit breaker e efetua a requisição
            checkURL(res, url)
            launch(url, res, music);            
        }
                
      });
        //TODO salvar letra, artista e musica
        //getAll(res);


    //Rota para recuperação de dados de uma letra específica
    app.get(`${baseURL}/:id`, cors('/'), (req, res) => {
        // A letra será buscado no banco de dados        
        getById(req.params.id, res);
    });

    //Rota para apagar registro de letra específica
    app.delete(`${baseURL}/:id`, cors(), (req, res) => {
        const id = req.params.id;
        queries.delete(id);
        let msg = `Registro com id ${id} apagado com sucesso`;
        console.log(msg);
        res.json({mensagem: msg});
    });
};


circuit.fallback(() => Promise.resolve({
    error: 'MusixMatch não está acessível. Tente mais tarde'
}));


function checkURL (resp, url) {
    return circuit.fire({
        endpoint: url
    })
    .then((message) => resp.send(message))
    .catch((err)  => resp.send(err))
}

function launch(url, res, music) {
    request(url, { json: true }, (err, res_int, body) => {        
        if (err) { return console.error(err); }
            if(body.message.body.lyrics==null)
            {
                res.send({ erro: 'Nenhuma letra encontrada' });
            } else {
                const fromLyric = body.message.body.lyrics.lyrics_body;
                console.log(`Salvando letra`)
                queries.create(music, fromLyric);
                res.send({letra: fromLyric});            
            }
        }); 
}

function getLyricData(req) {
    return { titulo: req.body.titulo, letra: req.body.letra };
}

function getByLyric(lyric, res) {
    return queries.getByLyric(lyric)
        .then((let) => { 
            if (let == null) {   
                console.log("false");     
                return false;
            } else {
                console.log(`Dados da letra recuperados do banco de dados`);   
                console.log("true");    
                return true;
            }    
        });    
}

function getById(id, res) {
    queries.getById(id)
        .then((letra) => {
        if (letra == null) {        
            res.status(404).json({erro: `Letra com id ${id} não encontrada`});
        } else {
            console.log(`Dados da letra recuperados do banco de dados`);      
            res.send(letra);
        }
        });    
}

function getAll(res) {
    queries.getAll()
        .then((letras) => {
        if (letras.length == 0) {
            res.json({erro: 'Nenhuma letra encontrado'});
        } else {
            console.debug(`Lista de letras recuperada do banco de dados`);
            res.send(letras);
        }
        });
}

