console.log("Hola Mundo!");

debugger;

var text = "Lorem ipsum dolor sit amet.";

ejercicio5(text); 

function ejercicio5(text)
{ console.log(text.length);
  console.log(text.indexOf("ipsum"));
  console.log(text.substring(1,4).toUpperCase());
}

/*const A = 1;
const B = 2;
const C = 3;*/

const A = ~~(Math.random()*8);
const B = ~~(Math.random()*3);
const C = ~~(Math.random()*5);

console.log ("A: ",A,"B: ",B,"C: ",C);

ejercicio6(A,B,C);

function ejercicio6 (A,B,C){
  console.log("(A + B)^C: ",Math.pow (A+B,C));
  console.log("MAXIMO: ",Math.max(A,B,C));

}

var dia1 = new Date ();
var dia2 = new Date (1575978300000);

imprimirFecha(dia2);

function imprimirFecha (fecha){
  console.log(fecha.toLocaleDateString());
  console.log(fecha.toLocaleTimeString());
}

funcion2 (dia1,dia2);

function funcion2 (dia1,dia2){
  let aux = dia1.getFullYear();
  dia1.setMonth(dia2.getMonth());
  dia2.setFullYear(aux);
  imprimirFecha (dia1);
  imprimirFecha (dia2);
}

var imprimir = funcion3 (dia1,dia2);
console.log('DIAS: ',Math.floor(imprimir/(1000*60*60*24)));

function funcion3 (dia1,dia2) {
  var diferencia = new Date (dia1.getTime()-dia2.getTime());
  return diferencia
}