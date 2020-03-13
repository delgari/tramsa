const express = require('express');
const router = express.Router();
//const path = require('path');
const tbl = ["Codigo Bitacora","Usuario","Fecha","Descripción"];


//rutas
router.get('/', (req, res) => {
  res.render('../HTML/Sistema/login.html');
});

router.get('/bitacora', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("bitacora");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Consultas/bitacora', {Resultado: result[0]});
      console.log(result);
      client.close();
    });
  });

})

module.exports = router;

