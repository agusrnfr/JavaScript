function alerta (res){
    if (res.hasOwnProperty('errors')){
        res.errors.forEach(dato => alert(dato.msg));
    }
    else{
    document.getElementById('res').value = res.resultado
    document.getElementById('porcentaje').value = res.porcentaje
    }
}

function getResponse() {
    let meses1 = document.getElementById('meses1').value
    let meses2 = document.getElementById('meses2').value
    let anio1 = document.getElementById('anio1').value
    let anio2 = document.getElementById('anio2').value
    let dolar = document.getElementById('dolar').value

    fetch(`http://localhost:8000/calcular?meses1=${meses1}&meses2=${meses2}&anio1=${anio1}&anio2=${anio2}&dolar=${dolar}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },  
    })
    .then(res => res.json())
    .then(datos => alerta(datos))
    .catch(error => console.log(error))
}
