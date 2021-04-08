console.log("Ejecutando JavaScript.....");

const canvas = document.getElementById("canvas");

// dimensiones del canvas
canvas.width = 640;
canvas.height = 480;

// contexto
const ctx = canvas.getContext("2d");

ctx.beginPath();
    // lugar y dimensiones del rectangulo
    ctx.rect(10,10, 200,100);

    // relleno del rectangulo
    ctx.fillStyle = 'lightgrey';
    ctx.fill();

    // trazo del rectangulo
    ctx.stroke();
ctx.closePath();