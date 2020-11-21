	
	/*  IMPORTANTE

		JS no da opción a verificar si solo un checkbox esta "checked",
		por tanto, y para usar JS más a fondo, se ha usado la función: revisa()

		"Required" tampoco exige formato al teléfono, ya que hay formatos muy distintos
		en el mundo. Se ha usado input "pattern" para requerir 9 números como formato

		Algunas funciones para comprobar que se han introducido los datos exigidos no son 
		necesarias, pues "required" ya exige completar los campos, pero se han añadido como
		práctica. No deberían impedir el envío, ya que "required" exige el valor antes que 
		las funciones mencionadas, y de eliminarlas no cambiaría nada.

		*****

		Se indica en el ejercicio usar 4 ingredientes pero se ha desarrollado
		algo más con funciones adicionales como precio en tiempo real

	*/

	window.onload = function() {
		document.getElementById("btnBuscarAsincrono").addEventListener("click", enviarPeticionAsincrona)
	}

	/* AJAX JSON START */

	const URL_DESTINO = "http://localhost:5500/"
	const RECURSO = "ingredientes.json"

    function enviarPeticionAsincrona() {

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

	function procesarRespuesta(jsonDoc) {

        var objetoJson = JSON.parse(jsonDoc)
        var arrayTamaños = objetoJson.PIZZA.TAMAÑOS
		
		/*for(let i of arrayTamaños){
			
			var input = document.createElement("input")
			
			input.setAttribute("type", "radio")
			input.setAttribute("id", i)
			input.setAttribute("name", "tamaño")
			input.setAttribute("value", "5")
			document.getElementById("tamaño").appendChild(input)
			
			console.log(input)

			var espacio = document.createElement("text")
			espacio.innerHTML = ("&nbsp;")
			document.getElementById("tamaño").appendChild(espacio)
			
			var label = document.createElement("label")
			label.innerHTML = (i)
			label.setAttribute("for", i)
			document.getElementById("tamaño").appendChild(label)

			var p = document.createElement("p")
			document.getElementById("tamaño").appendChild(p)
		}*/

        for(let i of arrayTamaños){
			
			var input = document.createElement("input")
			
			input.setAttribute("type", "radio")
			input.setAttribute("id", i)
			input.setAttribute("name", "tamaño")
			input.setAttribute("value", "5")
			document.getElementById("tamaño").appendChild(input)
			
			console.log(input)

			var espacio = document.createElement("text")
			espacio.innerHTML = ("&nbsp;")
			document.getElementById("tamaño").appendChild(espacio)
			
			var label = document.createElement("label")
			label.innerHTML = (i)
			label.setAttribute("for", i)
			document.getElementById("tamaño").appendChild(label)

			var p = document.createElement("p")
			document.getElementById("tamaño").appendChild(p)

			var borra = document.getElementsByClassName("opcionesTamaño")
			for (let i = 0; i < borra.length; i++) {
				borra[i].remove()
			}
		}
    }

	/* AJAX JSON END*/

	function actualiza() {

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

	/* Comprueba que estén rellenos los campos indicados */
	
	function revisa() {

		//Variable que decidirá

		let correcto = true

		//Datos

		d1 = document.getElementById("nombre").value
		d2 = document.getElementById("dirección").value
		d3 = document.getElementById("teléfono").value
		d4 = document.getElementById("email").value

		if (d1 == "" || d2 == "" || d3 == "" || d4 == ""){
			correcto = false
		} 

		//Tamaño

			//Retorna true si al recorrer tamaño detecta alguno checked

		ing = document.getElementsByName("tamaño")
		elegido = false
		for (var i = 0; i < ing.length; i++) {
			if (ing[i].checked) {
				elegido = true
			}
		} 
		if (elegido == false) {
			correcto = false
		}

		//Complementos

			//Retorna true si al recorrer tamaño detecta alguno checked

		ing = document.getElementsByName("complemento")
		elegido = false
		for (var i = 0; i < ing.length; i++) {
			if (ing[i].checked) {
				elegido = true
			}
		} 
		if (elegido == false) {
			correcto = false
		}

		//Ingredientes

			//Retorna true si al recorrer ingredientes detecta alguno checked

		ing = document.getElementsByName("ingrediente")
		elegido = false
		for (var i = 0; i < ing.length; i++) {
			if (ing[i].checked) {
				elegido = true
			}
		} 
		if (elegido == false) {
			correcto = false
		}

		//Decide si todos los campos necesarios están rellenos

		if(correcto == true) {
			//Solicita confirmación pedido
	    	if (confirm("Revisa el pedido. ¿Enviar?") == true){
	    		location.replace('enviado.html')
	    	}
	    	return false
	    	//Detecta que falta ingrediente
	    } else {
	    	alert("Elige al menos un ingrediente")
	    	return false
	    }
	} 