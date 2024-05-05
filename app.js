function alertaCompra(){
confirm("Se agregó el curso al carrito")

}

function apiFarmacia(){
    var apiUrl = "https://midas.minsal.cl/farmacia_v2/WS/getLocales.php"
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error('Error en conexion');
        }
        return response.json();
    })
    .then(data => {
        console.log("Probando")
        console.log(data);
        console.log(data.length);
        console.log(["comuna_nombre"]);
        console.log(["local_direccion"]);
        console.log("post");
        for (var i = 0; i < data.length; i++) { //i define la fila de la api
            var tablaBody = document.getElementById("tablaBody");

            // Crear una nueva fila
            var fila = document.createElement("tr");
        
            // Agregar celdas a la fila
            var celda1 = document.createElement("td");
            celda1.textContent = document.innerHTML = data[i]["local_nombre"];
            fila.appendChild(celda1);
        
            var celda2 = document.createElement("td");
            celda2.textContent = document.innerHTML = data[i]["comuna_nombre"];
            fila.appendChild(celda2);
        
            // Agregar la fila a la tabla
            tablaBody.appendChild(fila);     
        }
        
     
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
document.addEventListener("DOMContentLoaded", function() {
    apiFarmacias();
});
