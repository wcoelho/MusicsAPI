class ArtistQueries {  

    constructor(dao) {
      this.dao = dao
    }
  
    // Cria a tabela de artistas, caso não exista
    createTable() {
      const sql =
        `CREATE TABLE IF NOT EXISTS artistas(
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            nome TEXT, 
            pais TEXT)`

      return this.dao.run(sql)
    }

    // Registra um novo artista
    create(nome, pais) {
        return this.dao.run(
          `INSERT INTO artistas (nome, pais)
            VALUES (?, ?)`,
          [nome, pais])
    }

    // Atualiza os dados de um artista
    update(id, nome, pais) {
        return this.dao.run(
          `UPDATE artistas SET nome = ?, pais = ? WHERE id = ?`,
          [nome, pais, id]
        )
    }

    // Apaga o registro de um artista
    delete(id) {
        return this.dao.run(
            `DELETE FROM artistas WHERE id = ?`,
            [id]
        )
    }

    // Recupera informação de um artista
    getById(id) {
        return this.dao.get(
          `SELECT * FROM artistas WHERE id = ?`,
          [id])
    }

    // Recupera lista de todos artistas
    getAll() {
        return this.dao.all(`SELECT * FROM artistas`)
    }
}
  
module.exports = ArtistQueries; 