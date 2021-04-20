console.log("Ejecutando JavaScript.....");

const canvas = document.getElementById("canvas");

// dimensiones del canvas
canvas.width = 640;
canvas.height = 480;

// contexto
const ctx = canvas.getContext("2d");

// posicion inicial del elemento a animar
let x = 10;
let y = 20;

// velocidad horizontal del objeto
let velx = 5;
let vely = 1;

// funcion principal de animacion
function update() {
    console.log("test");

    // algoritmo de animación:
    // 1. actualizar posiciones de los elementos
    // *rebote: si llega al borde se invierte la velocidad
    if (x < 0 || x >= (canvas.width - 20)) {
        velx = -velx;
    }
    // actualizar posicion
    x = x + velx;
    y = y + vely;

    // 2. Borrar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 3. dibujar elementos visibles
    ctx.beginPath();
        ctx.rect(x, y, 20, 20);

        // dibujar
        ctx.fillStyle = 'red';

        // rellenar
        ctx.fill();

        // dibujar el trazo
        ctx.stroke();
    ctx.closePath();

    // 4. volver a ejecutar update cuando toque
    requestAnimationFrame(update);
}

// que empiece todo
update();