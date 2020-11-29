function devuelveCamposLimpios(){

    // ************************ LECTURA DATOS ************************

    let nombreStr = $("#nombre").val()
    let direccionStr = $("#direccion").val()
    let codPosStr = $("#codPostal").val()
    let telefonoStr = $("#telefono").val()
    let emailStr = $("#email").val()
   
    // ************************ LIMPIEZA DATOS ************************

    /*Utilizamos varias funciones auxiliares de limpieza
    para limpiar las cadenas*/

    //Para nombre usamos primero la función limpiarCadena "general"
    let nombreOK = limpiarCadena(nombreStr)
    //Y le aplicamos la función específica de nombre y dirección
    //además de pasarlo a string
    nombreOK = limpiarNomDir(nombreOK).toString()

    //Para la dirección procedemos como con el nombre
    let direccionOK = limpiarCadena(direccionStr)
    direccionOK = limpiarNomDir(direccionOK).toString()

    //Para el código postal y dirección solamente
    //usamos la función de limpiarCPTel y pasamos a String
    let codPosOK = limpiarCPTel(codPosStr).toString()
    let telefonoOK = limpiarCPTel(telefonoStr).toString()

    //Para el email usamos limpiarCadena y pasamos a string
    //y lo ponemos en minúsculas
    let emailOK = limpiarCadena(emailStr).toString()
    emailOK = emailOK.toLowerCase()

    //Este console.log nos permite ver como han quedado procesados
    //antes de la comprobación
    console.log(nombreOK + direccionOK + codPosOK + emailOK + telefonoStr)


    let campos = []
    campos[0] = nombreOK
    campos[1] = direccionOK
    campos[2] = codPosOK
    campos[3] = telefonoOK
    campos[4] = emailOK

    return campos

}

/* Esta función se encarga de eliminar los acentos
y espacios al principio y final que encontremos
en las cadenas de texto, devolviendo una nueva
cadena "limpia"*/
function limpiarCadena(cadena) {
    let cadena1 = cadena.trim()
    cadena1 = cadena1.replaceAll("Á", "A")
    cadena1 = cadena1.replaceAll("É", "E")
    cadena1 = cadena1.replaceAll("Í", "I")
    cadena1 = cadena1.replaceAll("Ó", "O")
    cadena1 = cadena1.replaceAll("Ú", "U")
    cadena1 = cadena1.replaceAll("á", "a")
    cadena1 = cadena1.replaceAll("é", "e")
    cadena1 = cadena1.replaceAll("í", "i")
    cadena1 = cadena1.replaceAll("ó", "o")
    cadena1 = cadena1.replaceAll("ú", "u")

    return cadena1

}

//Esta función se encarga de quitar espacios, tabulaciones, etc
//además de puntos, comas y paréntesis sobrantes
//La usaremos para teléfono y código postal, donde solo tiene que
//haber números
function limpiarCPTel(cadena) {
    let cadena1 = cadena.replaceAll(/\s/g, "")
    cadena1 = cadena1.replaceAll(".", "")
    cadena1 = cadena1.replaceAll(",", "")
    cadena1 = cadena1.replaceAll("(", "")
    cadena1 = cadena1.replaceAll(")", "")
    return cadena1
}

/*Esta función es específica para el nombre y el código postal
eliminaremos las abreviaturas º y ª
y los puntos, guiones, barra /, comas y resto de espacios
los convertiremos en guión bajo _:
C/Perico de los Palotes,Nº1,2ºD --> C_Perico_de_los_Palotes_N_1__2_D
Mª Angeles Gonzalez --> M__Angeles_Gonzalez
*/
function limpiarNomDir(cadena) {
    let cadena1 = cadena.replaceAll("º", "")
    cadena1 = cadena1.replaceAll("ª", "")
    cadena1 = cadena1.replaceAll(".", "_")
    cadena1 = cadena1.replaceAll(",", "_")
    cadena1 = cadena1.replaceAll("/", "_")
    cadena1 = cadena1.replaceAll(/\s/g, "_")
    return cadena1
}