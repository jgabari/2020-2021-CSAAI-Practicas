console.log("Ejecutando JavaScript.....");

const canvas = document.getElementById("canvas");

// dimensiones del canvas
canvas.width = 640;
canvas.height = 480;

// contexto
const ctx = canvas.getContext("2d");

// leer imagen y dibujarla en el canvas
var logo = document.getElementById("logo-urjc");

logo.onload = () => {
    ctx.drawImage(logo, 15,20);
}