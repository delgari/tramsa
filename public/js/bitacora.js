const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://diseno:Ulacit1234@cluster0-40do9.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });

(function(){
    const tbl = ["Codigo Bitacora","Usuario","Fecha","Descripción"];
    
    

    cargarDatos=()=>{

        //Conexión con la base de datos
        //Colección de bitacora
       
        client.connect(err => {
            const collection = client.db("tramsadb").collection("bitacora");
            collection.find({}).toArray(function (err, result) {
                if (err) throw err;
                mostrarTable(result);
                client.close();
            });
        });

       // fetch('https://jsonplaceholder.typicode.com/posts') //carga los datos de la direccion
       // .then(response => response.json())
       // .then(json => mostrarTable(json))
    }

    mostrarTable=(json)=>{
        var table = document.createElement('table');
        table.setAttribute("id", "myTable");
        var thead = document.createElement('thead');
        var tbody = document.createElement('tbody');
        var headRow = document.createElement('tr');
        tbl.forEach(function(el){
            var th = document.createElement('th');
            th.appendChild(document.createTextNode(el));
            headRow.appendChild(th);
        });
        thead.appendChild(headRow);
        table.appendChild(thead);
        json.forEach(function(el){
            var tr = document.createElement('tr');
            for (var o in el){
                var td = document.createElement('td');
                td.appendChild(document.createTextNode(el[o]))
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        var container = document.getElementById("tableString"); //crea la variable donde se ubicará el elemento html donde se ubicará la tabla
        container.appendChild(table); //tomo el html y coloco lo de la tabla
        return table;
    }
    cargarDatos();
})()