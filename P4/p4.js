console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc');
const ctx = canvas.getContext('2d');

//-- Botones
const btn_color = document.getElementById('btn_color');
const btn_gris = document.getElementById('btn_gris');

//-- Acceso al deslizador
const deslizadorR = document.getElementById('deslizadorR');
const deslizadorG = document.getElementById('deslizadorG');
const deslizadorB = document.getElementById('deslizadorB');

//-- Valor del deslizador
const range_valueR = document.getElementById('range_valueR');
const range_valueG = document.getElementById('range_valueG');
const range_valueB = document.getElementById('range_valueB');

//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {
  
  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;
  
  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);
  
  console.log("Imagen lista...");
};

//-- Variable de estado
const FILTRO = {
  INICIO: 0,
  COLOR: 1,
  GRIS: 2
};
let filtro = FILTRO.INICIO;

//-- Función de retrollamada del botón COLORES
btn_color.onclick = () => {
  filtro = FILTRO.COLOR;
}

//-- Función de retrollamada del botón GRISES
btn_gris.onclick = () => {
  filtro = FILTRO.GRIS;
}

function actualiza_colores() {
  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);
  
  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  //-- Obtener el array con todos los píxeles
  let data = imgData.data;
  
  //-- Obtener el umbral de los desliadores
  umbralR = deslizadorR.value;
  umbralG = deslizadorG.value;
  umbralB = deslizadorB.value;
  
  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    if (data[i] > umbralR)
    data[i] = umbralR;
  }
  for (let i = 1; i < data.length; i+=4) {
    if (data[i] > umbralG)
    data[i] = umbralG;
  }
  for (let i = 2; i < data.length; i+=4) {
    if (data[i] > umbralB)
    data[i] = umbralB;
  }
  
  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

//-- Funcion de retrollamada del deslizador ROJO
deslizadorR.oninput = () => {
  //-- Mostrar el nuevo valor del deslizador
  range_valueR.innerHTML = deslizadorR.value;

  if (filtro == FILTRO.COLOR) {
    actualiza_colores();
  }
}

//-- Funcion de retrollamada del deslizador VERDE
deslizadorG.oninput = () => {
  //-- Mostrar el nuevo valor del deslizador
  range_valueG.innerHTML = deslizadorG.value;
  
  if (filtro == FILTRO.COLOR) {
    actualiza_colores();
  }
}

//-- Funcion de retrollamada del deslizador AZUL
deslizadorB.oninput = () => {
  //-- Mostrar el nuevo valor del deslizador
  range_valueB.innerHTML = deslizadorB.value;
  
  if (filtro == FILTRO.COLOR) {
    actualiza_colores();
  }
}

console.log("Fin...");

