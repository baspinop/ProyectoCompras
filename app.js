function alertaCompra(){
    confirm("Transacción exitosa")
    
}
function alertaNotFound(){
    alert(" No se encontro la comuna");
}

function limpiarBuscador(){
    var limpiado = document.getElementById("comunaInput");
    limpiado.value = "";
}
function apiFarmacia(filtrado) {
    var apiUrl = "https://midas.minsal.cl/farmacia_v2/WS/getLocales.php";
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en conexión');
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
        generarLista(data);
        
        //Si no se realiza filtrado
        if(filtrado == false){
            generarTabla(data);
            limpiarBuscador();
            
        }
        console.log(filtrado);
        //Si el usurio quiere filtrar por comuna
        if(filtrado == true){
            generarTablaFiltrada(data);
            limpiarBuscador();
        }
        
    })

    .catch(error => {
        console.error('Error:', error);
    });
}

function generarTabla(data) {
    //Crear la tabla 
    var tablaContenido = document.getElementById("tablaContenido");
    tablaContenido.innerHTML = "";
    console.log("generarTabla")

    //recorre la tabla data e imprime una fila por cada una
    for (var i = 0; i < data.length; i++) {
        var fila = document.createElement("tr");

        var celda1 = document.createElement("td");
        celda1.textContent = data[i]["local_nombre"];
        fila.appendChild(celda1);

        var celda2 = document.createElement("td");
        celda2.textContent = data[i]["comuna_nombre"];
        fila.appendChild(celda2);

        tablaContenido.appendChild(fila);
    }
}

function generarLista(data) {
    console.log("Prueba comuna")
    // Crear un conjunto para almacenar las comunas sin repetir
    const comuna = new Set();

    // Iterar sobre los datos y agregar las comunas
    data.forEach(item => {

        comuna.add(item.comuna_nombre);
    });

    // Convertir el conjunto a un array
    const comunaArray = Array.from(comuna);

    // Obtener el elemento input y el datalist
    //const input = document.getElementById("comunaInput");
    const datalist = document.getElementById("comunaDatalist");

    // Limpiar cualquier opción previa
    datalist.innerHTML = '';

    // Crear y agregar opciones al datalist
    comunaArray.forEach(comuna => {
        const option = document.createElement("option");
        option.value = comuna;
        datalist.appendChild(option);
    })
    console.log(datalist);
}

//Genera la tabla filtrada por comuna
function generarTablaFiltrada(data) {
   
    // Limpia el contenido existente de la tabla antes de agregar nuevas filas
    tablaContenido.innerHTML = "";
    var comunaInputValue = document.getElementById("comunaInput").value.toUpperCase(); //Transforma todas las letras ma mayusculas
    
    // Recorre los datos y agrega filas filtradas a la tabla
    for (var i = 0; i < data.length; i++) {
        if (comunaInputValue == data[i]["comuna_nombre"]) {
            var fila = document.createElement("tr");

            var celda1 = document.createElement("td");
            celda1.textContent = data[i]["local_nombre"];
            fila.appendChild(celda1);

            var celda2 = document.createElement("td");
            celda2.textContent = data[i]["comuna_nombre"];
            fila.appendChild(celda2);

            tablaContenido.appendChild(fila);
        }
        //Devuelve toda la tabla si no se escribio nada en el input
        else
            if(document.getElementById("comunaInput").value.trim() == ""){
                generarTabla(data);
                break;
            }
    }
}
