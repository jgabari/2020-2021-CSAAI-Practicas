console.log("Ejecutando JavaScript.....");

const canvas = document.getElementById("canvas");

const btn_start = document.getElementById("btn_start");

// dimensiones del canvas
canvas.width = 463;
canvas.height = 640;

// contexto
const ctx = canvas.getContext("2d");

//Crear los elementos de sonido
const s_pared = new Audio('pong-rebote.mp3');
const s_raqueta = new Audio('pong-raqueta.mp3');
const s_ladrillo = new Audio('pong-tanto.mp3');

// animación bola
// posicion inicial del elemento a animar
let x = canvas.width/2;
let y = canvas.height-150;
let x1 = canvas.width/2;
let y1 = canvas.height-50;

// velocidad horizontal del objeto
let velx = 5;
let vely = -2;
let velx1 = 10;

// Estados del juego
const ESTADO = {
    INICIO: 0,
    ESPERANDO: 1,
    JUGANDO: 2,
    MUERTE: 3
};

// Variable de estado (por defecto: INICIO)
let estado = ESTADO.INICIO;

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

// Contador de vidas
var vidas = 3;

// Contador de puntos
var puntos = 0;

// funcion principal del juego
function update() {
    if (estado == ESTADO.INICIO) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "25px Arial";
        ctx.fillStyle = 'red';
        ctx.fillText("Press START to play", 40, canvas.height/2);
        btn_start.onclick = () => {
            estado = ESTADO.ESPERANDO;
        }
    } else if (estado == ESTADO.ESPERANDO || estado == ESTADO.JUGANDO) {
        // Borrar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Dibujar elementos visibles
        // --Texto marcador
        ctx.font = "25px Arial";
        ctx.fillStyle = 'red';
        ctx.fillText(puntos, 10, 30);
        // --Texto vidas
        ctx.font = "25px Arial";
        ctx.fillStyle = 'red';
        ctx.fillText(vidas, 440, 30);
        // --Estructura de los ladrillos
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
        // --Dibujar los ladrillos
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
        // --Dibujar la bola
        ctx.beginPath();
            // bola
            ctx.arc(x,y, 5, 0, 2*Math.PI);
            // dibujar
            ctx.fillStyle = 'red';
            // rellenar
            ctx.fill();
        ctx.closePath();
        // --Dibujar la raqueta
        ctx.beginPath();
            // rectángulo
            ctx.rect(x1, y1, RAQUETA.w, RAQUETA.h);
            // dibujar
            ctx.fillStyle = 'red';
            // rellenar
            ctx.fill();
        ctx.closePath();
        if (estado == ESTADO.ESPERANDO) {
            window.onkeydown = (e) => {
                if (e.key == ' ') {
                    estado = ESTADO.JUGANDO;
                }
            }
        } else if (estado == ESTADO.JUGANDO) {
            // Fisicas de la bola
            // --Actualizar la posicion
            x = x + velx;
            y = y + vely;
            // --Deteccion de la colision
            for (let i = 0; i < LADRILLO.F; i++) {
                for (let j = 0; j < LADRILLO.C; j++) {
                    if (ladrillos[i][j].visible) {
                        if (x > ladrillos[i][j].x && x < ladrillos[i][j].x + ladrillos.w) {
                            if (y > ladrillos[i][j].y && y < ladrillos[i][j].y + ladrillos.h) {
                                console.log('entra');
                                vely = -vely;
                                ladrillos[i][j].visible = false;
                                puntos = puntos + 1;
                                s_ladrillo.currentTime = 0;
                                s_ladrillo.play();
                            }
                        }
                    }
                }
            }
            // --Rebote lados
            if (x < 0 || x >= (canvas.width - 10)) {
                velx = -velx;
                s_pared.currentTime = 0;
                s_pared.play();
            }
            // --Rebote arriba
            if (y < 0) {
                vely = -vely;
                s_pared.currentTime = 0;
                s_pared.play();
            }
            // --Llegada al borde de abajo
            if (y >= (canvas.height-10)) {
                x = canvas.width/2;
                y = canvas.height-150;
                vely = -vely;
                vidas = vidas - 1;
                estado = ESTADO.ESPERANDO;
                if (vidas == 0) {
                    estado = ESTADO.MUERTE;
                }
            }
            // --Rebote en la raqueta
            if (x >= (x1-(RAQUETA.w/2)) && x <= (x1+(RAQUETA.w/2))) {
                    if (y >= (y1-(RAQUETA.h/2)) && y <= (y1+(RAQUETA.h/2))) {
                    vely = -vely;
                    s_raqueta.currentTime = 0;
                    s_raqueta.play();
                }
            }
            // Teclas
            window.onkeydown = (e) => {
                // Comprobar si la tecla es una que nos interese
                if (e.key == 'ArrowRight') {
                    // Raqueta a la derecha
                    x1 = x1 + velx1;
                }
                if (e.key == 'ArrowLeft') {
                    // Raqueta a la izquierda
                    x1 = x1 - velx1;
                }
            }
        }
    } else if (estado == ESTADO.MUERTE) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "25px Arial";
        ctx.fillStyle = 'red';
        ctx.fillText("GAME OVER Press START to replay", 20, canvas.height/2);
        btn_start.onclick = () => {
            vidas = 3;
            estado = ESTADO.ESPERANDO;
        }
    }
    requestAnimationFrame(update);
}

// que empiece todo
update();