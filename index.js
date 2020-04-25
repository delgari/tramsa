const express = require('express');
const app = express();

const session = require('express-session');

////################TEMPLATES################
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'ejs');


//################MIDDLEWARE################
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
//Express utilizar el json con tipo application/json con el texto plano
//Se utiliza para eliminar, debido a que node creia que se le estaba pasando un txt plano
app.use(express.json({
  type: ['application/json', 'text/plain']
}));
app.use(require("body-parser").json());
app.use(session({secret:"12dhtehjgvy47", resave:false, saveUninitialized:true}));

//################RUTAS################
app.use(require('./Rutas/index'));


//################ARCHIVOS_STATICOS################
app.use(express.static(__dirname + '/public'));


//################PUERTO_SERVIDOR_WEB################
app.set("port", 8000);
app.listen(app.get("port"), () => {
  console.log("server en el puerto", app.get("port"));
});


