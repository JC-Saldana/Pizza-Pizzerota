/*En este fichero tenemos una función principal, que
se encarga de comprobar que el formulario está
correctamente rellenado.
Puesto que entendemos que el formulario puede tener
ciertos errores sin importancia que podemos gestionar nosotros
como algún espacio en blanco al final, pues procederemos a
limpiar primeramente los campos de introducción de texto,
comprobarlos, y después procederemos con los radio y checkbox
*/

function comprobarPrepararCampos() {

    /*Primero almacenamos el formulario en una variable*/

    let formularioRead = document.getElementById("formularioID");
    console.log(formularioRead[0])

    // ************************ LECTURA DATOS ************************

    /* Ahora, haciendo uso de la propiedad elements, buscamos
    el value de las posiciones 0, 1, 2, 3, 4, que corresponden
    a nombre, direccion, codPos, telefono y email*/
    let nombreReadArr = formularioRead.elements[0].value
    let direccionReadArr = formularioRead.elements[1].value
    let codPosReadArr = formularioRead.elements[2].value
    let telefonoReadArr = formularioRead.elements[3].value
    let emailReadArr = formularioRead.elements[4].value

    /*Pasamos dichos datos a String*/
    let nombreStr = nombreReadArr.toString()
    let direccionStr = direccionReadArr.toString()
    let codPosStr = codPosReadArr.toString()
    let telefonoStr = telefonoReadArr.toString()
    let emailStr = emailReadArr.toString()

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

    // ************************ EXPRESIONES REGULARES ************************
    
    /*La expresión regular de nombre establece que
    empiece por una letra mayúscula y sigan
    entre 8 y 30 caracteres, mayúsculas o minúsculas
    o _ y acabe por alguna de estas
    (Entendemos que el usuario introduce nombre y apellidos)*/
    let nombreReg = /^[A-Z]{1}[A-Za-z_]{8,30}$/

    /*La expresión regular de dirección permite
    mayúsculas, minúsculas, _ y números, en un total
    de 8 a 45 carácteres*/
    let direccionReg = /^[A-Za-z_0-9]{8,45}$/

    /*El código postal estará compuesto por 5 números*/
    let codPosReg = /^[0-9]{5}$/

    /*El teléfono empezará por 6,7,8,9 que son los números
    prefijo usados en España, y tendrá otros 8 números, haciendo
    un teléfono de 9 dígitos típico de España*/
    let telefonoReg = /^[6|7|8|9]{1}[0-9]{8,8}$/

    /*Con la expresión regular del email, pretendemos que
    sean válidos estos emails prototipo:
        test@patata.com
        very.common@patata.com
        disposable.style.email.with+symbol@patata.com
        other.email-with-hyphen@pa_tata.com
        fully-qualified-domain@patata_2.net
        user.name+tag+sorting@patata.org
        user_name_test@pata_12.es
    */
   
    /*La primera parte tenga minúsculas, números, guiones, guiones bajos,
    puntos o +, entre 3 y 25 caracteres;; arroba;; dominio con letras,
    números o _ ;; y .com/.es/.org ... */

    let emailReg = /^[a-z0-9-_.+]{3,25}@[a-z0-9_]{2,12}.[a-z]{2,6}$/


    // ************************ COMPROBACIONES I: CAMPOS DE TEXTO ************************

    /*Comprobamos primeramente los campos de texto, haciendo uso de las variables
    con los datos ya depurados y las expresiones regulares antes mencionados*/

    //Esta primera fase tendrá una variable que cambiaremos a true
    //Si se supera la validación
    let valido1 = false;

    //Comprobamos una a una las variables contra la expresión regular
    if (nombreReg.test(nombreOK) && direccionReg.test(direccionOK) && codPosReg.test(codPosOK) && telefonoReg.test(telefonoOK) && emailReg.test(emailOK)) {
        //Si la comprobación da correta, almancenamos true en valido1
        valido1 = true;

    }
    /*Si el if superior da false, al menos uno de los
    requisitos no se cumple*/
    else {
        /*Comprobamos uno por uno, y en su caso, informamos
        al usuario del error, para que pueda corregirlo*/
        var valido = true
        if (!nombreReg.test(nombreOK)) {
            alert("El nombre que has introducido es incorrecto!\nRecuerda que debe empezar por maýusculas!\nRevísalo! ")
            valido = false
        }
        if (!direccionReg.test(direccionOK) && valido == true) {
            alert("La dirección que has introducido es incorrecta! Revísalo!")
            valido = false
        }
        if (!codPosReg.test(codPosOK) && valido == true) {
            alert("El código postal es incorrecto! Revísalo!")
            valido = false
        }
        if (!telefonoReg.test(telefonoOK) && valido == true) {
            alert("El teléfono es incorrecto!\nRecuerda que sólo aceptamos números nacionales (sin prefijo +34)!\nRevísalo! ")
            valido = false
        }
        if (!emailReg.test(emailOK) && valido == true) {
            alert("El email es incorrecto! Revísalo!")
            valido = false
        }

    }

    /* ================================ ATENCION - COMPROBACIONES DESACTIVADAS PROVISIONALMENTE ================================ */
    /*

    // ************************ COMPROBACIONES II: RADIO BUTTON TAMAÑO PIZZA ************************
    //Igual que con el anterior apartado, creamos una variable valido2
    //que inicializamos a false
    let valido2 = false;

    //Si no hay ningun botón marcado es que no se ha seleccionado ningñun tamaño
    if (!formularioRead.elements[5].checked && !formularioRead.elements[6].checked && !formularioRead.elements[7].checked) {
        //Informamos al usuario
        alert("Debes escoger el tamaño de la pizza! Revísalo!")
    } else {
        //Si alguno está marcado, es correcto
        //con lo que ponemos valido2 a true
        valido2 = true
    }
    
    // ************************ COMPROBACIONES III: CHECKBOX INGREDIENTES ************************
    //Procedemos análogamente a con los radio button:
    //Creamosariable valido3 inicializada a false
    let valido3 = false;

    //Si no hay ningún ingrediente seleccionado, es incorrecto el formulario
    if (!formularioRead.elements[8].checked && !formularioRead.elements[9].checked && !formularioRead.elements[10].checked && !formularioRead.elements[11].checked) {
        //Informamos al usuario
        alert("Debes escoger al menos 1 ingrediente! Revísalo!")
    } else {
        //Si al menos ha cogido 1 ingrediente, es correcto
        //ponemos a true valido3
        valido3 = true;
    }
    */

    // ************************ RETURN RESULTADOS ************************

    //Si se han superado las 3 validaciones
    if(valido1){
        
    /* ================================ FIN - COMPROBACIONES DESACTIVADAS PROVISIONALMENTE ================================ */


    //if (valido1 && valido2 && valido3) {
        //Creamos un array, donde metemos
        //las variables de campos limpias
        let campos = []
        campos[0] = nombreOK
        campos[1] = direccionOK
        campos[2] = codPosOK
        campos[3] = telefonoOK
        campos[4] = emailOK
        //y lo devolvemos
        return(campos)
    //Si alguna no se ha superado,
    }else{
        //devolveremos "error"
        return "error"
    }

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
    cadena1 = cadena1.replaceAll(".","")
    cadena1 = cadena1.replaceAll(",","")
    cadena1 = cadena1.replaceAll("(","")
    cadena1 = cadena1.replaceAll(")","")
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
    cadena1 = cadena1.replaceAll("/","_")
    cadena1 = cadena1.replaceAll(/\s/g, "_")
    return cadena1
}

