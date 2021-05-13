//----- Obtener elemento de video y configurarlo
let directo = document.getElementById("directo");

const video1 = document.getElementById("video1");
const btn_video1 = document.getElementById("btn_video1");

const video2 = document.getElementById("video2");
const btn_video2 = document.getElementById("btn_video2");

const btn_test = document.getElementById("btn_test");

const btn_manual = document.getElementById("btn_manual");
const btn_auto = document.getElementById("btn_auto");

const btn_src_on = document.getElementById("btn_src_on");
const btn_src_off = document.getElementById("btn_src_off");


//-- Establecer las dimensiones de los vídeos
directo.width=420;
directo.height=200;
video1.width=200;  
video1.height=100;
video2.width=200;  
video2.height=100;

//-- Imagen de Test usada
const TEST_IMAGE_URL = "test.png";

//-- Variables de estado
//-- -- Fuentes on/off (estado inicial off -> false)
var onoff = false;
//-- -- Modo manual/automático (modo inicial manual -> false)
var auto = false;

//-- Imagen estática a mostrar cuando el video no
//-- ha arrancado (estado inicial)
directo.poster = TEST_IMAGE_URL;
video1.poster = TEST_IMAGE_URL;
video2.poster = TEST_IMAGE_URL;

//-------------------------------------------------------------------------------------------------ESTADO ON/OFF

//-- Boton de FUENTES-ON
btn_src_on.onclick = () => {
  onoff = true;
  console.log('FUENTES ENCENDIDAS');
 
  //-- Establecer la fuente de la cámara 1
  video1.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4";
  video2.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4";

  //-- Reprodeucimos un vídeo, desde el comienzo
  video1.currentTime = 0;
  video1.play();
  video2.currentTime = 0;
  video2.play();

  //-- Y en silencio...
  video1.muted = true;
  video2.muted = true;

  //-- En la emisión en directo ponemos la imagen de prueba
  directo.poster = TEST_IMAGE_URL;
};

//-- Boton de FUENTES-OFF
btn_src_off.onclick = () => {
    if (onoff==true) {
        onoff = false;
        console.log('FUENTES APAGADAS');
        directo.poster = TEST_IMAGE_URL;
        directo.src = null;
        video1.poster = TEST_IMAGE_URL;
        video1.src = null;
        video2.poster = TEST_IMAGE_URL;
        video2.src = null;
    }
};

//-------------------------------------------------------------------------------------------------MODO MANUAL/AUTOMÁTICO

//-- Boton de MODO MANUAL
btn_manual.onclick = () => {
    if (onoff==true) {
        auto = false;
        console.log('MODO MANUAL');
    }
};

//-- Boton de MODO AUTOMÁTICO
btn_auto.onclick = () => {
    if (onoff==true) {
        auto = true;
        console.log('MODO AUTOMÁTICO');
        setTimeout(change_src, 3000);
    }
};

//-------------------------------------------------------------------------------------------------FUENTE TEST/VIDEO1/VIDEO2
  
//-- Botón de Test
btn_test.onclick = () => {
    if (onoff==true && auto==false) {
        console.log('TEST');
        directo.poster = TEST_IMAGE_URL;
        directo.src = null;
    }
};

//-- Botón de Selección de la cámara 1
btn_video1.onclick = () => {
    if (onoff==true && auto==false) {
        console.log('VIDEO 1');
        directo.src = video1.src;
        directo.currentTime = video1.currentTime;
        directo.play();
        directo.poster=null;
    }
};

//-- Botón de Selección de la cámara 2
btn_video2.onclick = () => {
    if (onoff==true && auto==false) {
        console.log('VIDEO2');
        directo.src = video2.src;
        directo.currentTime = video2.currentTime;
        directo.play();
        directo.poster=null;
    }
};

//-------------------------------------------------------------------------------------------------

function change_src() {
    if (auto == true) {
            if (directo.src == video1.src) {
            directo.src = video2.src;
            directo.currentTime = video2.currentTime;
        } else {
            directo.src = video1.src;
            directo.currentTime = video1.currentTime;
        }
        directo.play();
        directo.poster=null;
        setTimeout(change_src, 3000);
    }

}