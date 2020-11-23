
/* JS para peticiones AJAX */

// Configuracion AJAX
const URL_DESTINO = "http://localhost:5501/json/"
const RECURSO = "datos.json"

function AJAXjson() {

	let xmlHttp = new XMLHttpRequest()
	xmlHttp.onreadystatechange = function () {
		if (this.readyState == 4) {
			if (this.status == 200) {
				procesarRespuesta(this.responseText)//Obtenemos el valor en texto
			} else {
				alert("No encontrado!")
			}
		}
	}
	xmlHttp.open('GET', URL_DESTINO + RECURSO)
	xmlHttp.send(null)
}

// Colocando datos JSON por la pagina

function procesarRespuesta(jsonDoc) {

	//Borrar elementos anteriores

	var borra = document.getElementById("ingredientes")
	while (borra.firstChild) {
		borra.firstChild.remove()
	}

	var borra = document.getElementById("tamano")
	while (borra.firstChild) {
		borra.firstChild.remove()
	}

	var borra = document.getElementById("complemento")
	while (borra.firstChild) {
		borra.firstChild.remove()
	}

	//Creamos objeto JSON

	var objetoJson = JSON.parse(jsonDoc)
	var arrayTamanos = objetoJson.PIZZA.TAMANOS
	var arrayIngredientes = objetoJson.PIZZA.INGREDIENTES
	var arrayComplementos = objetoJson.PIZZA.COMPLEMENTOS

	//Tamanos

		for (let i of arrayTamanos) {

		//Input
		var input = document.createElement("input")
		input.setAttribute("type", "radio")
		input.setAttribute("id", i.nombre)
		input.setAttribute("name", "tamanos")
		input.setAttribute("value", i.precio)

		console.log(input)

		//Espacio entre input y label
		var espacio = document.createElement("text")
		espacio.innerHTML = ("&nbsp;")


		//Label
		var label = document.createElement("label")
		label.innerHTML = (i.nombreCom+" ("+i.precio+"€)")

		label.setAttribute("for", i.nombre)

		//Salto linea
		var p = document.createElement("p")

		//Anadir elementos al DOM
		document.getElementById("tamano").appendChild(input)
		document.getElementById("tamano").appendChild(espacio)
		document.getElementById("tamano").appendChild(label)
		document.getElementById("tamano").appendChild(p)
	}

	//Ingredientes

		for (let i of arrayIngredientes) {
		var elemento = document.createElement("div")
		elemento.setAttribute("id", "elemento")
		//Input
		var input = document.createElement("input")
		input.setAttribute("type", "checkbox")
		input.setAttribute("id", i.nombre)
		input.setAttribute("name", "ingrediente")
		input.setAttribute("value", i.precio)

		//Espacio entre input y label
		var espacio = document.createElement("text")
		espacio.innerHTML = ("&nbsp;")

		//Label
		var label = document.createElement("label")
		label.innerHTML = (i.nombreCom)
		label.innerHTML += (i.precio)
		label.setAttribute("for", i.nombre)

		//Img
		var img = document.createElement("img");
		img.src = i.img;
		label.setAttribute("for", i.nombre)

		//Texto img
		var txtImg = document.createElement("div");
		txtImg.innerHTML = i.nombreCom
		txtImg.setAttribute("id", "txtImg")

		//Anadir elementos al DOM
		elemento.appendChild(input)
		elemento.appendChild(espacio)
		elemento.appendChild(label)
		img.appendChild(txtImg)
		label.appendChild(img)
		document.getElementById("ingredientes").appendChild(elemento)
		console.log(elemento)

		//Evento seleccionar ingrediente
		let sel = false
		img.addEventListener("click", function () {
			if (sel == false) {
				this.setAttribute("style", "filter: brightness(55%) blur(2px);")
				sel = true
			} else {
				this.removeAttribute("style", "filter: brightness(55%) blur(2px);")
				sel = false
			}
		})
	}

	//Complementos

	for (let i of arrayComplementos) {

		//Input
		var input = document.createElement("input")
		input.setAttribute("type", "checkbox")
		input.setAttribute("id", i.nombre)
		input.setAttribute("name", "complemento")
		input.setAttribute("value", i.precio)

		//Espacio entre input y label
		var espacio = document.createElement("text")
		espacio.innerHTML = ("&nbsp;")

		//Label
		var label = document.createElement("label")
		label.innerHTML = (i.nombreCom+" ("+i.precio+"€)")
		label.setAttribute("for", i.nombre)

		//Salto linea
		var p = document.createElement("p")

		//Anadir elementos al DOM
		document.getElementById("complemento").appendChild(input)
		document.getElementById("complemento").appendChild(espacio)
		document.getElementById("complemento").appendChild(label)
		document.getElementById("complemento").appendChild(p)
	}
}
