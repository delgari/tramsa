const express = require('express');
const router = express.Router();




////################Login################
router.get('/', (req, res) => {
  res.render('../HTML/Sistema/login');
});


////################CambioContrasena################
router.get('/cambioPassword', (req, res) => {
  res.render('../HTML/Sistema/cambioPassword');
});


//################PaginaPrincipal################
router.get('/paginaPrincipal', (req, res) => {
  res.render('../HTML/paginaPrincipal');
});


//################ParametrosGenerales################
router.get('/parametrosGen', (req, res) => {
  res.render('../HTML/Parametros/parametrosGen.html');
});


//################Reportes################
router.get('/reportes', (req, res) => { //Browser
  res.render('../HTML/Reportes/reporte'); //Busca en el código
});


//################ProductoReportes################
router.get('/productoReporte', (req, res) => { //Browser
  res.render('../HTML/Reportes/productoReporte'); //Busca en el código
});


//################InventarioReportes################
router.get('/inventario', (req, res) => { //Browser
  res.render('../HTML/Reportes/inventario'); //Busca en el código
});


//################InventarioBodegaReportes################
router.get('/inventarioBodega', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("bodega");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Reportes/bodegaReporte', { Resultado: result });
      client.close();
    });
  });
});


//################InventarioGeneralReportes################
router.get('/inventarioGeneral', (req, res) => {
  res.render('../HTML/Reportes/invGeReporte');
});


//################AcercaDe################
router.get('/acercaDe', (req, res) => { //Browser
  res.render('../HTML/Ayuda/acercaDe.html'); //Busca en el código
});


//################Ayuda################
router.get('/ayuda', (req, res) => { //Browser
  res.render('../HTML/Ayuda/ayuda.html'); //Busca en el código
});



//################Administracion/Bodegas################
router.get('/bodegas', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("bodega");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Administracion/bodegas', { Resultado: result });
      client.close();
    });
  });
})
//Insertar Bodegas
router.get('/formBodegas', (req, res) => {
  res.render('../HTML/Administracion/Forms/formBodegas', {
    data: {},
    errors: {}
  });
});
router.post('/formBodegas', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("bodega");
    collection.insertOne(req.body, function (err, res) {
      if (err) throw err;
      client.close();
    })
  }),
    res.render('../HTML/Administracion/Forms/formBodegas', {
      data: req.body
    })
});

//Eliminar Bodegas
router.post('/bodegas', (req, res) => {
  
  const MongoClient = require('mongodb').MongoClient;
  const Mongodb = require('mongodb');
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });

  client.connect(err => {
    const collection = client.db("tramsadb").collection("bodega");
    console.log(req.body);


    collection.deleteOne({_id: new Mongodb.ObjectID(req.body._id),function(err, res) {
      if (err) throw err;
      client.close();
      
    }})

  }),
  res.redirect('/bodegas');

});



//################Administracion/Camiones################
router.get('/camiones', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("camion");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Administracion/camiones', { Resultado: result });
      client.close();
    });
  });
})
//InsertarCamiones
router.get('/formCamiones', (req, res) => {
  res.render('../HTML/Administracion/Forms/formCamiones', {
    data: {},
    errors: {}
  });
});
router.post('/formCamiones', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("camion");
    collection.insertOne(req.body, function (err, res) {
      if (err) throw err;
      client.close();
    })
  }),
    res.render('../HTML/Administracion/Forms/formCamiones', {
      data: req.body
    })
});

//Eliminar Camiones
router.post('/camiones', (req, res) => {
  
  const MongoClient = require('mongodb').MongoClient;
  const Mongodb = require('mongodb');
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });

  client.connect(err => {
    const collection = client.db("tramsadb").collection("camion");
    console.log(req.body);


    collection.deleteOne({_id: new Mongodb.ObjectID(req.body._id),function(err, res) {
      if (err) throw err;
      client.close();
      
    }})

  }),
  res.redirect('/camiones');

});

//################Administracion/Clientes################
router.get('/clientes', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("cliente");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Administracion/clientes', { Resultado: result });
      client.close();
    });
  });
})
//Insertar Camiones
router.get('/formClientes', (req, res) => {
  res.render('../HTML/Administracion/Forms/formClientes', {
    data: {},
    errors: {}
  });
});
router.post('/formClientes', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("cliente");
    collection.insertOne(req.body, function (err, res) {
      if (err) throw err;
      client.close();
    })
  }),
    res.render('../HTML/Administracion/Forms/formClientes', {
      data: req.body
    })
});

//Eliminar Clientes
router.post('/clientes', (req, res) => {
  
  const MongoClient = require('mongodb').MongoClient;
  const Mongodb = require('mongodb');
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });

  client.connect(err => {
    const collection = client.db("tramsadb").collection("cliente");
    console.log(req.body);


    collection.deleteOne({_id: new Mongodb.ObjectID(req.body._id),function(err, res) {
      if (err) throw err;
      client.close();
      
    }})

  }),
  res.redirect('/clientes');

});


//################Administracion/MateriaPrima################
router.get('/materiaPrima', (req, res) => { //busqueda del browser
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("materiaPrima");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Administracion/materiaPrima', { Resultado: result });
      client.close();
    });
  });
})
//Insertar MateriaPrima
router.get('/formMateriaPrima', (req, res) => {
  res.render('../HTML/Administracion/Forms/formMateriaPrima', {
    data: {},
    errors: {}
  });
});
router.post('/formMateriaPrima', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("materiaPrima");
    collection.insertOne(req.body, function (err, res) {
      if (err) throw err;
      client.close();
    })
  }),
    res.render('../HTML/Administracion/Forms/formMateriaPrima', {
      data: req.body
    })
});

//Eliminar Materia Prima
router.post('/materiaPrima', (req, res) => {
  
  const MongoClient = require('mongodb').MongoClient;
  const Mongodb = require('mongodb');
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });

  client.connect(err => {
    const collection = client.db("tramsadb").collection("materiaPrima");
    console.log(req.body);


    collection.deleteOne({_id: new Mongodb.ObjectID(req.body._id),function(err, res) {
      if (err) throw err;
      client.close();
      
    }})

  }),
  res.redirect('/materiaPrima');

});

//################Administracion/Productos################
router.get('/productos', (req, res) => {
  res.render('../HTML/Administracion/productos');
});



//################Administracion/ProductosDetalle################
router.get('/productosD', (req, res) => { //busqueda del browser
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("productoDetalle");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Administracion/productosD', { Resultado: result }); //busqueda en code
      client.close();
    });
  });

})

//Insertar ProductosDetalle
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
    const collection = client.db("tramsadb").collection("productoDetalle");
    collection.insertOne(req.body,function(err, res) {
      if (err) throw err;
      client.close();
    })
  }),
  res.render('../HTML/Administracion/Forms/formProducD', {
    data: req.body
  })
});

//Eliminar Producto Detalle
router.post('/productosD', (req, res) => {
  
  const MongoClient = require('mongodb').MongoClient;
  const Mongodb = require('mongodb');
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });

  client.connect(err => {
    const collection = client.db("tramsadb").collection("productoDetalle");
    console.log(req.body);


    collection.deleteOne({_id: new Mongodb.ObjectID(req.body._id),function(err, res) {
      if (err) throw err;
      client.close();
      
    }})

  }),
  res.redirect('/productosD');

});


//################Administracion/ProductosMaestro################
router.get('/productosM', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("productoMaestro");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Administracion/productosM', { Resultado: result });
      client.close();
    });
  });
})
//Insertar Productos Maestro
router.get('/formProducM', (req, res) => {
  res.render('../HTML/Administracion/Forms/formProducM', {
    data: {},
    errors: {}
  });
});
router.post('/formProducM', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("productoMaestro");
    collection.insertOne(req.body, function (err, res) {
      if (err) throw err;
      client.close();
    })
  }),
    res.render('../HTML/Administracion/Forms/formProducM', {
      data: req.body
    })
});

//Eliminar Producto Maestro
router.post('/productosM', (req, res) => {
  
  const MongoClient = require('mongodb').MongoClient;
  const Mongodb = require('mongodb');
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });

  client.connect(err => {
    const collection = client.db("tramsadb").collection("productoMaestro");
    console.log(req.body);


    collection.deleteOne({_id: new Mongodb.ObjectID(req.body._id),function(err, res) {
      if (err) throw err;
      client.close();
      
    }})

  }),
  res.redirect('/productosM');

});


//################Administracion/Proveedores################
router.get('/proveedores', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("proveedores");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Administracion/proveedores', { Resultado: result });
      client.close();
    });
  });
})
//Insertar Proveedores
router.get('/formProveedores', (req, res) => {
  res.render('../HTML/Administracion/Forms/formProveedores', {
    data: {},
    errors: {}
  });
});
router.post('/formProveedores', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("proveedores");
    collection.insertOne(req.body, function (err, res) {
      if (err) throw err;
      client.close();
    })
  }),
    res.render('../HTML/Administracion/Forms/formProveedores', {
      data: req.body
    })
});

//Eliminar Proveedores
router.post('/proveedores', (req, res) => {
  
  const MongoClient = require('mongodb').MongoClient;
  const Mongodb = require('mongodb');
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });

  client.connect(err => {
    const collection = client.db("tramsadb").collection("proveedores");
    console.log(req.body);


    collection.deleteOne({_id: new Mongodb.ObjectID(req.body._id),function(err, res) {
      if (err) throw err;
      client.close();
      
    }})

  }),
  res.redirect('/proveedores');

});

//################Administracion/TipoMateriaPrima################
router.get('/tipoMateriaPrima', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("tipoMateriaPrima");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Administracion/tipoMateriaPrima', { Resultado: result });
      client.close();
    });
  });
})
//Insertar TipoMateriaPrima
router.get('/formTipoMateria', (req, res) => {
  res.render('../HTML/Administracion/Forms/formTipoMateria', {
    data: {},
    errors: {}
  });
});
router.post('/formTipoMateria', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("tipoMateriaPrima");
    collection.insertOne(req.body, function (err, res) {
      if (err) throw err;
      client.close();
    })
  }),
    res.render('../HTML/Administracion/Forms/formTipoMateria', {
      data: req.body
    })
});

//Eliminar Tipo Materia Prima
router.post('/tipoMateriaPrima', (req, res) => {
  
  const MongoClient = require('mongodb').MongoClient;
  const Mongodb = require('mongodb');
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });

  client.connect(err => {
    const collection = client.db("tramsadb").collection("tipoMateriaPrima");
    console.log(req.body);


    collection.deleteOne({_id: new Mongodb.ObjectID(req.body._id),function(err, res) {
      if (err) throw err;
      client.close();
      
    }})

  }),
  res.redirect('/tipoMateriaPrima');

});


//################Consultas/Pedido################
router.get('/pedido', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("pedido_maestro");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Consultas/pedido', { Resultado: result });
      client.close();
    });
  });
})


//################Procesos/PedidosMateria################
//Crear
router.get('/pedidosMateria', (req, res) => {
  res.render('../HTML/Procesos/pedidosMateria.ejs');
});
//Filtrar
router.get('/filtrarPedidosMateria', (req, res) => {
  res.render('../HTML/Procesos/filtrarPedidosMateria.html');
});



//################Procesos/PedidoMaestro################
router.get('/pedidosMateriaM', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("pedido_maestro");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Procesos/pedidosMateriaM', { Resultado: result });
      client.close();
    });
  });
})
//Insertar PedidoMaestro
router.get('/formPedidosMateriaM', (req, res) => {
  res.render('../HTML/Procesos/Forms/formPedidosMateriaM', {
    data: {},
    errors: {}
  });
});
router.post('/formPedidosMateriaM', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("pedido_maestro");
    collection.insertOne(req.body, function (err, res) {
      if (err) throw err;
      client.close();
    })
  }),
    res.render('../HTML/Procesos/Forms/formPedidosMateriaM', {
      data: req.body
    })
});



//################Procesos/PedidoDetalle################
router.get('/pedidosMateriaD', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("pedido_detalle");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Procesos/pedidosMateriaD', { Resultado: result });
      client.close();
    });
  });
})
//Insertar PedidoDetalle
router.get('/formPedidosMateriaD', (req, res) => {
  res.render('../HTML/Procesos/Forms/formPedidosMateriaD', {
    data: {},
    errors: {}
  });
});
router.post('/formPedidosMateriaD', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("pedido_detalle");
    collection.insertOne(req.body, function (err, res) {
      if (err) throw err;
      client.close();
    })
  }),
    res.render('../HTML/Procesos/Forms/formPedidosMateriaD', {
      data: req.body
    })
});



//################Procesos/ProduccionEnLote################
router.get('/produccionLote', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("produccionLote");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Procesos/produccionLote', { Resultado: result });
      client.close();
    });
  });
})
//Insertar ProduccionLote
router.get('/formProduccionLote', (req, res) => {
  res.render('../HTML/Procesos/Forms/formProduccionLote.ejs', {
    data: {},
    errors: {}
  });
});
router.post('/formProduccionLote', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("produccionLote");
    collection.insertOne(req.body, function (err, res) {
      if (err) throw err;
      client.close();
    })
  }),
    res.render('../HTML/Procesos/Forms/formProduccionLote.ejs', {
      data: req.body
    })
});


//Modificar ProduccionLote
router.get('/formProdModificar/:id', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const Mongodb = require('mongodb');
  client.connect(err => {
    const collection = client.db("tramsadb").collection("produccionLote");
    collection.findOne({_id: new Mongodb.ObjectId(req.params.id) }, function(err, result) {
      if (err) throw err;
      res.render('../HTML/Procesos/Forms/formProdModificar', 
      { Resultado: result,
        Updated: ""  });
      client.close();
    });
  });
});

router.post('/formProdModificar/:id', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const Mongodb = require('mongodb');
  const request = req;
  var mensaje = "";
  client.connect(err => {
    const collection = client.db("tramsadb").collection("produccionLote");
    const myquery = { _id: new Mongodb.ObjectId(request.params.id) };
    const newvalues = { $set: {
      numProduccion: request.body.numProduccion,
      Fecha: request.body.Fecha,
      codigoProducto: request.body.codigoProducto,
      Producto: request.body.Producto,
      Bodega: request.body.Bodega,
      Cantidad: request.body.Cantidad,
      Tiempo: request.body.Tiempo
    } };
    collection.findOneAndUpdate(myquery, newvalues, {upsert: true}, function(err,doc) {
      if (err) { throw err; }
      else {
        mensaje = "Objeto actualizado";
        res.render('../HTML/Procesos/Forms/formProdModificar', 
        { Resultado: req.body,
          Updated: mensaje 
        } );
      }
    })
  })
});



//Eliminar ProduccionLote
router.post('/produccionLote', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const Mongodb = require('mongodb');
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("produccionLote");
    collection.deleteOne({
      _id: new Mongodb.ObjectID(req.body._id), function(err, res) {
        if (err) throw err;
        client.close();
      }
    })
  }),
    res.redirect('/produccionLote');
});



//################Procesos/PuntoDeVenta################
router.get('/puntoVenta', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("venta");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Procesos/puntoVenta', { Resultado: result });
      client.close();
    });
  });
})
//Insertar PuntoVenta
router.get('/formPuntoVenta', (req, res) => {
  res.render('../HTML/Procesos/Forms/formPuntoVenta.ejs', {
    data: {},
    errors: {}
  });
});
router.post('/formPuntoVenta', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("venta");
    collection.insertOne(req.body, function (err, res) {
      if (err) throw err;
      client.close();
    })
  }),
    res.render('../HTML/Procesos/Forms/formPuntoVenta.ejs', {
      data: req.body
    })
});



//################Consulta/Bitacora################
router.get('/bitacora', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("bitacora");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Consultas/bitacora', { Resultado: result });
      client.close();
    });
  });
})



//################Consulta/Cliente################
router.get('/cliente', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("cliente");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Consultas/cliente', { Resultado: result });
      client.close();
    });
  });
})



//################Reportes/ProductosMaestro################
router.get('/productosReporte', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("productoMaestro");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Reportes/productoReporte', { Resultado: result });
      client.close();
    });
  });
})



//################Reportes/InventarioBodega################
router.get('/bodegaReporte', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("produccionLote");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Reportes/bodegaReporte', { Resultado: result });
      client.close();
    });
  });
})



//################Reportes/InventarioGeneral################
router.get('/invGeReporte', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("productoMaestro");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Reportes/invGeReporte', { Resultado: result });
      client.close();
    });
  });
})




module.exports = router;

