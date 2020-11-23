/*Este es el archivo principal, únicamente contiene una función auxiliar, ya que,
de cara a mejorar la modularidad el código, en vez de ir llamando
a las funciones desde dentro de las funciones, usaremos returns
y esta función auxiliar que se encargará de almacenar los datos devueltos
y en su caso, ir llamando a las otras funciones
*/

function cargaActualiza(){
    document.getElementById("btnBuscarAsincrono").value = "Refrescar"
    AJAXjson()
}
function enviarPedido() {
    //Almacenamos en campos el resultado de la función
    campos = comprobarPrepararCampos()
    //Si no nos ha devuelto error es que el fomulario
    //era correcto:
    if (campos != "error") {
        //Entonces calculamos el precio
        //Almacenamos el resultado, que será
        //si el usuario ha aceptado el pedido
        //tras ver el precio
        pedidoAceptado = calcularPrecio()

        //Si ha sido aceptado,
        if (pedidoAceptado) {
            //llamamos a la función sendFormulario
            //y le pasamos el array de campos
            sendFormulario(campos)

        }

    }

}