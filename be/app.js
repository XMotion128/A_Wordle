const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
extended: true
}));

const PORT = 4000;
const PAROLA = 'AMORE';

app.post('/login', (req, res) => {
  let db = new sqlite3.Database('./db/wordle.db');

  dati = req.body;
  console.log(dati)
  let sql = 'select * from UTENTE where username=?'

  db.get(sql, [dati.username], (err, row) => {
    if (row === undefined) {
      console.log("Non esiste nessun riferimento nel database, creazione utente...")
      db.run('insert into UTENTE (username, password) values (?, ?)', [dati.username, dati.password])
      res.send(true)
    }
    else if (row.password != dati.password) {
        res.send(false)
      }
    else {
      res.send(true)
    }
  })
  
  db.close();
})

app.listen(
  PORT, 
  () => console.log(`Server listening on port ${PORT}`)
)

module.exports = app;