var usuario = {
    user: '',
    room: ''
}
var idBarco = '';
var pos = null
var empezoJuego = false
const barcos = [
    { nombre: "barco0", tamaño: 1, posicion: "vertical", colocado: false },
    { nombre: "barco1", tamaño: 2, posicion: "vertical", colocado: false },
    { nombre: "barco2", tamaño: 3, posicion: "vertical", colocado: false },
    { nombre: "barco3", tamaño: 4, posicion: "vertical", colocado: false }]


//-------------------------------------------------------------------------------------------- 

window.addEventListener('load', iniciar);

// CREAR E INICIAR TABLEROS-------------------------------------------------------------------

function iniciar() {       //INICIO DEL JUEGO ASIGNA MANEJADORES A LOS BOTONES 
    let tableroBarcos = tablerosVacios();
    const crear = document.getElementById('crear');
    crear.addEventListener('click', startGameFunction);
    const unir = document.getElementById('unir');
    unir.addEventListener('click', startGameFunction);
    const comenzar = document.getElementById('start');
    comenzar.addEventListener('click', function () {
        actualizarTableroBarcos(tableroBarcos);
    });
    crearTablero('j', tableroBarcos);
    crearListaBarcos()
}

function tablerosVacios() { //INICIALIZA EL TABLERO DE BARCOS
    let tableroBarcos = new Array();
    for (let i = 0; i <= 9; i++) {
        tableroBarcos[i] = new Array()
        for (let j = 0; j <= 9; j++) {
            tableroBarcos[i][j] = 0;
        }
    }
    return tableroBarcos
}

async function startGameFunction(event) {  //HANDLER DE CREAR TABLERO /UNIRSE A TABLERO
    if (event.target.id == 'crear') {
        fetch(`http://localhost:3000/batallaNaval/crear`)
            .then(res => res.json())
            .then(res => {  //CUANDO RECIBO RESPUESTA SERVIDOR
                esconder(document.getElementById('crear'));
                esconder(document.getElementById('unir'))
                document.getElementById('buttonContainer').className = 'd-none'
                document.getElementById('searchBarContainer').className = 'd-none'
                document.getElementById('gameInfo').innerHTML = "CODIGO DE SALA: " + res.room;
                usuario.room = res.room;
                usuario.user = res.user;
                mostrar(document.getElementById('gameContainer')) //MUESTRA EL TABLERO DE BARCOS
            })
            .catch(error => console.log(error))
    }
    else {
        esconder(document.getElementById('crear'))
        document.getElementById('sala').hidden = false;
        let boton = document.getElementById('buscarSala');
        boton.hidden = false;
        boton.addEventListener('click', enviarSala); //BOTON BUSQUEDA DE SALA
    }
}

function enviarSala() {  //HANDLER DEL BOTON PARA BUSCAR SALA.
    console.log(document.getElementById("sala").value)
    fetch(`http://localhost:3000/batallaNaval/unirse?sala=${document.getElementById("sala").value}`)
        .then(res => res.json())
        .then(res => {
            switch (res.room) {
                case 'fullRoom': {
                    alert('SALA LLENA');
                    mostrar(document.getElementById('crear'));
                }
                    break;
                case 'non-existing room': {
                    alert('NO EXISTE SALA');
                    mostrar(document.getElementById('crear'));
                }
                    break;
                default: {
                    esconder(unir);
                    document.getElementById('buttonContainer').className = 'd-none'
                    document.getElementById('searchBarContainer').className = 'd-none'
                    usuario.room = res.room;
                    usuario.user = res.user;
                    mostrar(document.getElementById('gameContainer'))
                }
                    break;
            }
            document.getElementById('sala').hidden = true;
            document.getElementById('buscarSala').hidden = true;
        })
        .catch(err => console.log('err'))
}


function actualizarTableroBarcos(tableroBarcos) {
    let data = {
        tablero: tableroBarcos,
        usuario: usuario
    }
    fetch(`http://localhost:3000/enviarBarcos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.ok) {
                esconder(document.getElementById('armadoTablero'))
                empezoJuego = true
                document.getElementById('columnaTableroAtaque').setAttribute('class','col-5')
                mostrar(document.getElementById('e'))
                crearTablero('e') //CREO EL TABLERO DE ATAQUE
                actualizarTablero(); //UNA VEZ QUE SE ENVIA EL TABLERO DE BARCOS COMIENZA EL INTERVALO ACTUALIZANDO LAS JUGADAS
            }
            else {
                if (!res.ok)
                    alert(res.statusText); //ALERTA CUALQUIER PROBLEMA CON EL TABLERO
            }
        })
        .catch(err => console.log('err'))
}

function esconder(id) {
    id.hidden = true;
}

function mostrar(id) {
    id.hidden = false;
}

function actualizarTablero() {
    actualizar = setInterval(function () {
        fetch(`http://localhost:3000/batallaNaval/obtenerTablero?sala=${usuario.room}&id=${usuario.user}`)
            .then(res => {
                if (res.ok) {
                    let respuesta = res.json()
                    respuesta.then(res => {
                        if (res.ganador == -1) { //-1 ES QUE LA PARTIDA SIGUE EN JUEGO 
                            for (let i = 0; i <= 9; i++) {
                                for (let j = 0; j <= 9; j++) {
                                    let grid = document.getElementById('j' + i + j)
                                    if (res.board[i][j] == 1) {
                                        grid.style.backgroundColor = "#585858";
                                        grid.style.border = "solid 	#484848"
                                    } else if (res.board[i][j] == 2) {
                                        grid.style.backgroundColor = "#B20D30"
                                    } else if (res.board[i][j] == 3){
                                        grid.style.background = "blue"
                                        grid.style.opacity = "0.7";
                                    }
                                    if (grid.firstChild) {
                                        grid.removeChild(grid.lastChild);
                                      }
                                }
                            }
                            let estado = document.getElementById('estado')
                            estado.innerHTML = "TURNO: JUGADOR " + res.turno;
                        } else {
                            clearInterval(actualizar)   //CUANDO TERMINA EL JUEGO SE DEJA DE HACER EL INTERVALO
                            if (res.ganador == 2) {
                                alert("EMPATE");
                            } else alert("El ganador es el jugador: " + (++res.ganador))
                        }
                    })
                } else {
                    if (!res.ok) { //INFORME DE ERRORES
                        let estado = document.getElementById('estado')
                        estado.innerHTML = res.statusText;
                    }
                }
            })
            .catch(err => console.log('err'))
    }, 1000)
}


function crearTablero(id, tablero) {
    const board = document.getElementById(id);
    for (let i = 0; i <= 9; i++) {
        for (let j = 0; j <= 9; j++) {
            const grid = document.createElement('div');
            grid.setAttribute('class', 'grilla-batalla')
            grid.setAttribute('id', id + i + j);
            if (id == 'j') {   //J ES TABLERO DE BARCOS
                grid.addEventListener('dragover', function (e) { if (!empezoJuego) e.preventDefault() })
                grid.addEventListener('drop', function (e) {
                    if (!empezoJuego) ponerBarcos(e, grid, tablero)
                })
                grid.addEventListener('dragstart', function (e) {
                    if (!empezoJuego) moverBarcos(e, tablero);
                })
            }
            board.appendChild(grid)
        }
    }
    if ((id == "e")) {  //E ES TABLERO DE ATAQUE
        board.addEventListener('click', torpedo, true);
    }

}

//------------------------------------------------------------------------------------------

// BARCOS -----------------------------------------------------------------------------------

function crearListaBarcos() {
    const listaBarcos = document.getElementById('barcos');
    barcos.forEach(barco => {
        const item = document.createElement('div');
        const barcoId = barco.nombre
        item.style.backgroundColor = "#585858"
        item.style.border = "solid black"
        item.style.height = `${55 * barco.tamaño}px`;
        item.style.width = "55px";
        item.style.float = "left"
        item.setAttribute('id', barcoId);
        item.setAttribute('draggable', true);
        listaBarcos.appendChild(item);
        item.addEventListener('dragstart', function () {
            if (!empezoJuego) idBarco = document.getElementById(barcoId)
        })
        item.addEventListener('click', function () { //SIRVE PARA PODER GIRAR LOS BARCOS
            if (!empezoJuego) idBarco = document.getElementById(barcoId)
        })
    })
}

function posicionBarco() {
    if (idBarco != "") {
        const barco = barcos.find(barco => barco.nombre == idBarco.id)
        if (!barco.colocado) {
            if (barco.posicion == 'vertical') {
                barco.posicion = "horizontal"
                idBarco.style.width = `${55 * barco.tamaño}px`;
                idBarco.style.height = `${55}px`
            } else {
                barco.posicion = "vertical"
                idBarco.style.height = `${55 * barco.tamaño}px`;
                idBarco.style.width = `${55}px`
            }
        }
    }
}

function chequearPos(barco, tableroBarcos, fila, columna) {
    if (barco.posicion == 'vertical') {
        if (((fila - 1) + barco.tamaño) < 10) {
            for (let i = fila; i < fila + barco.tamaño; i++) {
                if (tableroBarcos[i][columna] == 1) {
                    return false
                }
            }
            for (let i = fila; i < fila + barco.tamaño; i++) {
                tableroBarcos[i][columna] = 1;
            }
            return true
        }
    } else {
        if (((columna - 1) + barco.tamaño) < 10) {
            for (let i = columna; i < columna + barco.tamaño; i++) {
                if (tableroBarcos[fila][i] == 1) {
                    return false
                }
            }
            for (let i = columna; i < columna + barco.tamaño; i++) {
                tableroBarcos[fila][i] = 1;
            }
            return true
        }
    }
}


function ponerBarcos(e, grilla, tableroBarcos) {   
    var fila = parseInt(e.target.id.substring(1, 2));
    var columna = parseInt(e.target.id.substring(2, 3));
    const barco = barcos.find(barco => barco.nombre == idBarco.id)
    if ((chequearPos(barco, tableroBarcos, fila, columna))) { //VALIDAR PARA QUE NO SE SUPERPONGAN LOS BARCOS O SE SALGAN DEL TABLERO
        barco.colocado = true
        grilla.appendChild(idBarco);
    } else {
        if (pos != null) 
            (chequearPos(barco, tableroBarcos, pos.fila, pos.columna))
    }
}

function moverBarcos(e, tableroBarcos) {   //muevo los barcos en la grilla y modifico los valores en el tablero seteando en 0 la vieja posicion
    var fila = parseInt(e.currentTarget.id.substring(1, 2));
    var columna = parseInt(e.currentTarget.id.substring(2, 3));
    pos = {     //GUARDO LA ULTIMA POSICION DONDE ESTUVO MI BARCO POR SI SE COLOCA EN UNA POSICION INVALIDA (LINEA 284)
        fila: fila,
        columna: columna
    }
    const barco = barcos.find(barco => barco.nombre == idBarco.id)
    if (barco.posicion == 'vertical') {
        for (let i = fila; i < fila + barco.tamaño; i++) {
            tableroBarcos[i][columna] = 0;
        }
    } else if (barco.posicion == 'horizontal') {
        for (let i = columna; i < columna + barco.tamaño; i++) {
            tableroBarcos[fila][i] = 0;
        }
    }
}

//---------------------------------------------------------------------------------------------------

//ATAQUES -------------------------------------------------------------------------------------------

function torpedo(event) {
    let data = {
        fila: event.target.id.substring(1, 2),
        columna: event.target.id.substring(2, 3),
        usuario: usuario
    }
    console.log(data);
    fetch(`http://localhost:3000/enviarAtaque`, {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.ok) {
                let respuesta = res.json()
                respuesta.then(res => {
                    let tablero = res.tableroAtaque;
                    for (let i = 0; i <= 9; i++) {
                        for (let j = 0; j <= 9; j++) {
                            let grid = document.getElementById('e' + i + j)
                            if (tablero[i][j] == 1) {
                                grid.style.backgroundColor = "blue";
                                grid.style.opacity = "0.7";
                            } else if (tablero[i][j] == 2){
                                grid.style.backgroundColor = "#B20D30"
                            }
                        }
                    }
                    let gameInfo = document.getElementById('gameInfo')
                    gameInfo.innerHTML = "Puntaje: " + res.hitCount
                })
            } else {
                alert(res.statusText);
            }
        })
        .catch(err => console.log('err'))
}
//---------------------------------------------------------------------------------------------------
