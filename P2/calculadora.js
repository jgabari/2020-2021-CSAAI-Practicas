console.log("Ejecutando JS...");

display = document.getElementById("display")
suma = document.getElementById("suma")
resta = document.getElementById("resta")
multiplicacion = document.getElementById("multiplicacion")
division = document.getElementById("division")
igual = document.getElementById("igual")
del = document.getElementById("delete")
clear = document.getElementById("clear")

//-- Estados de la calculadora
const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2: 3
}
 
 //-- Variable de estado de la calculadora
 //-- Al comenzar estamos en el estado incial
 let estado = ESTADO.INIT;   

//-- Función de retrollamada de los digitos
function digito(ev)
{
    //-- Se ha recibido un dígito
    //-- Según en qué estado se encuentre la calculadora
    //-- se hará una cosa u otra

    //-- Si es el primer dígito, no lo añadimos,
    //-- sino que lo mostramos directamente en el display
    if (estado == ESTADO.INIT) {

        display.innerHTML = ev.target.value;

        //-- Pasar al siguiente estado
        estado = ESTADO.OP1;

    } else if (estado == ESTADO.OPERATION) {

        //--Si está operando, lo añadimos
        display.innerHTML += ev.target.value;

        //--y pasamos al siguiente estado
        estado = ESTADO.OP2;

    } else {
       
        //--En cualquier otro estado lo añadimos
        display.innerHTML += ev.target.value;

        //-- Y nos quedamos en el mismo estado
    } 
    
}


//-- Obtener una colección con todos los elementos
//-- de la clase digito
digitos = document.getElementsByClassName("digito")

//-- Establecer la misma función de retrollamada
//-- para todos los botones de tipo dígito
for (let boton of digitos) {

    //-- Se ejecuta cuando se pulsa un boton
    //-- que es un dígito. Para que el código sea 
    //-- mas legible la función de retrollamada se
    //-- escribe como una función normal (digito)
    boton.onclick = digito;
}

//-------- Resto de funciones de retrollamada

//-- Operaciones
function operacion(ev) {

    if (estado == ESTADO.OP1) {

        //-- Insertar simbolo de la operación
        display.innerHTML += ev.target.value;

        //-- y cambiar estado a OPERATION
        estado = ESTADO.OPERATION;

    }
}
//-- Obtener una colección con todos los elementos
//-- de la clase operacion
operaciones = document.getElementsByClassName("operacion")

//-- Establecer la misma función de retrollamada
//-- para todos los botones de tipo operacion
for (let boton of operaciones) {

    //-- Se ejecuta cuando se pulsa un boton
    //-- que es una operación. Para que el código sea 
    //-- mas legible la función de retrollamada se
    //-- escribe como una función normal (operacion)
    boton.onclick = operacion;

}

//-- Evaluar la expresion
igual.onclick = () => {

    if (estado == ESTADO.OP2) {

        //-- Calcular la expresión y añadirla al display
        display.innerHTML = eval(display.innerHTML);

        //-- Pasar al estado OP1
        estado = ESTADO.OP1;

    }
}

//-- Borrar el último caracter
const OPERADORES = {
    '+': "suma",
    '-': "resta",
    '*': "multiplicacion",
    '/': "division"
};

del.onclick = () => {

    if (display.innerHTML.length == 1) {

        //-- Si solo queda un caracter y se borra, mismo
        //-- efecto que el clear
        display.innerHTML = "0";
        estado = ESTADO.INIT;

    } else {

        display.innerHTML = display.innerHTML.slice(0, -1);
        
        //-- Aquí qncontré un bug que impedía poner un nuevo
        //-- operador si borrabas el anterior, porque no se
        //-- tenía en cuenta que al borrar un caracter podía
        //-- hacer falta cambiar de estado. Así lo soluciono:
        var volverOP1 = true;
        for (var i = 0; i < display.innerHTML.length; i++) {
            if (display.innerHTML.charAt(i) in OPERADORES) {
                volverOP1 = false;
            }
        }
        if (volverOP1 == true) {
            estado = ESTADO.OP1;
        }

    }
}

//-- Poner a cero la expresion
//-- Y volver al estado inicial
clear.onclick = () => {
  display.innerHTML = "0";
  estado = ESTADO.INIT;
}
