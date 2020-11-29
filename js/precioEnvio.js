/*Esta función se encarga de preparar los parámetros que vamos
a enviar, teniendo como parámetro de entrada tiene el array de campos corregidos.
Además, prepará los parámetros para que se genere un fichero JSON
con todos los datos del pedido*/
function sendFormulario(camposArray) {

    // ****************************** PARTE 1 - DATOS DE CAMPOS DE TEXTO ******************************

    //Almacenamos las variables del array en sus
    //variables que creamos para ello
    let nombreOK = camposArray[0]
    let direccionOK = camposArray[1]
    let codPosOK = camposArray[2]
    let telefonoOK = camposArray[3]
    let emailOK = camposArray[4]

    /* Creamos e inicializamos una variable parametros
    donde iremos almacenando la cadena de parámetros*/
    let parametros = '{'

    let idPedido = Math.floor((Math.random() * 100000) + 1)
    parametros += '"id" : "' + idPedido + '",'

    /*Primeramente, añadimos estas variables
    que ya teníamos preparadas, que hemos obtenido
    en la anterior función
    Vamos añadiendo a parametros, separando nombre
    y valor por un =, y añadiendo un & al final,
    para separar del siguiente campo*/
    parametros += '"nombre" : "' + nombreOK + '",'
    parametros += '"direccion" : "' + direccionOK + '",'
    parametros += '"codPos" : "' + codPosOK + '",'
    parametros += '"telefono" : "' + telefonoOK + '",'
    parametros += '"email" : "' + emailOK + '",'

    // ****************************** PARTE 2 - RADIO Y CHECBOX ******************************

    /*Para esto, almacenamos los datos del formulario en la variable formularioRead que creamos*/

    let formularioRead = document.getElementById("formularioID");

    /*Ahora, con un bucle for, iremos leyendo el resto de radio buttons
    y checkbox*/

    /*Puesto que tanto los ingredientes como los complementos son checkbox
    y puede que el usuario seleccione más de 1 de ellos,
    tenemos que diferenciar la sintaxis, ya que crearemos un array en el JSON
    para esos casos
    */

    let parametrosIngredientes = ""
    let parametrosComplementos = ""
    for (i = 0; i < formularioRead.length; i++) {

        if (formularioRead.elements[i].type == "checkbox" || formularioRead.elements[i].type == "radio") {

            //Si no está chequeada, no hacemos nada
            if (formularioRead.elements[i].checked == false) {
                //continuamos hacia el siguiente
                continue
            } else {
                //Si es un ingrediente o un complemento, 
                //solo preparamos ese ingrediente como parametro
                //y lo añadimos
                if (formularioRead.elements[i].name == "ingrediente") {

                    parametrosIngredientes += '"' + formularioRead.elements[i].id + '", '
                    console.log(parametrosIngredientes)

                } else if (formularioRead.elements[i].name == "complementos") {

                    parametrosComplementos += '"' + formularioRead.elements[i].id + '", '
                    console.log(parametrosComplementos)
                //Si se trata del tamaño, procedemos directamente,
                //y lo agregamos ya a parametros
                } else {

                    console.log(formularioRead.elements[i].text)
                    let nombreParametro = formularioRead.elements[i].name
                    let valorParametro = formularioRead.elements[i].id
                    parametros += ' "' + nombreParametro + '" : "' + valorParametro + '", '

                }



            }
        }

    }
    //Procedemos ahora con con los ingredientes y complementos:
    //Eliminamos ahora la ", ", añadimos los corchetes que delimitan el array
    //y lo agregamos a parámetros
    parametrosIngredientes = parametrosIngredientes.substring(0, parametrosIngredientes.length - 2)
    parametrosIngredientes = "[ " + parametrosIngredientes + " ]"
    console.log(parametrosIngredientes)
    parametros += '"ingredientes" : ' + parametrosIngredientes + ", "

    parametrosComplementos = parametrosComplementos.substring(0, parametrosComplementos.length - 2)
    parametrosComplementos = "[ " + parametrosComplementos + " ]"
    console.log(parametrosComplementos)
    parametros += '"complementos" : ' + parametrosComplementos + " }"

    console.log(parametros)

    //Parseamos los parametros a JSON
    let parametrosJSON = JSON.parse(parametros)

    console.log(parametrosJSON)


    let nombreArchivo = "Pedido-"+idPedido+".json"
    //Llamamos a la función descargarArchivo y le pasamos los parámetros necesarios
    
    descargaArchivo(JSON.stringify(parametrosJSON), nombreArchivo, "json")

    
}

/*Esta es una función aucilizar que utilizaremos
para poder descargar el JSON con el pedido*/
function descargaArchivo(contenido, nombreFile, tipoContenido) {
    let descarga = document.createElement("a")
    let archivo = new Blob([contenido], { type: tipoContenido })
    descarga.href = URL.createObjectURL(archivo)
    descarga.download = nombreFile
    resultado = descarga.click()
    return resultado
}

/*Esta función se encarga de calcular el precio del pedido
y mostrarselo al usuario*/
function calcularPrecio() {

    /*Almacenamos los datos del formulario en la variable formularioRead que creamos ahora*/
    let formularioRead = document.getElementById("formularioID");

    //Creamos e inicializamos a 0la variable precio
    let precio = 0

    //Creamos un bucle for, que irá desde la posición 5 a la 11,
    //es decir, desde el radio de pequena hasta el checkbox de ternera
    for (i = 5; i < formularioRead.length; i++) {
        if (formularioRead.elements[i].type == "checkbox" || formularioRead.elements[i].type == "radio") {
            //Si no está chequeada, no hacemos nada
            if (formularioRead.elements[i].checked == false) {
                //continuamos hacia el siguiente
                continue
            } else {

                precioLeido = formularioRead.elements[i].value
                precioLeido = parseInt(precioLeido)
                console.log(precioLeido)
                if (!isNaN(precioLeido)) {

                    precio += precioLeido
                }

            }
        }

    }

    //Por último, creamos un confirm donde se informa al usuario del precio total
    //y le pedimos que nos confirme si desea procesar el pedido
    //resultado que almacenamos en la variable confirmado
    let confirmado = confirm("El precio total de su pizza es de " + precio + "€\n¿Desea continuar y procesar el pedido?")

    //Devolvemos el resultado de la confirmación (que cogerá la función principal
    //y, en su caso, mandará ejecutar sendFormulario si se acepta el pedido)
    return confirmado
}


/* JS calcula precio con cada click */

window.onclick = function actualiza() {

    /* Calcula precio con cada click */

    //Selecciona todo input con valor
    elementos = document.querySelectorAll('input[value]')
    let total = 0
    //Recorre inputs, si checked, suma el valor
    for (var i = 0; i < elementos.length; i++) {
        if (elementos[i].checked) {
            total += parseInt(elementos[i].value)
        }
    } document.getElementById("precio").innerHTML = ("Total: " + total + "€")

    /* Hace mayúscula la primera letra */

    let n = document.getElementById("nombre").value
    let c = n.charAt(0)
    n = n.slice(1)
    c = c.toUpperCase()
    document.getElementById("nombre").value = (c + n)

}
