testObj = {
    word: 'amore'
}

// esempio di fetch e gestione della risposta
const response = async () => {
  await fetch("http://localhost:4000/checkWord", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(testObj),
  })
    .then(async(res) => console.log(`request sent, response value: '${await res.json()}'`))
    .catch((error) => console.error(error));
};
  
response()