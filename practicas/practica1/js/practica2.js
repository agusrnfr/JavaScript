/*let a = 1;
let b = true;
let c = "Hola";
let d = null;
let e;
let f = 2n ** 60n;
let g = new Date();
let h = [1,2,3,4];
let i = 'Hola';
let j = { x: 2.0, y: -3.6 };
let k = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


console.log(typeof a);
console.log(typeof b);
console.log(typeof c);
console.log(typeof d);
console.log(typeof e);
console.log(typeof f);
console.log(typeof g);
console.log(typeof h);
console.log(typeof i);
console.log(typeof j);
console.log(typeof k);*/

/*let a = 25;
debugger;
console.log(++a);
console.log(a++);

console.log(a == '27');
console.log(a === '27');*/

var values = [];

function max(values) {
    let i = 0;
    let   max = -2345;
    for (let j = 0; j < values.length;  j++){
        if(typeof(values[j]) === "number"){
         if (values[j] > max) 
            max = values[j]
        } 
    }
    return max;
    }

function min(values) {
    if(values.length > 0){
        i = Math.min.apply(null,values);
    }
    else
        i = "Esta vacío"
    return i ;
    }

function avg(values) {
    return sum(values)/values.length;
}


function sum(values) {
    let total = 0;
    for (let i = 0; i < values.length; i++){
        total+=values[i];
    }
    return total;
    }

const maximo = max(values);
console.log(maximo);

const minimo = min(values);
console.log(minimo);

const promedio = avg(values);
console.log(promedio);

const suma = sum(values);
console.log(suma);

//EJER 4
console.log ("EJER 4");

function concat(left, right) {
    return left.concat(right);
    }

var names = ["John", "Paul", "George", "Ringo"];
console.log(names.reduce(concat));

//SUMO CON REDUCE

/*function sum2(values) {
    let initialValue = 0;
    return values.reduce((previousValue, currentValue) => previousValue + currentValue,initialValue)
    }
    const suma2 = sum2(values);
    console.log(suma2);*/
const initialValue = 0;
const suma2 = values.reduce(
    function(a,b){
            return a + b;
    },initialValue);

console.log (suma2);
//REDUCE SOBRE ARREGLO VACIO DA EL INITIAL VALUE, Llamando a reduce() sobre un array vacío sin un valorInicial lanzará un TypeError

//EJERCICIO 5
console.log ("EJER 5");

function arrayEquals(a, b) {
    let ok = true;
    let i = 0;
    if ((a != null) && (b != null)){
        if (a.length == b.length){
            while ((i < b.length) && (ok))
            {
                if (a[i] === b[i])
                    i++;
                else ok = false
            }
        }
        else
            ok = false;
    }
        else
           if ((a == null) && (b == null))
            ok = true;
        return ok;
    }

//EJERCICIO 6
console.log ("EJER 6");

var a = [1,2,3,4];
var b = [1,2,3,4];
var c = [1,2,3,4,5];
var d = "Hola";
var e = null;

console.log(arrayEquals(a, a));
console.log(arrayEquals(a, b));
console.log(arrayEquals(b, c));
console.log(arrayEquals(e, c));
console.log(arrayEquals(c, d));
console.log(arrayEquals(e, e));

function isInteger(numero){
    let ok = false;
    if ((numero % 1 == 0) && (typeof numero == "number")) {
        ok = true;
    }
    return ok;
    }
       
console.log (isInteger(2)); // retorna true
console.log (isInteger(2.0)); // retorna true
console.log (isInteger(2.1)); // retorna false
console.log (isInteger(-10)); // retorna true
console.log (isInteger([1])); // retorna false
console.log (isInteger("2")); // retorna false
console.log (isInteger(true)); // retorna false
console.log (isInteger(null)); // retorna false
var num;
console.log (isInteger(num)); // retorna false

// TAMBIEN PUEDO HACER console.log (Number.isInteger(2));

//EJERCICIO 7

console.log ("EJER 7");

function isNumeric (a){
    let ok = false;
    if ((typeof a == "string") && (!isNaN(a))){
        ok = true;
    }
    return ok;
}

console.log (isNumeric("2")) // retorna true
console.log (isNumeric("2a")) // retorna false
console.log (isNumeric(2)) // retorna false

//EJERCICIO 8
console.log ("EJER 8");
var prices = {
    MILK: 48.90,
    BREAD: 90.50,
    BUTTER: 130.12
};
var amounts = {
    MILK: 1,
    BREAD: 0.5,
    BUTTER: 0.2
}

console.log(typeof prices);
console.log(prices.BREAD);
console.log(amounts["MILK"]);
/*
CON OBJECT.KEYS DEVUELVE UN ARRAY CON LOS NOMBRES DE CADA PROPIEDAD (EL TAMAÑO DEL ARRAY SON LAS N PROPIEDADES DEL OBJETO)
EL NAME "MILK" ESTARIA EN [0] DEL ARRAY QUE SE RETORNA. CUANDO HAGO FOR EACH ES QUE "CLAVE" ES EL ELEMENTO DEL ARRAY, ES DECIR ES EL VALOR ACTUAL.
SI ESE ELEMENTO ("CLAVE") ES UNA PROPIEDAD DEL OBJETO CANTIDAD (cantidad.hasOwnProperty) VOY SUMANDO EN EL ACUMULADOR
SUMAS LA MULTIPLICACION ENTRE LA PROPIEDAD DE PRECIO Y LA PROPIEDAD DE CANTIDAD. 
SERIA-->sumas += precio[MILK] * cantidad[MILK]
        sumas += 48.90 * 1
*/
function total (precio,cantidad){
    let sumas = 0;
    Object.keys(precio).forEach (clave =>{
        if (cantidad.hasOwnProperty(clave)){
            sumas += precio[clave] * cantidad[clave]
        }
    })
return sumas
}

/* CON OBJECT.ENTRIES() DEVUELVE UN ARRAY CON UN ARRAY CON 2 ELEMENTOS NOMBRE,VALOR. EJ ['MILK','48.98'] IDEM ARRIBA SOLO QUE
    AL SER UN ARRAY DENTRO DE UN ARRAY TENGO QUE HACER 2 FOR EACH.
    function total (precio,cantidad){
    let sumas=0
    Object.entries(precio).forEach (clave => {
    clave.forEach(clave2 => {
        if (cantidad.hasOwnProperty(clave2))
        {
            sumas += precio[clave2] * cantidad[clave2]
        }
        })

    })
         
FOR EACH -> arr.forEach(function callback(currentValue, index, array) {
// tu iterador
}
currentValue seria el valor de cada posicion del vector, */
var amounts2 = {
    BREAD: 1.5
};

console.log(total(prices, amounts));
console.log(total(prices, amounts2));

//EJERCICIO 9

console.log ("EJER 9");
     
var words = ['perro', 'gato', 'casa','árbol', 'nube', 'día', 'noche','zanahoria', 'babuino'];

words.sort((a, b) => a.localeCompare(b));
console.log(words);
/*
a.localeCompare(b) es compare function 
si a < b devuelve numero negativo
si a > b devuelve numero positivo
si a = b devuelve 0
arr.sort([compareFunction]) 
Si compareFunction(a, b) es menor que 0, se sitúa a en un indice menor que b. Es decir, a viene primero.
Si compareFunction(a, b) retorna 0, se deja a y b sin cambios entre ellos
Si compareFunction(a, b) es mayor que 0, se sitúa b en un indice menor que a.
*/
words.sort((a,b) => b.localeCompare(a));
console.log(words);

// EJERCICIO 10
console.log ("EJER 10");

words.sort(function (a,b){
    return a.length-b.length
});
/*
si a < b devuelve numero negativo --> ej 2-3 = -1 
si a > b devuelve numero positivo --> ej 3-2 = 1
si a = b devuelve 0 --> ej 3-3 = 0
*/
console.log(words);

console.log ("EJER 11");
function identity(x){
    return x;
   }
   var id = function(x){
    return x;
   }
var iden = x => x;
var identidad = identity;

console.log ("compruebe el typeof de cada una.");

console.log(typeof identity);
console.log(typeof id);
console.log(typeof iden);
console.log(typeof identidad);

console.log ("compruebe el resultado de las siguientes sentencias");
console.log(identity('Hola'));
console.log(id('Hello'));
console.log(iden('Buen día'));
console.log(identidad('Buen día'));

//EJERCICIO 12

console.log ("EJER 12");

function reduce(array, binaryOperation, initialValue){
    let acumulador = initialValue;
    array.forEach(valor => {
        acumulador = binaryOperation(acumulador,valor);
    })
    return acumulador;
   }
   
var numbers = [ 1, 3, 4, 6, 23, 56, 56, 67, 3,567, 98, 45, 480, 324, 546, 56 ];
var sum = (x, y) => x + y;
console.log(numbers.reduce(sum, 0));
console.log(reduce(numbers, sum, 0));

