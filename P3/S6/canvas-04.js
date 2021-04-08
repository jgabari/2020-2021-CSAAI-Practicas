console.log("Ejecutando JavaScript.....");

const canvas = document.getElementById("canvas");

// dimensiones del canvas
canvas.width = 640;
canvas.height = 480;

// contexto
const ctx = canvas.getContext("2d");

ctx.beginPath();
    // linea horizontal
    ctx.moveTo(20,20);
    ctx.lineTo(250, 20);

    // linea vertical
    ctx.moveTo(20,40);
    ctx.lineTo(20, 250);

    // lineas horizontal y vertical juntas
    ctx.moveTo(50,50);
    ctx.lineTo(400, 50);
    ctx.lineTo(400, 300);

    // linea diagonal
    ctx.moveTo(100, 100);
    ctx.lineTo(400, 400);

    // color y tamaño de las lineas
    ctx.strokeStyle = 'lightgrey';
    ctx.lineWidth = 4;

    // dibuja las lineas
    ctx.stroke();
ctx.closePath();