console.log("Ejecutando JavaScript.....");

const canvas = document.getElementById("canvas");

// dimensiones del canvas
canvas.width = 463;
canvas.height = 640;

// contexto
const ctx = canvas.getContext("2d");

// animación bola
// posicion inicial del elemento a animar
let x = canvas.width/2;
let y = canvas.height-150;
let x1 = canvas.width/2;
const y1 = canvas.height-50;

// velocidad horizontal del objeto
let velx = 6;
let vely = -3;
let velx1 = 20;

// variable de estado del saque
var saque = false;

// Constantes de los ladrillos
const LADRILLO = {
    F: 7,
    C: 14,
    w: 27,
    h: 9,
    origen_x : 10,
    origen_y: 40,
    padding: 5,
    visible: true
};

// Constantes de la raqueta
const RAQUETA = {
    w: 60,
    h: 10,
};

// funcion principal de animacion
function update() {
    console.log("test");
    
    // algoritmo de animación:
    // 1. actualizar posiciones de los elementos
    // *rebote lados
    if (x < 0 || x >= (canvas.width - 10)) {
        velx = -velx;
    }
    // *rebote arriba
    if (y < 0) {
        vely = -vely;
    }
    //rebote en la raqueta
    if ((x >= x1-(RAQUETA.w/2)) && (x <= x1+(RAQUETA.w/2)) && (y >= y1)) {
        vely = -vely;
    }
    // llegada al borde de abajo
    if (y >= (canvas.height-10)) {
        x = canvas.width/2;
        y = canvas.height-150;
        vely = -vely;
        saque = false;
    }
    // actualizar posicion
    if (saque == true) {
        x = x + velx;
        y = y + vely;
    }
    
    // teclas
    window.onkeydown = (e) => {
        // comprobar si la tecla es una que nos interese
        if (e.key == 'ArrowRight') {
            // raqueta a la derecha
            x1 = x1 + velx1;
        }
        if (e.key == 'ArrowLeft') {
            // raqueta a la izquierda
            x1 = x1 - velx1;
        }
        if (e.key == ' ') {
            saque = true;
        }
    }
    
    // 2. Borrar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 3. dibujar elementos visibles
    // texto marcador
    ctx.font = "25px Arial";
    ctx.fillStyle = 'red';
    ctx.fillText("000", 10, 30);
    
    // texto vidas
    ctx.font = "25px Arial";
    ctx.fillStyle = 'red';
    ctx.fillText("5", 340, 30);
    
    
    
    // Estructura de los ladrillos
    const ladrillos = [];
    
    for (let i = 0; i < LADRILLO.F; i++) {
        ladrillos[i] = [];
        for (let j = 0; j < LADRILLO.C; j++) {
            ladrillos[i][j] = {
                x: LADRILLO.origen_x + ((LADRILLO.w + LADRILLO.padding) * j),
                y: LADRILLO.origen_y + ((LADRILLO.h + LADRILLO.padding) * i),
                w: LADRILLO.w,
                h: LADRILLO.h,
                padding: LADRILLO.padding,
                visible: LADRILLO.visible
            };
        }
    }
    
    // Dibujar los ladrillos
    for (let i = 0; i < LADRILLO.F; i++) {
        for (let j = 0; j < LADRILLO.C; j++) {
            // Si es visible se pinta
            if (ladrillos[i][j].visible) {
                ctx.beginPath();
                ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, LADRILLO.w, LADRILLO.h);
                ctx.fillStyle = 'green';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
    
    // Funciones para dibujar la bola
    ctx.beginPath();
    // bola
    ctx.arc(x,y, 5, 0, 2*Math.PI);
    
    // dibujar
    ctx.fillStyle = 'red';
    
    // rellenar
    ctx.fill();
    ctx.closePath();
    
    // Funciones para dibujar la raqueta
    ctx.beginPath();
    // rectángulo
    ctx.rect(x1, y1, RAQUETA.w, RAQUETA.h);
    
    // dibujar
    ctx.fillStyle = 'red';
    
    // rellenar
    ctx.fill();
    ctx.closePath();
    
    // 4. volver a ejecutar update cuando toque
    requestAnimationFrame(update);
}

// que empiece todo
update();