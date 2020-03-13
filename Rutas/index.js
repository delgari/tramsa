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


//rutas Productos
router.get('/productos', (req, res) => { //Browser
  res.render('../HTML/Administracion/productos.html'); //Busca en el código
});

//rutas formBodegas
router.get('/formBodegas', (req, res) => { //Browser
  res.render('../HTML/Administracion/Forms/formBodegas.html'); //Busca en el código
});

//rutas formClientes
router.get('/formClientes', (req, res) => { //Browser
  res.render('../HTML/Administracion/Forms/formClientes.html'); //Busca en el código
});

//rutas formCamiones
router.get('/formCamiones', (req, res) => { //Browser
  res.render('../HTML/Administracion/Forms/formCamiones.html'); //Busca en el código
});

//rutas formMateriaPrima
router.get('/formMateriaPrima', (req, res) => { //Browser
  res.render('../HTML/Administracion/Forms/formMateriaPrima.html'); //Busca en el código
});

//rutas formProveedores
router.get('/formProveedores', (req, res) => { //Browser
  res.render('../HTML/Administracion/Forms/formProveedores.html'); //Busca en el código
});

//rutas formTipoMateria
router.get('/formTipoMateria', (req, res) => { //Browser
  res.render('../HTML/Administracion/Forms/formTipoMateria.html'); //Busca en el código
});

//rutas Acerca De
router.get('/acercaDe', (req, res) => { //Browser
  res.render('../HTML/Ayuda/acercaDe.html'); //Busca en el código
});

//rutas Ayuda
router.get('/ayuda', (req, res) => { //Browser
  res.render('../HTML/Ayuda/ayuda.html'); //Busca en el código
});

//rutas Parámetros generales
router.get('/parametrosGen', (req, res) => { //Browser
  res.render('../HTML/Parametros/parametrosGen.html'); //Busca en el código
});

//rutas Crear pedidos materia
router.get('/crearPedidosMateria', (req, res) => { //Browser
  res.render('../HTML/Procesos/crearPedidosMateria.html'); //Busca en el código
});

//rutas Filtrar pedidos materia
router.get('/crearPedidosMateria', (req, res) => { //Browser
  res.render('../HTML/Procesos/crearPedidosMateria.html'); //Busca en el código
});


//ruta de conexion Administracion/Bodegas
router.get('/bodegas', (req, res) => { //busqueda del browser
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("bodega");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Administracion/bodegas', { Resultado: result }); //busqueda en code
      client.close();
    });
  });

})

//ruta de conexion Administracion/Camiones
router.get('/camiones', (req, res) => { //busqueda del browser
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("camion");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Administracion/camiones', { Resultado: result }); //busqueda en code
      client.close();
    });
  });

})

//ruta de conexion Administracion/Clientes
router.get('/clientes', (req, res) => { //busqueda del browser
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("cliente");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Administracion/clientes', { Resultado: result }); //busqueda en code
      client.close();
    });
  });

})

//ruta de conexion Administracion/Materia prima
router.get('/materiaPrima', (req, res) => { //busqueda del browser
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("materiaPrima");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Administracion/materiaPrima', { Resultado: result }); //busqueda en code
      client.close();
    });
  });

})

//ruta de conexion Administracion/Productos Detalle
router.get('/productosD', (req, res) => { //busqueda del browser
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("productoD");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Administracion/productosD', { Resultado: result }); //busqueda en code
      client.close();
    });
  });

})

//ruta de conexion Administracion/Productos Maestro
router.get('/productosM', (req, res) => { //busqueda del browser
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("productoM");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Administracion/productosM', { Resultado: result }); //busqueda en code
      client.close();
    });
  });

})

//ruta de conexion Administracion/Proveedores
router.get('/proveedores', (req, res) => { //busqueda del browser
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("proveedores");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Administracion/proveedores', { Resultado: result }); //busqueda en code
      client.close();
    });
  });

})

//ruta de conexion Administracion/Tipo materia prima
router.get('/tipoMateriaPrima', (req, res) => { //busqueda del browser
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("tipoMateriaPrima");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Administracion/tipoMateriaPrima', { Resultado: result }); //busqueda en code
      client.close();
    });
  });

})



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

