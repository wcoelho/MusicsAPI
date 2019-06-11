const sqlite3 = require('sqlite3')  
const Promise = require('bluebird')
const sqlErrorMsg = 'Erro ao executar o comando sql: ';

class CommonDao {  
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.log('Erro ao tentar conectar ao banco de dados', err)
      } else {
        console.log('Conexão ao banco de dados efetuada com sucesso!')
      }
    })
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log(sqlErrorMsg + sql)
          console.log(err)
          reject(err)
        } else {
          resolve({ id: this.lastID })
        }
      })
    })
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log(sqlErrorMsg + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log(sqlErrorMsg + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }  
}

module.exports = CommonDao  