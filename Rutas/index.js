const express = require('express');
const router = express.Router();

const Consecutivos = {
  tMateriaP: {
    prefijo: 'TMP',
    valor: 1
  },
  bodegas: {
    prefijo: 'BO',
    valor: 1
  },
  materiaP: {
    prefijo: 'MP',
    valor: 1
  },
  productosD: {
    prefijo: 'PRD',
    valor: 1
  },
  productosM: {
    prefijo: 'PRM',
    valor: 1
  },
  usuarios: {
    prefijo: 'US',
    valor: 1
  },
  clientes: {
    prefijo: 'CL',
    valor: 1
  },
  aperturaCaja: {
    prefijo: 'AC',
    valor: 1
  },
  camiones: {
    prefijo: 'CA',
    valor: 1
  },
  proveedores: {
    prefijo: 'PRO',
    valor: 1
  }
}

////################Login################
router.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/paginaPrincipal');
  } else {
    res.render('../HTML/Sistema/login', {
      validacion: ""
    });
  }
});

//################Sistema/Login################
router.post('/', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("usuario");
    collection.findOne({ user: req.body.user }, function (err, user) {
      if (user == null) {
        res.render('../HTML/Sistema/login',
          { validacion: 'Usuario no encontrado' });
      } else {
        if (req.body.contrasena == user.contrasena && user.estado != "Inactivo") {
          req.session.user = user; // se guarda el objeto del usuario que se saco de la base de datos en la sesion.
          res.redirect('/paginaPrincipal');
        } else {
          res.render('../HTML/Sistema/login', { validacion: 'Usuario inactivo o contraseña inválidos' });
        }
      }
    });
  })
});


////################CambioContrasena################
router.get('/cambioPassword', (req, res) => {
  res.render('../HTML/Sistema/cambioPassword',
    { validacion: '' });
});

router.post('/cambioPassword', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const Mongodb = require('mongodb');
  client.connect(err => {
    const collection = client.db("tramsadb").collection("usuario");
    collection.findOne({ user: req.body.user }, function (err, UsuarioDB) {
      if (UsuarioDB == null) {
        res.render('../HTML/Sistema/cambioPassword',
          { validacion: 'Usuario no encontrado' });
      } else {
        if (req.body.contrasena == req.body.contrasenaNueva) {
          const myquery = { _id: UsuarioDB._id };
          const newvalues = {
            $set: {
              user: UsuarioDB.user,
              nombre: UsuarioDB.nombre,
              nombreCorto: UsuarioDB.nombreCorto,
              estado: UsuarioDB.estado,
              correo: UsuarioDB.correo,
              codigo: UsuarioDB.codigo,
              contrasena: req.body.contrasenaNueva
            }
          };
          collection.findOneAndUpdate(myquery, newvalues, { upsert: true }, function (err, doc) {
            if (err) { throw err; }
            else {
              console.log('Contraseña actualizada');
              res.redirect('/');
            }
          })

        } else {
          res.render('../HTML/Sistema/cambioPassword', { validacion: 'Las contraseñas no coinciden' });
        }
      }
    });
  })
});


////################Logout################
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});


//################PaginaPrincipal################
router.get('/paginaPrincipal', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    res.render('../HTML/paginaPrincipal');
  }
});


//################ParametrosGenerales################
router.get('/parametrosGen', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    res.render('../HTML/Parametros/parametrosGen');
  }
});


//################Consecutivos################
router.get('/consecutivos', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
      const collection = client.db("tramsadb").collection("consecutivo");
      collection.find({}).toArray(function (err, result) {
        if (err) throw err;
        res.render('../HTML/Parametros/consecutivos', { Resultado: result });
        client.close();
      });
    });
  }
})


//################InventarioReportes################
router.get('/inventario', (req, res) => { //Browser
  if (!req.session.user) { // si no existe la session con el usuario logueado.
    return res.status(404).send();
  }
  else {
    res.render('../HTML/Reportes/inventario'); //Busca en el código
  }
});


//################InventarioBodegaReportes################
router.get('/inventarioBodega', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
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
  }
});


//################AcercaDe################
router.get('/acercaDe', (req, res) => { //Browser
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    res.render('../HTML/Ayuda/acercaDe'); //Busca en el código
  }
});


//################Ayuda################
router.get('/ayuda', (req, res) => { //Browser
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    res.render('../HTML/Ayuda/ayuda'); //Busca en el código
  }
});


//################Otros/consulta################
router.get('/AyudaConsulta', (req, res) => { //Browser
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    res.render('../HTML/Ayuda/consulta'); //Busca en el código
  }
});


//################Administracion/Bodegas################
router.get('/bodegas', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
      const collection = client.db("tramsadb").collection("bodega");
      collection.find({}).toArray(function (err, result) {
        if (err) throw err;
        result.forEach(function (row) {
          var valor = row.codigo.replace(Consecutivos.bodegas.prefijo, ""); // solo obtener el valor sin el prefijo.
          Consecutivos.bodegas.valor = +valor + 1; // para convertir valor a integer +valor
        });
        res.render('../HTML/Administracion/bodegas', { Resultado: result });
        client.close();
      });
    });
  }
})
//Insertar Bodegas
router.get('/formBodegas', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    res.render('../HTML/Administracion/Forms/formBodegas', {
      data: {},
      errors: {}
    });
  }
});
router.post('/formBodegas', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("bodega");
    const newObject = { //armando el objeto que se va a insertar con los datos del consecutivo.
      codigo: Consecutivos.bodegas.prefijo + Consecutivos.bodegas.valor,
      nombre: req.body.nombre,
      nombreCorto: req.body.nombreCorto,
      ubicacion: req.body.ubicacion,
      alias: req.body.alias,
      unidadMedida: req.body.unidadMedida,
      espacioBodega: req.body.espacioBodega,
      tipoBodega: req.body.tipoBodega
    }

    collection.insertOne(newObject, function (err, res) {
      if (err) throw err;
      Consecutivos.bodegas.valor += 1; // este es el valor para el siguiente que se vaya a insertar
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
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("bodega");
    console.log(req.body);
    collection.deleteOne({
      _id: new Mongodb.ObjectID(req.body._id), function(err, res) {
        if (err) throw err;
        Consecutivos.bodegas.valor -= 1;
        client.close();
      }
    })
  }),
    res.redirect('/bodegas');
});

//Modificar Bodegas
router.get('/formBodegasModificar/:id', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const Mongodb = require('mongodb');
    client.connect(err => {
      const collection = client.db("tramsadb").collection("bodega");
      collection.findOne({ _id: new Mongodb.ObjectId(req.params.id) }, function (err, result) {
        if (err) throw err;
        res.render('../HTML/Administracion/Forms/formBodegasModificar',
          {
            Resultado: result,
            Updated: ""
          });
        client.close();
      });
    });
  }
});

router.post('/formBodegasModificar/:id', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const Mongodb = require('mongodb');
  const request = req;
  var mensaje = "";
  client.connect(err => {
    const collection = client.db("tramsadb").collection("bodega");
    const myquery = { _id: new Mongodb.ObjectId(request.params.id) };
    const newvalues = {
      $set: {
        nombre: request.body.nombre,
        alias: request.body.alias,
        ubicacion: request.body.ubicacion,
        unidadMedida: request.body.unidadMedida,
        tipoBodega: request.body.tipoBodega,
        espacioBodega: request.body.espacioBodega,
        nombreCorto: request.body.nombreCorto
      }
    };
    collection.findOneAndUpdate(myquery, newvalues, { upsert: true }, function (err, doc) {
      if (err) { throw err; }
      else {
        mensaje = "Objeto actualizado";
        res.render('../HTML/Administracion/Forms/formBodegasModificar',
          {
            Resultado: req.body,
            Updated: mensaje
          });
      }
    })
  })
});


//################Administracion/Camiones################
router.get('/camiones', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
      const collection = client.db("tramsadb").collection("camion");
      collection.find({}).toArray(function (err, result) {
        if (err) throw err;
        result.forEach(function (row) {
          var valor = row.codigo.replace(Consecutivos.camiones.prefijo, ""); // solo obtener el valor sin el prefijo.
          Consecutivos.camiones.valor = +valor + 1;
        });
        res.render('../HTML/Administracion/camiones', { Resultado: result });
        client.close();
      });
    });
  }
})
//InsertarCamiones
router.get('/formCamiones', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    res.render('../HTML/Administracion/Forms/formCamiones', {
      data: {},
      errors: {}
    });
  }
});
router.post('/formCamiones', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("camion");
    const newObject = { //armando el objeto que se va a insertar con los datos del consecutivo.
      codigo: Consecutivos.camiones.prefijo + Consecutivos.camiones.valor,
      descripcion: req.body.descripcion,
      nombreCorto: req.body.nombreCorto,
      marca: req.body.marca,
      ano: req.body.ano,
      placa: req.body.placa
    }

    collection.insertOne(newObject, function (err, res) {
      if (err) throw err;
      Consecutivos.camiones.valor += 1; // este es el valor para el siguiente que se vaya a insertar
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
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("camion");
    console.log(req.body);
    collection.deleteOne({
      _id: new Mongodb.ObjectID(req.body._id), function(err, res) {
        if (err) throw err;
        Consecutivos.camiones.valor -= 1;
        client.close();

      }
    })

  }),
    res.redirect('/camiones');

});

//Modificar Camiones
router.get('/formCamionesModificar/:id', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const Mongodb = require('mongodb');
    client.connect(err => {
      const collection = client.db("tramsadb").collection("camion");
      collection.findOne({ _id: new Mongodb.ObjectId(req.params.id) }, function (err, result) {
        if (err) throw err;
        res.render('../HTML/Administracion/Forms/formCamionesModificar',
          {
            Resultado: result,
            Updated: ""
          });
        client.close();
      });
    });
  }
});

router.post('/formCamionesModificar/:id', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const Mongodb = require('mongodb');
  const request = req;
  var mensaje = "";
  client.connect(err => {
    const collection = client.db("tramsadb").collection("camion");
    const myquery = { _id: new Mongodb.ObjectId(request.params.id) };
    const newvalues = {
      $set: {
        descripcion: request.body.descripcion,
        nombreCorto: request.body.nombreCorto,
        marca: request.body.marca,
        ano: request.body.ano,
        placa: request.body.placa
      }
    };
    collection.findOneAndUpdate(myquery, newvalues, { upsert: true }, function (err, doc) {
      if (err) { throw err; }
      else {
        mensaje = "Objeto actualizado";
        res.render('../HTML/Administracion/Forms/formCamionesModificar',
          {
            Resultado: req.body,
            Updated: mensaje
          });
      }
    })
  })
});


//################Administracion/Clientes################
router.get('/clientes', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
      const collection = client.db("tramsadb").collection("cliente");
      collection.find({}).toArray(function (err, result) {
        if (err) throw err;
        result.forEach(function (row) {
          var valor = row.codigo.replace(Consecutivos.clientes.prefijo, ""); // solo obtener el valor sin el prefijo.
          Consecutivos.clientes.valor = +valor + 1;
        });
        res.render('../HTML/Administracion/clientes', { Resultado: result });
        client.close();
      });
    });
  }
})

//Insertar Clientes
router.get('/formClientes', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    res.render('../HTML/Administracion/Forms/formClientes', {
      data: {},
      errors: {}
    });
  }
});
router.post('/formClientes', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("cliente");
    const newObject = { //armando el objeto que se va a insertar con los datos del consecutivo.
      codigo: Consecutivos.clientes.prefijo + Consecutivos.clientes.valor,
      nombre: req.body.nombre,
      cedula: req.body.cedula,
      apellido1: req.body.apellido1,
      apellido2: req.body.apellido2,
      estado: req.body.estado,
      telefono: req.body.telefono,
      correo: req.body.correo,
      direciion: req.body.direciion,
      nombreCorto: req.body.nombreCorto,
    }

    collection.insertOne(newObject, function (err, res) {
      if (err) throw err;
      Consecutivos.clientes.valor += 1; // este es el valor para el siguiente que se vaya a insertar
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
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("cliente");
    console.log(req.body);
    collection.deleteOne({
      _id: new Mongodb.ObjectID(req.body._id), function(err, res) {
        if (err) throw err;
        Consecutivos.clientes.valor -= 1;
        client.close();

      }
    })

  }),
    res.redirect('/clientes');

});

//Modificar Clientes
router.get('/formClientesModificar/:id', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const Mongodb = require('mongodb');
    client.connect(err => {
      const collection = client.db("tramsadb").collection("cliente");
      collection.findOne({ _id: new Mongodb.ObjectId(req.params.id) }, function (err, result) {
        if (err) throw err;
        res.render('../HTML/Administracion/Forms/formClientesModificar',
          {
            Resultado: result,
            Updated: ""
          });
        client.close();
      });
    });
  }
});
router.post('/formClientesModificar/:id', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const Mongodb = require('mongodb');
  const request = req;
  var mensaje = "";
  client.connect(err => {
    const collection = client.db("tramsadb").collection("cliente");
    const myquery = { _id: new Mongodb.ObjectId(request.params.id) };
    const newvalues = {
      $set: {
        cedula: request.body.cedula,
        nombre: request.body.nombre,
        apellido1: request.body.apellido1,
        apellido2: request.body.apellido2,
        correo: request.body.correo,
        direciion: request.body.direciion,
        telefono: request.body.telefono,
        estado: request.body.estado,
        nombreCorto: request.body.nombreCorto
      }
    };
    collection.findOneAndUpdate(myquery, newvalues, { upsert: true }, function (err, doc) {
      if (err) { throw err; }
      else {
        mensaje = "Objeto actualizado";
        res.render('../HTML/Administracion/Forms/formClientesModificar',
          {
            Resultado: req.body,
            Updated: mensaje
          });
      }
    })
  })
});


//################Administracion/MateriaPrima################
router.get('/materiaPrima', (req, res) => { //busqueda del browser
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
      const collection = client.db("tramsadb").collection("materiaPrima");
      collection.find({}).toArray(function (err, result) {
        if (err) throw err;
        result.forEach(function (row) {
          var valor = row.codigo.replace(Consecutivos.materiaP.prefijo, ""); // solo obtener el valor sin el prefijo.
          Consecutivos.materiaP.valor = +valor + 1;
        });
        res.render('../HTML/Administracion/materiaPrima', { Resultado: result });
        client.close();
      });
    });
  }
})
//Insertar MateriaPrima
router.get('/formMateriaPrima', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    res.render('../HTML/Administracion/Forms/formMateriaPrima', {
      data: {},
      errors: {}
    });
  }
});
router.post('/formMateriaPrima', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("materiaPrima");
    const newObject = { //armando el objeto que se va a insertar con los datos del consecutivo.
      codigo: Consecutivos.materiaP.prefijo + Consecutivos.materiaP.valor,
      nombre: req.body.nombre,
      nombreCorto: req.body.nombreCorto,
      cantidadExistente: req.body.cantidadExistente,
      unidadMedida: req.body.unidadMedida
    }

    collection.insertOne(newObject, function (err, res) {
      if (err) throw err;
      Consecutivos.materiaP.valor += 1; // este es el valor para el siguiente que se vaya a insertar
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
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("materiaPrima");
    console.log(req.body);
    collection.deleteOne({
      _id: new Mongodb.ObjectID(req.body._id), function(err, res) {
        if (err) throw err;
        Consecutivos.materiaP.valor -= 1;
        client.close();

      }
    })

  }),
    res.redirect('/materiaPrima');

});

//Modificar Materia Prima
router.get('/formMateriaModificar/:id', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const Mongodb = require('mongodb');
    client.connect(err => {
      const collection = client.db("tramsadb").collection("materiaPrima");
      collection.findOne({ _id: new Mongodb.ObjectId(req.params.id) }, function (err, result) {
        if (err) throw err;
        res.render('../HTML/Administracion/Forms/formMateriaModificar',
          {
            Resultado: result,
            Updated: ""
          });
        client.close();
      });
    });
  }
});

router.post('/formMateriaModificar/:id', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const Mongodb = require('mongodb');
  const request = req;
  var mensaje = "";
  client.connect(err => {
    const collection = client.db("tramsadb").collection("materiaPrima");
    const myquery = { _id: new Mongodb.ObjectId(request.params.id) };
    const newvalues = {
      $set: {
        nombre: request.body.nombre,
        nombreCorto: request.body.nombreCorto,
        cantidadExistente: request.body.cantidadExistente,
        unidadMedida: request.body.unidadMedida
      }
    };
    collection.findOneAndUpdate(myquery, newvalues, { upsert: true }, function (err, doc) {
      if (err) { throw err; }
      else {
        mensaje = "Objeto actualizado";
        res.render('../HTML/Administracion/Forms/formMateriaModificar',
          {
            Resultado: req.body,
            Updated: mensaje
          });
      }
    })
  })
});


//################Administracion/Productos################
router.get('/productos', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    res.render('../HTML/Administracion/productos');
  }
});


//################Administracion/ProductosDetalle################
router.get('/productosD', (req, res) => { //busqueda del browser
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
      const collection = client.db("tramsadb").collection("productoDetalle");
      collection.find({}).toArray(function (err, result) {
        if (err) throw err;
        result.forEach(function (row) {
          var valor = row.codigo.replace(Consecutivos.productosD.prefijo, ""); // solo obtener el valor sin el prefijo.
          Consecutivos.productosD.valor = +valor + 1;
        });
        res.render('../HTML/Administracion/productosD', { Resultado: result }); //busqueda en code
        client.close();
      });
    });
  }
})

//Insertar ProductosDetalle
router.get('/formProducD', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    res.render('../HTML/Administracion/Forms/formProducD', {
      data: {},
      errors: {}
    });
  }
});

router.post('/formProducD', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("productoDetalle");
    const newObject = { //armando el objeto que se va a insertar con los datos del consecutivo.
      codigo: Consecutivos.productosD.prefijo + Consecutivos.productosD.valor,
      codigoMateriaPr: Consecutivos.materiaP.prefijo + Consecutivos.materiaP.valor,
      nombreCorto: req.body.nombreCorto
    }

    collection.insertOne(newObject, function (err, res) {
      if (err) throw err;
      Consecutivos.productosD.valor += 1; // este es el valor para el siguiente que se vaya a insertar
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
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  client.connect(err => {
    const collection = client.db("tramsadb").collection("productoDetalle");
    console.log(req.body);


    collection.deleteOne({
      _id: new Mongodb.ObjectID(req.body._id), function(err, res) {
        if (err) throw err;
        Consecutivos.materiaP.valor -= 1;
        client.close();

      }
    })

  }),
    res.redirect('/productosD');

});

//Modificar Productos Detalle
router.get('/formProducDModificar/:id', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const Mongodb = require('mongodb');
    client.connect(err => {
      const collection = client.db("tramsadb").collection("productoDetalle");
      collection.findOne({ _id: new Mongodb.ObjectId(req.params.id) }, function (err, result) {
        if (err) throw err;
        res.render('../HTML/Administracion/Forms/formProducDModificar',
          {
            Resultado: result,
            Updated: ""
          });
        client.close();
      });
    });
  }
});

router.post('/formProducDModificar/:id', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const Mongodb = require('mongodb');
  const request = req;
  var mensaje = "";
  client.connect(err => {
    const collection = client.db("tramsadb").collection("productoDetalle");
    const myquery = { _id: new Mongodb.ObjectId(request.params.id) };
    const newvalues = {
      $set: {
        codigoMateriaPr: request.body.codigoMateriaPr,
        nombreCorto: request.body.nombreCorto
      }
    };
    collection.findOneAndUpdate(myquery, newvalues, { upsert: true }, function (err, doc) {
      if (err) { throw err; }
      else {
        mensaje = "Objeto actualizado";
        res.render('../HTML/Administracion/Forms/formProducDModificar',
          {
            Resultado: req.body,
            Updated: mensaje
          });
      }
    })
  })
});


//################Administracion/ProductosMaestro################
router.get('/productosM', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
      const collection = client.db("tramsadb").collection("productoMaestro");
      collection.find({}).toArray(function (err, result) {
        if (err) throw err;
        result.forEach(function (row) {
          var valor = row.codigo.replace(Consecutivos.productosM.prefijo, ""); // solo obtener el valor sin el prefijo.
          Consecutivos.productosM.valor = +valor + 1;
        });
        res.render('../HTML/Administracion/productosM', { Resultado: result });
        client.close();
      });
    });
  }
})

//Insertar Productos Maestro
router.get('/formProducM', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    res.render('../HTML/Administracion/Forms/formProducM', {
      data: {},
      errors: {}
    });
  }
});
router.post('/formProducM', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("productoMaestro");
    const newObject = { //armando el objeto que se va a insertar con los datos del consecutivo.
      codigo: Consecutivos.productosM.prefijo + Consecutivos.productosM.valor,
      descipcion: req.body.descipcion,
      nombreCorto: req.body.nombreCorto,
      puntoReOrden: req.body.puntoReOrden,
      unidadMedida: req.body.unidadMedida
    }

    collection.insertOne(newObject, function (err, res) {
      if (err) throw err;
      Consecutivos.productosM.valor += 1; // este es el valor para el siguiente que se vaya a insertar
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
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("productoMaestro");
    console.log(req.body);
    collection.deleteOne({
      _id: new Mongodb.ObjectID(req.body._id), function(err, res) {
        if (err) throw err;
        Consecutivos.materiaP.valor -= 1;
        client.close();
      }
    })
  }),
    res.redirect('/productosM');
});

//Modificar Productos Maestro
router.get('/formProducMModificar/:id', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const Mongodb = require('mongodb');
    client.connect(err => {
      const collection = client.db("tramsadb").collection("productoMaestro");
      collection.findOne({ _id: new Mongodb.ObjectId(req.params.id) }, function (err, result) {
        if (err) throw err;
        res.render('../HTML/Administracion/Forms/formProducMModificar',
          {
            Resultado: result,
            Updated: ""
          });
        client.close();
      });
    });
  }
});

router.post('/formProducMModificar/:id', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const Mongodb = require('mongodb');
  const request = req;
  var mensaje = "";
  client.connect(err => {
    const collection = client.db("tramsadb").collection("productoMaestro");
    const myquery = { _id: new Mongodb.ObjectId(request.params.id) };
    const newvalues = {
      $set: {
        descipcion: request.body.descipcion,
        puntoReOrden: request.body.puntoReOrden,
        unidadMedida: request.body.unidadMedida,
        nombreCorto: request.body.nombreCorto

      }
    };
    collection.findOneAndUpdate(myquery, newvalues, { upsert: true }, function (err, doc) {
      if (err) { throw err; }
      else {
        mensaje = "Objeto actualizado";
        res.render('../HTML/Administracion/Forms/formProducMModificar',
          {
            Resultado: req.body,
            Updated: mensaje
          });
      }
    })
  })
});


//################Administracion/Proveedores################
router.get('/proveedores', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
      const collection = client.db("tramsadb").collection("proveedores");
      collection.find({}).toArray(function (err, result) {
        if (err) throw err;
        result.forEach(function (row) {
          var valor = row.codigo.replace(Consecutivos.proveedores.prefijo, ""); // solo obtener el valor sin el prefijo.
          Consecutivos.proveedores.valor = +valor + 1;
        });
        res.render('../HTML/Administracion/proveedores', { Resultado: result });
        client.close();
      });
    });
  }
})
//Insertar Proveedores
router.get('/formProveedores', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    res.render('../HTML/Administracion/Forms/formProveedores', {
      data: {},
      errors: {}
    });
  }
});
router.post('/formProveedores', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("proveedores");
    const newObject = { //armando el objeto que se va a insertar con los datos del consecutivo.
      codigo: Consecutivos.proveedores.prefijo + Consecutivos.proveedores.valor,
      nombre: req.body.nombre,
      cedula: req.body.cedula,
      nombreCorto: req.body.nombreCorto,
      correo: req.body.correo,
      direccion: req.body.direccion,
      telefono: req.body.telefono,
      contacto: req.body.contacto,
      telefonoCont: req.body.telefonoCont
    }

    collection.insertOne(newObject, function (err, res) {
      if (err) throw err;
      Consecutivos.proveedores.valor += 1; // este es el valor para el siguiente que se vaya a insertar
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
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("proveedores");
    console.log(req.body);
    collection.deleteOne({
      _id: new Mongodb.ObjectID(req.body._id), function(err, res) {
        if (err) throw err;
        Consecutivos.materiaP.valor -= 1;
        client.close();
      }
    })
  }),
    res.redirect('/proveedores');
});

//Modificar Proveedores
router.get('/formProveedoresModificar/:id', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const Mongodb = require('mongodb');
    client.connect(err => {
      const collection = client.db("tramsadb").collection("proveedores");
      collection.findOne({ _id: new Mongodb.ObjectId(req.params.id) }, function (err, result) {
        if (err) throw err;
        res.render('../HTML/Administracion/Forms/formProveedoresModificar',
          {
            Resultado: result,
            Updated: ""
          });
        client.close();
      });
    });
  }
});

router.post('/formProveedoresModificar/:id', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const Mongodb = require('mongodb');
  const request = req;
  var mensaje = "";
  client.connect(err => {
    const collection = client.db("tramsadb").collection("proveedores");
    const myquery = { _id: new Mongodb.ObjectId(request.params.id) };
    const newvalues = {
      $set: {
        cedula: request.body.cedula,
        nombre: request.body.nombre,
        nombreCorto: request.body.nombreCorto,
        correo: request.body.correo,
        direccion: request.body.direccion,
        telefono: request.body.telefono,
        contacto: request.body.contacto,
        telefonoCont: request.body.telefonoCont
      }
    };
    collection.findOneAndUpdate(myquery, newvalues, { upsert: true }, function (err, doc) {
      if (err) { throw err; }
      else {
        mensaje = "Objeto actualizado";
        res.render('../HTML/Administracion/Forms/formProveedoresModificar',
          {
            Resultado: req.body,
            Updated: mensaje
          });
      }
    })
  })
});


//################Administracion/TipoMateriaPrima################
router.get('/tipoMateriaPrima', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
      const collection = client.db("tramsadb").collection("tipoMateriaPrima");
      collection.find({}).toArray(function (err, result) {

        result.forEach(function (row) {
          var valor = row.codigo.replace(Consecutivos.tMateriaP.prefijo, ""); // solo obtener el valor sin el prefijo.
          Consecutivos.tMateriaP.valor = +valor + 1;
        });
        if (err) throw err;
        res.render('../HTML/Administracion/tipoMateriaPrima', { Resultado: result });
        //client.close();
      });
    });
  }
})
//Insertar TipoMateriaPrima
router.get('/formTipoMateria', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    res.render('../HTML/Administracion/Forms/formTipoMateria', {
      data: {},
      errors: {}
    });
  }
});
router.post('/formTipoMateria', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    let collection = client.db("tramsadb").collection("tipoMateriaPrima");
    const newObject = { //armando el objeto que se va a insertar con los datos del consecutivo.
      codigo: Consecutivos.tMateriaP.prefijo + Consecutivos.tMateriaP.valor,
      descripcion: req.body.descripcion,
      nombreCorto: req.body.nombreCorto
    }
    collection.insertOne(newObject, function (err, res) {
      if (err) throw err;
      //Consecutivos.tMateriaP.valor += 1; // este es el valor para el siguiente que se vaya a insertar
    })

    collection = client.db("tramsadb").collection("consecutivo");
    collection.find({}).toArray(function (err, result) {
      result.forEach(function (row) {
        if(row.prefijo ==  Consecutivos.tMateriaP.prefijo) {

          const myquery = { _id: row._id };
          const newvalues = {
            $set: {
              prefijo: row.prefijo,
              descripcion: row.descripcion,
              valor: Consecutivos.tMateriaP.valor, // valor del consecutivo que se setea arriba
            }
          };
          collection.findOneAndUpdate(myquery, newvalues, { upsert: true }, function (err, doc) {
            if (err) { throw err; }
            else {
              Consecutivos.tMateriaP.valor += 1;
            }
          })
        }
      });

      if (err) throw err;
      res.render('../HTML/Administracion/tipoMateriaPrima', { Resultado: result });
      client.close();
    });

  }),
    res.render('../HTML/Administracion/Forms/formTipoMateria', {
      //data: req.body
    })
});

//Eliminar Tipo Materia Prima
router.post('/tipoMateriaPrima', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const Mongodb = require('mongodb');
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    var collection = client.db("tramsadb").collection("tipoMateriaPrima");
    collection.deleteOne({
      _id: new Mongodb.ObjectID(req.body._id), function(err, res) {
        if (err) throw err;
        Consecutivos.tMateriaP.valor -= 1;
        //client.close();
      }
    })

    collection = client.db("tramsadb").collection("consecutivo");
    collection.find({}).toArray(function (err, result) {
      result.forEach(function (row) {
        if(row.prefijo ==  Consecutivos.tMateriaP.prefijo) {
          Consecutivos.tMateriaP.valor -= 1;
          const myquery = { _id: row._id };
          const newvalues = {
            $set: {
              prefijo: row.prefijo,
              descripcion: row.descripcion,
              valor: Consecutivos.tMateriaP.valor, // valor del consecutivo que se setea arriba
            }
          };
          collection.findOneAndUpdate(myquery, newvalues, { upsert: true }, function (err, doc) {
            if (err) { throw err; }
          })
        }
      });

      if (err) throw err;
      client.close();
    });

    
  }),
    res.redirect('/tipoMateriaPrima');
});

//Modificar Tipo materia prima
router.get('/formTipoMateriaModificar/:id', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const Mongodb = require('mongodb');
    client.connect(err => {
      const collection = client.db("tramsadb").collection("tipoMateriaPrima");
      collection.findOne({ _id: new Mongodb.ObjectId(req.params.id) }, function (err, result) {
        if (err) throw err;
        res.render('../HTML/Administracion/Forms/formTipoMateriaModificar',
          {
            Resultado: result,
            Updated: ""
          });
        client.close();
      });
    });
  }
});

router.post('/formTipoMateriaModificar/:id', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const Mongodb = require('mongodb');
  const request = req;
  var mensaje = "";
  client.connect(err => {
    const collection = client.db("tramsadb").collection("tipoMateriaPrima");
    const myquery = { _id: new Mongodb.ObjectId(request.params.id) };
    const newvalues = {
      $set: {
        descripcion: request.body.descripcion,
        nombreCorto: request.body.nombreCorto,
      }
    };
    collection.findOneAndUpdate(myquery, newvalues, { upsert: true }, function (err, doc) {
      if (err) { throw err; }
      else {
        mensaje = "Objeto actualizado";
        res.render('../HTML/Administracion/Forms/formTipoMateriaModificar',
          {
            Resultado: req.body,
            Updated: mensaje
          });
      }
    })
  })
});


//################Procesos/PedidosMateria################
//Crear
router.get('/pedidosMateria', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    res.render('../HTML/Procesos/pedidosMateria.ejs');
  }
});
//Filtrar
router.get('/filtrarPedidosMateria', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    res.render('../HTML/Procesos/filtrarPedidosMateria.html');
  }
});


//################Procesos/PedidoMaestro################
router.get('/pedidosMateriaM', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
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
  }
})

//Insertar PedidoMaestro
router.get('/formPedidosMateriaM', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    res.render('../HTML/Procesos/Forms/formPedidosMateriaM', {
      data: {},
      errors: {}
    });
  }
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

//Eliminar PedidosMaestro 
router.post('/pedidosMateriaM', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const Mongodb = require('mongodb');
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("pedido_maestro");
    collection.deleteOne({
      _id: new Mongodb.ObjectID(req.body._id), function(err, res) {
        if (err) throw err;
        client.close();
      }
    })
  }),
    res.redirect('/pedidosMateriaM');
});


//################Procesos/PedidoDetalle################
router.get('/pedidosMateriaD', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
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
  }
})

//Insertar PedidoDetalle
router.get('/formPedidosMateriaD', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    res.render('../HTML/Procesos/Forms/formPedidosMateriaD', {
      data: {},
      errors: {}
    });
  }
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

//Eliminar PedidosDetalle 
router.post('/pedidosMateriaD', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const Mongodb = require('mongodb');
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("pedido_detalle");
    collection.deleteOne({
      _id: new Mongodb.ObjectID(req.body._id), function(err, res) {
        if (err) throw err;
        client.close();
      }
    })
  }),
    res.redirect('/pedidosMateriaD');
});

//################Procesos/ProduccionEnLote################
router.get('/produccionLote', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
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
  }
})

//Insertar ProduccionLote
router.get('/formProduccionLote', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    res.render('../HTML/Procesos/Forms/formProduccionLote.ejs', {
      data: {},
      errors: {}
    });
  }
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
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const Mongodb = require('mongodb');
    client.connect(err => {
      const collection = client.db("tramsadb").collection("produccionLote");
      collection.findOne({ _id: new Mongodb.ObjectId(req.params.id) }, function (err, result) {
        if (err) throw err;
        res.render('../HTML/Procesos/Forms/formProdModificar',
          {
            Resultado: result,
            Updated: ""
          });
        client.close();
      });
    });
  }
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
    const newvalues = {
      $set: {
        numProduccion: request.body.numProduccion,
        Fecha: request.body.Fecha,
        codigoProducto: request.body.codigoProducto,
        Producto: request.body.Producto,
        Bodega: request.body.Bodega,
        Cantidad: request.body.Cantidad,
        Tiempo: request.body.Tiempo
      }
    };
    collection.findOneAndUpdate(myquery, newvalues, { upsert: true }, function (err, doc) {
      if (err) { throw err; }
      else {
        mensaje = "Objeto actualizado";
        res.render('../HTML/Procesos/Forms/formProdModificar',
          {
            Resultado: req.body,
            Updated: mensaje
          });
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
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
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
  }
})

//Insertar PuntoVenta
router.get('/formPuntoVenta', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    res.render('../HTML/Procesos/Forms/formPuntoVenta.ejs', {
      data: {},
      errors: {}
    });
  }
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

//Eliminar PuntoVenta 
router.post('/puntoVenta', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const Mongodb = require('mongodb');
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("venta");
    collection.deleteOne({
      _id: new Mongodb.ObjectID(req.body._id), function(err, res) {
        if (err) throw err;
        client.close();
      }
    })
  }),
    res.redirect('/puntoVenta');
});

//Modificar Punto de Venta 
router.get('/formPuntoVentaModificar/:id', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const Mongodb = require('mongodb');
  client.connect(err => {
    const collection = client.db("tramsadb").collection("venta");
    collection.findOne({ _id: new Mongodb.ObjectId(req.params.id) }, function (err, result) {
      if (err) throw err;
      res.render('../HTML/Procesos/Forms/formPuntoVentaModificar',
        {
          Resultado: result,
          Updated: ""
        });
      client.close();
    });
  });
});
router.post('/formPuntoVentaModificar/:id', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const Mongodb = require('mongodb');
  const request = req;
  var mensaje = "";
  client.connect(err => {
    const collection = client.db("tramsadb").collection("venta");
    const myquery = { _id: new Mongodb.ObjectId(request.params.id) };
    const newvalues = {
      $set: {
        numeroFactura: request.body.numeroFactura,
        fecha: request.body.fecha,
        producto: request.body.producto,
        cliente: request.body.cliente,
        cantidadProducto: request.body.cantidadProducto,
        descuento: request.body.descuento,
        impuesto: request.body.impuesto,
        total: request.body.total
      }
    };
    collection.findOneAndUpdate(myquery, newvalues, { upsert: true }, function (err, doc) {
      if (err) { throw err; }
      else {
        mensaje = "Objeto actualizado";
        res.render('../HTML/Procesos/Forms/formPuntoVentaModificar',
          {
            Resultado: req.body,
            Updated: mensaje
          });
      }
    })
  })
});


//################Cajas/aperturaCaja################ 
router.get('/aperturaCaja', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("aperturaCaja");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      result.forEach(function (row) {
        var valor = row.codigo.replace(Consecutivos.aperturaCaja.prefijo, ""); // solo obtener el valor sin el prefijo.
        Consecutivos.aperturaCaja.valor = +valor + 1;
      });
      res.render('../HTML/Cajas/aperturaCaja', { Resultado: result });
      client.close();
    });
  });
})

//Insertar aperturaCaja 
router.get('/formAperturaCaja', (req, res) => {
  res.render('../HTML/Cajas/Forms/formAperturaCaja.ejs', {
    data: {},
    errors: {}
  });
});
router.post('/formAperturaCaja', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("aperturaCaja");
    const newObject = { //armando el objeto que se va a insertar con los datos del consecutivo.
      codigo: Consecutivos.aperturaCaja.prefijo + Consecutivos.aperturaCaja.valor,
      fecha: req.body.fecha,
      montoApertura: req.body.montoApertura
    }
    collection.insertOne(newObject, function (err, res) {
      if (err) throw err;
      Consecutivos.aperturaCaja.valor += 1; // este es el valor para el siguiente que se vaya a insertar
      client.close();
    })
  }),
    res.render('../HTML/Cajas/Forms/formAperturaCaja.ejs', {
      data: req.body
    })
});


//################Cajas/arqueoCaja################ 
router.get('/arqueoCaja', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("arqueoCaja");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('../HTML/Cajas/arqueoCaja', { Resultado: result });
      client.close();
    });
  });
})

//Insertar arqueoCaja 
router.get('/formArqueoCaja', (req, res) => {
  res.render('../HTML/Cajas/Forms/formArqueoCaja.ejs', {
    data: {},
    errors: {}
  });
});
router.post('/formArqueoCaja', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("arqueoCaja");
    collection.insertOne(req.body, function (err, res) {
      if (err) throw err;
      client.close();
    })
  }),
    res.render('../HTML/Cajas/Forms/formArqueoCaja.ejs', {
      data: req.body
    })
});


//################Consulta/Bitacora################
router.get('/bitacora', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
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
  }
})


//################Consultas/Pedido################
router.get('/pedido', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
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
  }
})


//################Consulta/Cliente################
router.get('/cliente', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
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
  }
})


//################Reportes/ProductosMaestro################
router.get('/productosReporte', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
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
  }
})


//################Reportes/InventarioBodega################
router.get('/bodegaReporte', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
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
  }
})


//################Reportes/InventarioGeneral################
router.get('/invGeReporte', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
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
  }
})


////################Usuarios################
router.get('/usuarios', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
      const collection = client.db("tramsadb").collection("usuario");
      collection.find({}).toArray(function (err, result) {
        if (err) throw err;
        result.forEach(function (row) {
          var valor = row.codigo.replace(Consecutivos.usuarios.prefijo, ""); // solo obtener el valor sin el prefijo.
          Consecutivos.usuarios.valor = +valor + 1;
        });
        res.render('../HTML/Seguridad/usuarios', { Resultado: result });
        client.close();
      });
    });
  }
})

//Insertar Usuarios
router.get('/formUsuarios', (req, res) => {
  if (!req.session.user) {
    return res.status(404).send();
  }
  else {
    res.render('../HTML/Seguridad/formUsuarios', {
      data: {},
      errors: {}
    });
  }
});
router.post('/formUsuarios', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("usuario");
    const newObject = { //armando el objeto que se va a insertar con los datos del consecutivo.
      codigo: Consecutivos.usuarios.prefijo + Consecutivos.usuarios.valor,
      user: req.body.user,
      nombre: req.body.nombre,
      nombreCorto: req.body.nombreCorto,
      estado: req.body.estado,
      correo: req.body.correo,
      contrasena: req.body.contrasena
    }
    collection.insertOne(newObject, function (err, res) {
      if (err) throw err;
      Consecutivos.usuarios.valor += 1; // este es el valor para el siguiente que se vaya a insertar
      client.close();
    })
  }),
    res.render('../HTML/Seguridad/formUsuarios', {
      data: req.body
    })
});

//Eliminar Usuarios
router.post('/usuarios', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const Mongodb = require('mongodb');
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("tramsadb").collection("usuario");
    console.log(req.body);
    collection.deleteOne({
      _id: new Mongodb.ObjectID(req.body._id), function(err, res) {
        if (err) throw err;
        Consecutivos.usuarios.valor = +valor - 1;
        client.close();
      }
    })
  }),
    res.redirect('/usuarios');
});

//Modificar Usuarios 
router.get('/formUserModificar/:id', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const Mongodb = require('mongodb');
  client.connect(err => {
    const collection = client.db("tramsadb").collection("usuario");
    collection.findOne({ _id: new Mongodb.ObjectId(req.params.id) }, function (err, result) {
      if (err) throw err;
      res.render('../HTML/Seguridad/formUserModificar',
        {
          Resultado: result,
          Updated: ""
        });
      client.close();
    });
  });
});

router.post('/formUserModificar/:id', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const Mongodb = require('mongodb');
  const request = req;
  var mensaje = "";
  client.connect(err => {
    const collection = client.db("tramsadb").collection("usuario");
    const myquery = { _id: new Mongodb.ObjectId(request.params.id) };
    const newvalues = {
      $set: {
        nombre: request.body.nombre,
        nombreCorto: request.body.nombreCorto,
        user: request.body.user,
        correo: request.body.correo,
        estado: request.body.estado
      }
    };
    collection.findOneAndUpdate(myquery, newvalues, { upsert: true }, function (err, doc) {
      if (err) { throw err; }
      else {
        mensaje = "Objeto actualizado";
        res.render('../HTML/Seguridad/formUserModificar',
          {
            Resultado: req.body,
            Updated: mensaje
          });
      }
    })
  })
});

module.exports = router;