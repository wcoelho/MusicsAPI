const ArtistQueries = require('../queries/artist_queries');
const cors = require('cors');

let queries;

module.exports = function(app, dao) {
    const baseURL = "/api/v1/artistas";
    queries = new ArtistQueries(dao);

    // Rota para adição de artistas
    app.post(baseURL, cors(), (req, res) => {
        // As informações do artista serão armazenadas no banco de dados
        const { nome, pais } = getArtistData(req);
        queries.create(nome, pais)
        .then((data) => { // Se a operação de criação for bem sucedida, retorna os dados com o id
        let artista = req.body;
        artista.id = data.id;
        res.status(201).send(artista);
        })    
    });

    // Rota para atualizar dados de um artista
    app.put(`${baseURL}/:id`, cors(), (req, res) => {
        // Verifica a consistência entre os ids do corpo da mensagem e do parâmetro
        if(req.params.id!=req.body.id)
        {
            res.status(500).json({erro: 'Ocorreu um erro em sua requisição. Consulte o administrador.'});
        } else {
            // As informações do artista serão atualizadas no banco de dados
            const { nome, pais } = getArtistData(req);
            const id = req.params.id;
            queries.update(id, nome, pais);

            // Recupera todos os campos
            getById(id, res);
        }
    
    });

    //Rota para recuperação da lista de artistas
    app.get(baseURL, cors(), (req, res) => {
        // Os artistas serão buscados no banco de dados
        getAll(res);
    });

    //Rota para recuperação de dados de um artista específico
    app.get(`${baseURL}/:id`, cors('/'), (req, res) => {
        // O artista será buscado no banco de dados
        getById(req.params.id, res);
    });

    //Rota para apagar registro de artista específico
    app.delete(`${baseURL}/:id`, cors(), (req, res) => {
        const id = req.params.id;
        queries.delete(id);
        let msg = `Registro com id ${id} apagado com sucesso`;
        console.log(msg);
        res.json({mensagem: msg});
    });
};

function getArtistData(req) {
    return { nome: req.body.nome, pais: req.body.pais };
}

function getById(id, res) {
    queries.getById(id)
        .then((artista) => {
        if (artista == null) {        
            res.status(404).json({erro: `Artista com id ${id} não encontrado`});
        } else {
            console.log(`Dados do artista recuperados do banco de dados`);      
            res.send(artista);
        }
        });    
}

function getAll(res) {
    queries.getAll()
        .then((artistas) => {
        if (artistas.length == 0) {
            res.json({erro: 'Nenhum artista encontrado'});
        } else {
            console.debug(`Lista de artistas recuperada do banco de dados`);
            res.send(artistas);
        }
        });
}