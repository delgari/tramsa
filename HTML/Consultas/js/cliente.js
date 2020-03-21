function filtrar() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("txtEstado");
    filter = input.value.toUpperCase();
    table = document.getElementById("clienteTable");
    tr = table.getElementsByTagName("tr");
  
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      if(td.length > 0){ 
         if (td[0].innerHTML.toUpperCase().indexOf(filter) > -1 || td[5].innerHTML.toUpperCase().indexOf(filter) > -1){
           tr[i].style.display = "";
         } else {
           tr[i].style.display = "none";
         }
      }
   }
  }