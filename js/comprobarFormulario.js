/*En este fichero tenemos una función principal, que
se encarga de comprobar que el formulario está
correctamente rellenado.
Puesto que entendemos que el formulario puede tener
ciertos errores sin importancia que podemos gestionar nosotros
como algún espacio en blanco al final, pues procederemos a
limpiar primeramente los campos de introducción de texto,
comprobarlos, y después procederemos con los radio y checkbox
*/

/*Dicha función principal se encarga de ir llamando a las distintas
funciones, primeramente, almacenando los datos limpios (que son limpiados
por medio de las funciones contenidas en el fichero limpiarCampos.js
Después, se van encadenando las comprobaciones, y en caso de ser correctas
todasm se devuelven los campos limpios, que serán pasados desde el fichero main.js
a las funciones de cálculo y envío del formulario
*/ 

function comprobarFormulario() {

    let valor = "error"

    campos = devuelveCamposLimpios()

    console.log(campos)

    if (comprobarCampos(campos)) {

        if (comprobarTamano()) {

            if (comprobarIngredientes()) {

                if (comprobarComplementos()) {

                    valor = campos
                }
            }
        }
    }
    return valor

}

// ************************ COMPROBACIONES I: CAMPOS DE TEXTO ************************

function comprobarCampos(camposLimpios) {

    let nombreOK = camposLimpios[0]
    let direccionOK = camposLimpios[1]
    let codPosOK = camposLimpios[2]
    let telefonoOK = camposLimpios[3]
    let emailOK = camposLimpios[4]
    //Este console.log nos permite ver como han quedado procesados
    //antes de la comprobación

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


    // ************************ COMPROBACIONES CAMPOS DE TEXTO ************************

    /*Asumimos una letiable inicial falsa común a todas las comprobaciones valido, haciendo
    uso de las letiables con los datos ya depurados y las expresiones regulares antes mencionados*/

    //Comprobamos una a una las letiables contra la expresión regular

    let validoCampos = false
    if (nombreReg.test(nombreOK) && direccionReg.test(direccionOK) && codPosReg.test(codPosOK) && telefonoReg.test(telefonoOK) && emailReg.test(emailOK)) {
        //Si la comprobación da correta, almacenamos los campos limpios en un array
        //y lo devolvemos
        validoCampos = true;

    } else {
        /*Comprobamos uno por uno, y en su caso, informamos
        al usuario del error, para que pueda corregirlo*/
        let val = true
        if (!nombreReg.test(nombreOK)) {
            alert("El nombre que has introducido es incorrecto!\nRecuerda que debe empezar por maýusculas e incluir apellido!")
            val = false
        }
        if (!direccionReg.test(direccionOK) && val == true) {
            alert("La dirección que has introducido es incorrecta! Revísalo!")
            val = false
        }
        if (!codPosReg.test(codPosOK) && val == true) {
            alert("El código postal es incorrecto! Revísalo!")
            val = false
        }
        if (!telefonoReg.test(telefonoOK) && val == true) {
            alert("El teléfono es incorrecto!\nSólo aceptamos números nacionales: debe empezar por 6, 7, 8 o 9 y sin prefijo!")
            val = false
        }
        if (!emailReg.test(emailOK) && val == true) {
            alert("El email es incorrecto! Revísalo!")
            val = false
        }

    }
    return validoCampos

}

// ************************ COMPROBACIONES II: RADIO BUTTON TAMAÑO PIZZA ************************
function comprobarTamano() {
    let validoTam = false


    //Si no hay ningun botón marcado es que no se ha seleccionado ningun tamaño

    let tam = $("input[name=tamano]:checked")

    if (tam.length != 0) {
        validoTam = true
    } else {
        alert("Necesitas decirnos el tamaño de tu pizza!")
    }

    return validoTam

}



// ************************ COMPROBACIONES III: CHECKBOX INGREDIENTES ************************
function comprobarIngredientes() {

    let validoIng = false

    //Si no hay ningún ingrediente seleccionado, es incorrecto el formulario

    let ing = $("input[name=ingrediente]:checked")

    if (ing.length != 0) {
        validoIng = true
    } else {
        alert("No seas rata!! ¿Sólo quieres masa? Que menos que un ingrediente!")
    }
    return validoIng
}


// ************************ COMPROBACIONES IV: CHECKBOX COMPLEMENTOS ************************
function comprobarComplementos() {

    let validoComp = false

    //Si no hay ningún complemento seleccionado, es incorrecto el formulario

    let comp = $("input[name=complementos]:checked")

    if (comp.length != 0) {
        validoComp = true
    } else {
        alert("Venga... ¡Pide un complemento!")


    }
    return validoComp

}