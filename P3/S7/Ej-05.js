// acceder al cuerpo del html
body = document.getElementsByTagName('body')[0];

// funcion de retrollamada de la tecla
window.onkeydown = (e) => {
    // comprobar si la tecla es el espacio
    if (e.key == ' ') {
        // cambiar la activacion de la clase color
        body.classList.toggle("color");
    }
}