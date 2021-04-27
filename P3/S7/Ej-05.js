console.log("Ejecutando js.....");

const display = document.getElementById("display");

// tecla pulsada: mostrar su información
window.onkeydown = (e) => {
    display.innerHTML = `Tecla: ${e.key}. Código: ${e.keyCode}`
}

// tecla liberada: borrar el párrafo
window.onkeyup = (e) => {
    display.innerHTML = ''
}