class PlaylistQueries {  

    constructor(dao) {
      this.dao = dao
    }
  
    // Cria a tabela de playlists, caso não exista
    createTable() {
      const sql =
        `CREATE TABLE IF NOT EXISTS playlists(
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            nome TEXT, 
            idSpotifyPlaylist INTEGER,
            idSpotifyUser INTEGER)`

      return this.dao.run(sql)
    }

    // Registra um nova playlist
    create(nome, idSpotifyPlaylist, idSpotifyUser) {
        return this.dao.run(
          `INSERT INTO playlists (nome, idSpotifyPlaylist, idSpotifyUser)
            VALUES (?, ?, ?)`,
          [nome, idSpotifyPlaylist, idSpotifyUser])
    }

    // Apaga o registro de um playlist
    delete(id) {
        return this.dao.run(
            `DELETE FROM playlists WHERE id = ?`,
            [id]
        )
    }

    // Recupera informação de um playlist
    getBySpotifyIds(playlistId,ownerId) {    
        return this.dao.get(
          `SELECT * FROM playlists WHERE idSpotifyPlaylist = ? and idSpotifyUser = ?`,
          [playlistId, ownerId])
    }

    // Recupera lista de todas playlists
    getAll() {
      return this.dao.all(`SELECT * FROM playlists`)
    }
}
  
module.exports = PlaylistQueries; 