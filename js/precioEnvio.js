/*Esta función se encarga de preparar los parámetros que vamos
a enviar, así como de realizar el propio envío del formulario,
como parámetro de entrada tiene el array de campos corregidos*/
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
    let parametros = ""

    /*Primeramente, añadimos estas variables
    que ya teníamos preparadas, que hemos obtenido
    en la anterior función
    Vamos añadiendo a parametros, separando nombre
    y valor por un =, y añadiendo un & al final,
    para separar del siguiente campo*/
    parametros += "nombre=" + nombreOK + "&"
    parametros += "direccion=" + direccionOK + "&"
    parametros += "codPos=" + codPosOK + "&"
    parametros += "telefono=" + telefonoOK + "&"
    parametros += "email=" + emailOK + "&"

    // ****************************** PARTE 2 - RADIO Y CHECBOX ******************************

    /*Para esto, almacenamos los datos del formulario en la variable formularioRead que creamos*/

    let formularioRead = document.getElementById("formularioID");

    /*Ahora, con un bucle for, iremos leyendo el resto de radio buttons
    y checkbox*/

    /*Empezamos por el 5, ya que los anteriores son los campos de texto, que ya están
    Acabamos por el 14, porque ese es el último radio, el de bourbon*/
    

for (i = 0; i < formularioRead.length; i++) {
    console.log("fjfjfjfjjfjfjfjfjfjfjfj")
        if (formularioRead.elements[i].type == "checkbox" || formularioRead.elements[i].type == "radio") {

            //Si no está chequeada, no hacemos nada
            if (formularioRead.elements[i].checked == false) {
                //continuamos hacia el siguiente
                continue
            } else {
                console.log(formularioRead.elements[i].text)
                let nombreParametro = formularioRead.elements[i].name
                let valorParametro = formularioRead.elements[i].id
                console.log(formularioRead.elements[i].text)

                parametros += nombreParametro + "=" + valorParametro + "&"
            }
        }

    }

    /*Nos quedamos con parametros menos su último char, es decir,
    el & que ya no nos serviría*/
    parametros = parametros.substring(0, parametros.length - 1)


    //Añadimos a la URL de envío estos parámetros
    formularioRead.action += parametros

    //Procedemos a enviar el formulario
    formularioRead.submit()

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
