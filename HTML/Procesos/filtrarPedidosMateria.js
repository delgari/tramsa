
function filtrar() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("textBuscar");
  filter = input.value.toUpperCase();
  table = document.getElementById("tablaPedidosMateria");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td");
	if(td.length > 0){ 
       if (td[0].innerHTML.toUpperCase().indexOf(filter) > -1 || td[1].innerHTML.toUpperCase().indexOf(filter) > -1) {
         tr[i].style.display = "";
       } else {
         tr[i].style.display = "none";
       }
    }
 }
}

/*
function limpiarTabla(){
  $("table > tbody > tr").hide().slice(0,0).show();
  $(".show-all").on("click", function() {
  $("tbody > tr", $(this).prev()).show();
  });
}*/



   