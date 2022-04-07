function sumar(){
    let operando1 = document.getElementById('op1').value
    let operando2 = document.getElementById('op2').value
    let result = "Debe ingresar 2 numeros"; 
    if ((!isNaN(operando1)) && (!isNaN(operando2)) && ((operando1 != "") && (operando2 != ""))){ //Me aseguro que sea un numero y que no este vacio
        operando1 = parseInt (operando1,10);
        operando2 = parseInt (operando2,10);
        result = operando1 + operando2;
    }
    document.getElementById('result').value = result;
}

function limpiar (){
    document.getElementById('result').value = "";
}