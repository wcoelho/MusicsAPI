class MusicQueries {  

    constructor(dao) {
      this.dao = dao
    }
  
    // Cria a tabela de músicas, caso não exista
    createTable() {
      const sql =
        `CREATE TABLE IF NOT EXISTS musicas(
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            titulo TEXT, 
            idArtista INTEGER,
            idLetra INTEGER)`

      return this.dao.run(sql)
    }

    // Registra um novo música
    create(titulo, idArtista, idLetra) {
        return this.dao.run(
          `INSERT INTO musicas (titulo, idArtista, idLetra)
            VALUES (?, ?, ?)`,
          [titulo, idArtista, idLetra])
    }

    // Atualiza os dados de um música
    update(id, titulo, idArtista, idLetra) {
        return this.dao.run(
          `UPDATE musicas SET titulo = ?, idArtista = ?, idLetra = ? WHERE id = ?`,
          [titulo, idArtista, idLetra, id]
        )
    }

    // Apaga o registro de um música
    delete(id) {
        return this.dao.run(
            `DELETE FROM musicas WHERE id = ?`,
            [id]
        )
    }

    // Recupera informação de um música
    getById(id) {
        return this.dao.get(
          `SELECT * FROM musicas WHERE id = ?`,
          [id])
    }

    // Recupera informação de um música a partir de nome 
    getByName(name) {
      return this.dao.get(
        `SELECT * FROM musicas WHERE titulo = ?`,
        [name])
    }

    // Recupera lista de todos músicas
    getAll() {
      return this.dao.all(`SELECT * FROM musics`)
    }
}
  
module.exports = MusicQueries; 