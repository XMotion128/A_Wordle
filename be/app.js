const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;
const PAROLA = 'AMORE';

app.post('/checkWord', (req, res) => {
  const insWord = req.body;
  const colors = ['', '', '', '', ''];
  const charOut = [];  // tiene traccia delle lettere presenti
  insWord.forEach((ch, ind) => {
    if(ch == PAROLA[ind] && !(ch in charOut)) {
      colors[ind] = 'green';
      charOut.push(ch);
    }
    else
    if(PAROLA.includes(ch) && !(ch in charOut)) {
      colors[ind] = 'yellow';
      charOut.push(ch);
    }
    else colors[ind] = '';
  });

  res.send(JSON.stringify(colors));
})

app.listen(
  PORT, 
  () => console.log('Server listening on port 4000')
)

module.exports = app;