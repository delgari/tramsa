const express = require('express');
const router = express.Router();


//RUTAS//

//rutas Login
router.get('/', (req, res) => {
  res.render('../HTML/Sistema/login');
});

//rutas Cambio de contraseña
router.get('/cambioPassword', (req, res) => {
  res.render('../HTML/Sistema/cambioPassword');
});

//rutas Página Principal
router.get('/paginaPrincipal', (req, res) => { //Browser
  res.render('../HTML/paginaPrincipal'); //Busca en el código
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

//rutas Crear Pedidos de Materia
router.get('/crearPedidosMateria', (req, res) => { //Browser
  res.render('../HTML/Procesos/crearPedidosMateria.html'); //Busca en el código
});

//rutas Filtrar pedidos materia
router.get('/filtrarPedidosMateria', (req, res) => { //Browser
  res.render('../HTML/Procesos/filtrarPedidosMateria.html'); //Busca en el código
});

//rutas reportes
router.get('/reportes', (req, res) => { //Browser
  res.render('../HTML/Reportes/reporte'); //Busca en el código
});

//rutas Producto reportes
router.get('/productoReporte', (req, res) => { //Browser
  res.render('../HTML/Reportes/productoReporte'); //Busca en el código
});

//rutas formPuntoVenta
router.get('/puntoVenta', (req, res) => { //Browser
  res.render('../HTML/Procesos/Forms/formPuntoVenta.html'); //Busca en el código
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

router.post('/bodegas', (req, res) => {
  //console.log(req , 'req.body');
  console.log(res);

  res.redirect('/bodegas');
});

//ruta de conexion  Insertar en /HTML/Administracion/Forms/formBodegas
router.get('/formBodegas', (req, res) => {
  res.render('../HTML/Administracion/Forms/formBodegas', {
    data: {},
    errors: {}
  });
});

router.post('/formBodegas', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });

  client.connect(err => {
    const collection = client.db("tramsadb").collection("bodega");
    collection.insertOne(req.body,function(err, res) {
      if (err) throw err;
      client.close();
    })
  }),
  res.render('../HTML/Administracion/Forms/formBodegas', {
    data: req.body
  })
});


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

//ruta de conexion  Insertar en /HTML/Administracion/Forms/formCamiones
router.get('/formCamiones', (req, res) => {
  res.render('../HTML/Administracion/Forms/formCamiones', {
    data: {},
    errors: {}
  });
});

router.post('/formCamiones', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });

  client.connect(err => {
    const collection = client.db("tramsadb").collection("camion");
    collection.insertOne(req.body,function(err, res) {
      if (err) throw err;
      client.close();
    })
  }),
  res.render('../HTML/Administracion/Forms/formCamiones', {
    data: req.body
  })
});

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

//ruta de conexion  Insertar en /HTML/Administracion/Forms/formClientes
router.get('/formClientes', (req, res) => {
  res.render('../HTML/Administracion/Forms/formClientes', {
    data: {},
    errors: {}
  });
});

router.post('/formClientes', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });

  client.connect(err => {
    const collection = client.db("tramsadb").collection("cliente");
    collection.insertOne(req.body,function(err, res) {
      if (err) throw err;
      client.close();
    })
  }),
  res.render('../HTML/Administracion/Forms/formClientes', {
    data: req.body
  })
});

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

//ruta de conexion  Insertar en /HTML/Administracion/Forms/formMateriaPrima
router.get('/formMateriaPrima', (req, res) => {
  res.render('../HTML/Administracion/Forms/formMateriaPrima', {
    data: {},
    errors: {}
  });
});

router.post('/formMateriaPrima', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });

  client.connect(err => {
    const collection = client.db("tramsadb").collection("materiaPrima");
    collection.insertOne(req.body,function(err, res) {
      if (err) throw err;
      client.close();
    })
  }),
  res.render('../HTML/Administracion/Forms/formMateriaPrima', {
    data: req.body
  })
});

//rutas Productos
router.get('/productos', (req, res) => { //Browser
  res.render('../HTML/Administracion/productos'); //Busca en el código
});

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

//ruta de conexion  Insertar en /HTML/Administracion/Forms/formProducD
router.get('/formProducD', (req, res) => {
  res.render('../HTML/Administracion/Forms/formProducD', {
    data: {},
    errors: {}
  });
});

router.post('/formProducD', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });

  client.connect(err => {
    const collection = client.db("tramsadb").collection("productoD");
    collection.insertOne(req.body,function(err, res) {
      if (err) throw err;
      client.close();
    })
  }),
  res.render('../HTML/Administracion/Forms/formProducD', {
    data: req.body
  })
});

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

//ruta de conexion  Insertar en /HTML/Administracion/Forms/formProducM
router.get('/formProducM', (req, res) => {
  res.render('../HTML/Administracion/Forms/formProducM', {
    data: {},
    errors: {}
  });
});

router.post('/formProducM', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });

  client.connect(err => {
    const collection = client.db("tramsadb").collection("productoM");
    collection.insertOne(req.body,function(err, res) {
      if (err) throw err;
      client.close();
    })
  }),
  res.render('../HTML/Administracion/Forms/formProducM', {
    data: req.body
  })
});

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

//ruta de conexion  Insertar en /HTML/Administracion/Forms/formProveedores
router.get('/formProveedores', (req, res) => {
  res.render('../HTML/Administracion/Forms/formProveedores', {
    data: {},
    errors: {}
  });
});

router.post('/formProveedores', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });

  client.connect(err => {
    const collection = client.db("tramsadb").collection("proveedores");
    collection.insertOne(req.body,function(err, res) {
      if (err) throw err;
      client.close();
    })
  }),
  res.render('../HTML/Administracion/Forms/formProveedores', {
    data: req.body
  })
});

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

//ruta de conexion  Insertar en /HTML/Administracion/Forms/formTipoMateria
router.get('/formTipoMateria', (req, res) => {
  res.render('../HTML/Administracion/Forms/formTipoMateria', {
    data: {},
    errors: {}
  });
});

router.post('/formTipoMateria', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });

  client.connect(err => {
    const collection = client.db("tramsadb").collection("tipoMateriaPrima");
    collection.insertOne(req.body,function(err, res) {
      if (err) throw err;
      client.close();
    })
  }),
  res.render('../HTML/Administracion/Forms/formTipoMateria', {
    data: req.body
  })
});



//ruta de conexion Procesos/Pedido Maestro
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



//ruta de conexion Procesos/Pedido Maestro
router.get('/pedidosMateriaM', (req, res) => { //busqueda del browser
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("pedido_maestro");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Procesos/crearPedidosMateriaM', { Resultado: result }); //busqueda en code
      client.close();
    });
  });
})



//ruta de conexion Procesos/Pedido Detalle
router.get('/pedidosMateriaD', (req, res) => { //busqueda del browser
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("pedido_detalle");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Procesos/crearPedidosMateriaD', { Resultado: result }); //busqueda en code
      client.close();
    });
  });
})


//ruta de conexion Procesos/Produccion en Lote
router.get('/produccionLote', (req, res) => { //busqueda del browser
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("produccionLote");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Procesos/produccionLote', { Resultado: result }); //busqueda en code
      client.close();
    });
  });
})


//ruta de conexion  Insertar en /HTML/Procesos/Forms/formProduccionLote
router.get('/formProduccionLote', (req, res) => {
  res.render('../HTML/Procesos/Forms/formProduccionLote.html', {
    data: {},
    errors: {}
  });
});

router.post('/formProduccionLote', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });

  client.connect(err => {
    const collection = client.db("tramsadb").collection("produccionLote");
    collection.insertOne(req.body,function(err, res) {
      if (err) throw err;
      client.close();
    })
  }),
  res.render('../HTML/Procesos/Forms/formProduccionLote.html', {
    data: req.body
  })
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


module.exports = router;

