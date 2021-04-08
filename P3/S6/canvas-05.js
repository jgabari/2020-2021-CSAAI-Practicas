console.log("Ejecutando JavaScript.....");

const canvas = document.getElementById("canvas");

// dimensiones del canvas
canvas.width = 640;
canvas.height = 480;

// contexto
const ctx = canvas.getContext("2d");

ctx.beginPath();
    // circulo (coordenadas del centro, radio, angulo inicial, angulo final)
    ctx.arc(320,240, 20, 0, 2*Math.PI);
    ctx.strokeStyle = 'lightgrey';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'grey';

    // dibujar el trazo
    ctx.stroke();

    // dibujar el relleno
    ctx.fill();
ctx.closePath();