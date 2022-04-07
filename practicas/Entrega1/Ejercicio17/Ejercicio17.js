function limpiar (){
    document.getElementById('result').value = "";
}

function analizar(id){
    let operando1 = document.getElementById('op1').value
    let operando2 = document.getElementById('op2').value
    let result = "Debe ingresar 2 números";   

    if ((!isNaN(operando1)) && (!isNaN(operando2)) && ((operando1 != "") && (operando2 != ""))){ //Me aseguro que sea un numero y que no este vacio
        operando1 = parseInt (operando1,10);
        operando2 = parseInt (operando2,10);;

        switch (id) {
            case "mulButton": 
                result = operando1 * operando2;
            break;
            case "sumarButton": 
                result = operando1 + operando2;
            break;
            case "divButton": 
                if (operando2 != 0)
                    result = operando1 / operando2;
                else
                    result = "No se puede divir por cero"
            break;
            case "restarButton": 
                result = operando1 - operando2;
            break;
        }
    }
    document.getElementById('result').value = result;
}
    