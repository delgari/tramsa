const express = require('express');
const app = express();
app.set("port", 8000);
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'ejs');

//Middleware
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));


//Express utilizar el json con tipo application/json con el texto plano
//Se utiliza para eliminar, debido a que node creia que se le estaba pasando un txt plano
app.use(express.json({
  type: ['application/json', 'text/plain']
}));

app.use(require("body-parser").json());



app.use(require('./Rutas/index'));
app.use(express.static(__dirname + '/public'));


app.listen(app.get("port"), () => {
  console.log("server en el puerto", app.get("port"));
});

// //Conexión con la base de datos
// //Colección de Bodegas
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });
// client.connect(err => {
//   const collection = client.db("tramsadb").collection("bodega");
//   collection.find({}).toArray(function (err, result) {
//     if (err) throw err;
//     console.log(result);
//     client.close();
// });
// });

