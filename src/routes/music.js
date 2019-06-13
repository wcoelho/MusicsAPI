const MusicQueries = require('../queries/music_queries');
const ArtistQueries = require('../queries/artist_queries');
const LyricQueries = require('../queries/lyric_queries');
const cors = require('cors');
const request = require('request');

let queries;

module.exports = function(app, dao) {
    const baseURL = "/api/v1/musicas";
    queries = new MusicQueries(dao);
    artistQueries = new ArtistQueries(dao);

    // Rota para adição de musicas
    app.post(baseURL, cors(), (req, res) => {
        // As informações da musica serão armazenadas no banco de dados
        const { titulo, idArtista, idLetra } = getMusicData(req);
        queries.create(titulo, idArtista, idLetra)
        .then((data) => { // Se a operação de criação for bem sucedida, retorna os dados com o id
        let musica = req.body;
        musica.id = data.id;
        res.status(201).send(musica);
        })    
    });

    // Rota para atualizar dados de um musica
    app.put(`${baseURL}/:id`, cors(), (req, res) => {
        // Verifica a consistência entre os ids do corpo da mensagem e do parâmetro
        if(req.params.id!=req.body.id)
        {
            res.status(500).json({erro: 'Ocorreu um erro em sua requisição. Consulte o administrador.'});
        } else {
            // As informações da musica serão atualizadas no banco de dados
            const { titulo, idArtista, idLetra } = getMusicData(req)
            const id = req.params.id;
            queries.update(id, titulo, idArtista, idLetra);

            // Recupera todos os campos
            getById(id, res);
        }
    
    });

    //Rota para recuperação da lista de musicas
    app.get(baseURL, cors(), (req, res) => {
        const music = req.query["titulo"];

        // Se o parâmetro de requisição não for encontrado, retorna lista de músicas
        if(music==null)
        {
            getAll(res);

        // Caso existam os parâmetros de requisição, a música escolhida será buscada
        // no banco de dados. Se não encontrada, a busca será feita no Spotify
        } else {
            
            const foundMusic = getByName(music);

            if(foundMusic!=null)
            {
                const artista = ArtistQueries.getById(foundMusic.idArtista);
                const letra = LyricQueries.getById(foundMusic.idLetra);
                res.send(foundMusic.titulo + "," + artista.nome + "," + letra.letra);

            } else {//busca do spotify

                const token = req.query["token"];
                const artist = req.query["musica"];

                if(token==null)
                {
                    res.send(null);
                }

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
            }
        }
    //curl -X GET "https://api.spotify.com/v1/search?q=tania%20bowra&type=artist" -H "Authorization: Bearer {your access token}"
    });

    //Rota para recuperação de dados de um musica específico
    app.get(`${baseURL}/:id`, cors('/'), (req, res) => {
        // A musica será buscado no banco de dados
        getById(req.params.id, res);
    });

    //Rota para apagar registro de musica específico
    app.delete(`${baseURL}/:id`, cors(), (req, res) => {
        const id = req.params.id;
        queries.delete(id);
        let msg = `Registro com id ${id} apagado com sucesso`;
        console.log(msg);
        res.json({mensagem: msg});
    });
};

function getMusicData(req) {

    return { titulo: req.body.titulo, idArtista: req.body.idArtista, idLetra: req.body.idLetra };
}

function getByName(name, res) {
    queries.getByName(name)
        .then((musica) => {
        if (musica == null) {        
            return null;
        } else {
            console.log(`Dados da musica recuperados do banco de dados`);      
            return musica;
        }
        });    
}

function getById(id, res) {
    queries.getById(id)
        .then((musica) => {
        if (musica == null) {        
            res.status(404).json({erro: `Musica com id ${id} não encontrado`});
        } else {
            console.log(`Dados da musica recuperados do banco de dados`);      
            res.send(musica);
        }
        });    
}

function getAll(res) {
    queries.getAll()
        .then((musicas) => {
        if (musicas.length == 0) {
            res.json({erro: 'Nenhum musica encontrado'});
        } else {
            console.debug(`Lista de musicas recuperada do banco de dados`);
            res.send(musicas);
        }
        });
}
