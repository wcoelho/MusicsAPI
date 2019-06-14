# MusicsAPI
API para Gerenciamento de Artistas, Músicas, Letras e Playlists, com integração às APIs do Spotify para busca de músicas e playlists e MusixMatch para busca de letras de músicas.  

## Instalação de dependências
npm install  
  
## Inicialização
npm start  

## Testes  
Postman Collection - pasta Tests  

## Proteção  
Circuit Breaker implementado para verificar o acesso ao MusixMatch. 
  
## Serviços  
URI comum: http://localhost:3001/api/v1  
   
**GET**    
- /letras/?titulo=\<titulo da musica\>&artista=\<nome do artista\>  
=> Busca letra da música a partir do https://api.musixmatch.com  e registra no banco de dados
- /musicas/?titulo=\<titulo da musica\>&artista=\<nome do artista\>&token=\<token de acesso ao Spotify\>  
=> Busca informações sobre a música a partir do Spotify  
- /playlists/?token=\<token de acesso ao Spotify\>  
=> Busca lista de playlists a partir do Spotify  
- /letras  
=> Busca informações sobre letras a partir do Spotify  
- /musicas  
=> Busca informações sobre a músicas a partir do banco de dados  
- /artista  
=> Busca artistas cadastrados  
- /playlists  
=> Busca lista de playlists a partir do banco de dados  
- /letras/\<id\>  
=> Busca letra da música específica a partir do banco de dados  
- /musicas/\<id\>  
=> Busca informações sobre música específica a partir do banco de dados  
- /artista/\<id\>  
=> Busca informações sobre artista especifico  
    
**POST**  
- /letras 
=> Cadastra nova letra. Payload:  
{  
	"titulo": "<titulo>",  
    "letra": "<letra>"  
} 
- /musicas 
=> Cadastra nova música. Payload:  
{  
    "titulo": "<titulo>",  
    "idArtista": <idArtista>,  
    "idLetra": <idLetra>  
}  
- /artistas  
=> Cadastra novo artista. Payload:  
{  
    "nome": "<nome - string>",  
    "pais": "<pais - string>",  
}  
  

**PUT**   
- /letras/\<id\>  
=> Atualiza cadastro de letra. Payload:  
{  
	"titulo": "<titulo>",  
    "letra": "<letra>",  
    "id": <id>  
}  
- /musicas/\<id\>  
=> Atualiza cadastro de música. Payload:  
{  
    "titulo": "<titulo>",  
    "idArtista": <idArtista>,  
    "idLetra": <idLetra>,  
    "id": <id>  
}  
- /artistas/\<id\>  
=> Atualiza cadastro de artista. Payload:  
{  
  "nome": "<nome - string>",  
  "pais": "<pais - string>",  
  "id": <id - int>  
}  
    
**DELETE**   
- /letras/\<id\>  
=> Apaga cadastro de letra.  
- /musicas/\<id\>  
=> Apaga cadastro de música. 
- /artistas/\<id\>  
=> Apaga cadastro de artista. 
- /playlists/\<id\>  
=> Apaga cadastro de playlist.



