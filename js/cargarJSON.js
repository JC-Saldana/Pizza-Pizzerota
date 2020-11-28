
/* JS para peticiones AJAX */

// Configuracion AJAX

const URL_DESTINO = "http://127.0.0.1:5502/json/"
const RECURSO = "datos.json"

function AJAXjson() {
    $.ajax({
		'type'  : 'GET', 
		'url'   : URL_DESTINO + RECURSO,
	}
).done(procesarRespuesta)
.fail(procesarError)
}

// Colocando datos JSON por la pagina

function procesarRespuesta(datos) {

	console.log(arguments)
	console.log(datos)

	//Borrar elementos anteriores
	$("#tamanos").html("")
	$("#complementos").html("")
	$("#ingredientes").html("")

	//Objetos JSON
	let arrayTamanos = datos.PIZZA.TAMANOS
	let arrayIngredientes = datos.PIZZA.INGREDIENTES
	let arrayComplementos = datos.PIZZA.COMPLEMENTOS

	//Añadimos elementos. Por cada iteracion creamos el elemento TR con los datos.
    //Con "${}" podemos extraer el valor de las variables y ponerlas
    //directamene en un String (seria como concatenar).

    $.each(arrayTamanos,function(i, tamano){

		console.log(tamano)
        let boton = $(`<input type="radio" name=tamanos id=${tamano.nombre} value=${tamano.precio}><label for=${tamano.nombre}>${tamano.nombreCom} (${tamano.precio}€)</label><p></p>`)
		boton.appendTo("#tamanos")

    })

	$.each(arrayComplementos,function(i, complemento){
      
		console.log(complemento)
        let boton = $(`<input type="radio" name=complementos id=${complemento.nombre} value=${complemento.precio}><label for=${complemento.nombre}>${complemento.nombreCom} (${complemento.precio}€)</label><p></p>`)
		boton.appendTo("#complementos")

	})
	
	$.each(arrayIngredientes,function(i, ingrediente){
     
 		console.log(ingrediente)
		let checkbox = $(`<div id=ing${i}><input type="checkbox" id=${ingrediente.nombre} name="ingrediente" value=${ingrediente.precio} >
		<label for=${ingrediente.nombre}><h4>${ingrediente.nombreCom} (${ingrediente.precio}€)</h4><br>
		<img src=${ingrediente.img} id="ingNoSeleccionado" class="scale-in-center" name="seleccionable"></label></div>`)
		checkbox.appendTo("#ingredientes")

	})

	//CSS indica imagen seleccionada

	$("[name = seleccionable]").click(function() {
		let id = this.id
		if (id == "ingNoSeleccionado") {
			$(this).css({filter: "brightness(55%)", blur : "(2px)"})
			$(this).attr("id","ingSeleccionado") 
		} else {
			$(this).css({filter: "brightness(100%)", blur : "(0px)"})
			$(this).attr("id","ingNoSeleccionado") 
		}
	})	
}

//Error AJAX

function procesarError() {
	alert("No encontrado!")
}
