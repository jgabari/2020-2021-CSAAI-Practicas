console.log("Ejecutando JavaScript.....");

const canvas = document.getElementById("canvas");

// dimensiones del canvas
canvas.width = 640;
canvas.height = 480;

// contexto
const ctx = canvas.getContext("2d");

// texto solido
ctx.font = "40px Arial";
ctx.fillStyle = 'lightgrey';
ctx.fillText("Texto sólido", 50, 100);

// texto trazo
ctx.strokeStyle = 'lightgrey';
ctx.font = "50px Cambria";
ctx.strokeText("Texto trazo", 30, 200);