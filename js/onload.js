//Este JS es simplemente para dejar el HTML lo más limpio posible
window.onload = function () {
    document.getElementById("enviar").addEventListener("click", enviarPedido)
    document.getElementById("btnBuscarAsincrono").addEventListener("click", cargaActualiza)
    document.getElementById("btnBuscarAsincrono").addEventListener("click", AJAXjson)
}