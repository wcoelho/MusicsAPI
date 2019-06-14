class LyricQueries {  

    constructor(dao) {
      this.dao = dao
    }
  
    // Cria a tabela de letras, caso não exista
    createTable() {
      const sql =
        `CREATE TABLE IF NOT EXISTS letras(
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            titulo TEXT, 
            letra TEXT)`

      return this.dao.run(sql)
    }

    // Registra um novo letra
    create(titulo, letra) {
        return this.dao.run(
          `INSERT INTO letras (titulo, letra)
            VALUES (?, ?)`,
          [titulo, letra])
    }

    // Atualiza os dados de um letra
    update(id, titulo, letra) {
        return this.dao.run(
          `UPDATE letras SET titulo = ?, letra = ? WHERE id = ?`,
          [titulo, letra, id]
        )
    }

    // Apaga o registro de um letra
    delete(id) {
        return this.dao.run(
            `DELETE FROM letras WHERE id = ?`,
            [id]
        )
    }

    // Recupera informação de um letra
    getById(id) {
        return this.dao.get(
          `SELECT * FROM letras WHERE id = ?`,
          [id])
    }

    getByLyric(lyric) {
      return this.dao.get(
        `SELECT * FROM letras WHERE letra = ?`)
  }

    // Recupera lista de todos letras
    getAll() {
        return this.dao.all(`SELECT * FROM letras`)
    }
}
  
module.exports = LyricQueries; 