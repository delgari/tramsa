const express = require('express');
const router = express.Router();


//RUTAS//

//rutas Login
router.get('/', (req, res) => {
  res.render('../HTML/Sistema/login.html');
});

//rutas Cambio de contraseña
router.get('/cambioPassword', (req, res) => {
  res.render('../HTML/Sistema/cambioPassword.html');
});

//rutas Página Principal
router.get('/paginaPrincipal', (req, res) => { //Browser
  res.render('../HTML/paginaPrincipal.html'); //Busca en el código
});

//rutas Bodegas
router.get('/bodegas', (req, res) => { //Browser
  res.render('../HTML/Administracion/bodegas.html'); //Busca en el código
});

//rutas Camiones
router.get('/camiones', (req, res) => { //Browser
  res.render('../HTML/Administracion/camiones.html'); //Busca en el código
});

//rutas Clientes
router.get('/clientes', (req, res) => { //Browser
  res.render('../HTML/Administracion/clientes.html'); //Busca en el código
});

//rutas Materia Prima
router.get('/materiaPrima', (req, res) => { //Browser
  res.render('../HTML/Administracion/materiaPrima.html'); //Busca en el código
});

//rutas Productos
router.get('/productos', (req, res) => { //Browser
  res.render('../HTML/Administracion/productos.html'); //Busca en el código
});

//rutas Productos Detalle
router.get('/productosD', (req, res) => { //Browser
  res.render('../HTML/Administracion/productosD.html'); //Busca en el código
});

//rutas Productos Maestro
router.get('/productosM', (req, res) => { //Browser
  res.render('../HTML/Administracion/productosM.html'); //Busca en el código
});

//rutas Proveedores
router.get('/proveedores', (req, res) => { //Browser
  res.render('../HTML/Administracion/proveedores.html'); //Busca en el código
});

//rutas Tipo de Materia Prima
router.get('/tipoMateriaPrima', (req, res) => { //Browser
  res.render('../HTML/Administracion/tipoMateriaPrima.html'); //Busca en el código
});


//ruta de conexion Consulta/bitacora
router.get('/bitacora', (req, res) => { //busqueda del browser
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("bitacora");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Consultas/bitacora', { Resultado: result }); //busqueda en code
      client.close();
    });
  });

})

//ruta de conexion Consulta/cliente
router.get('/cliente', (req, res) => { //busqueda del browser
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("cliente");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Consultas/cliente', { Resultado: result }); //busqueda en code
      client.close();
    });
  });

})

//ruta de conexion Consulta/pedido maestro
router.get('/pedido', (req, res) => { //busqueda del browser
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("pedido_maestro");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Consultas/pedido', { Resultado: result }); //busqueda en code
      client.close();
    });
  });

})

module.exports = router;

