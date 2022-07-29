var socket = io();
var usuario = {
    user:'',
    room:''
}
window.addEventListener('load',principal);

const crearFicha = function (){
    const ficha = document.createElement('div');
    ficha.style.border = 'solid';
    ficha.style.width = '47px'
    ficha.style.height = '47px'
    ficha.style.borderRadius = '50%'
    ficha.style.borderWidth = '2px'
    return ficha;
}

function crearTablero(){ //CREO TABLERO 

    const board = document.createElement('div');
    board.style.backgroundColor = 'green';
    board.style.display = 'grid';
    board.style.gridTemplateColumns = 'repeat(8,50px)';
    board.style.gridTemplateRows = 'repeat(8,50px)';
    board.style.gap = '10px';
    board.style.width = 'fit-content';
    board.style.padding = '15px';
    board.style.marginLeft = 'auto';
    board.style.marginRight = 'auto';

    document.getElementById('tablero').appendChild(board);


    for (let i = 1; i <= 8;i++){
        for (let j = 1; j <= 8; j++){
            const grid = document.createElement('div');
            grid.style.border = 'solid';
            grid.style.height = '50px';
            grid.style.width = '50px';
            grid.setAttribute('id','grid' + i +'_'+j);
            board.appendChild(grid)

            grid.addEventListener('click',((event)=> { 
                socket.emit('fichaJugada', {
                    id: event.target.id,
                    room: usuario.room,
                });
            }));
        }
    }
}

function borrar(id) { //LO UTILIZO PARA BORRAR EL CONTENIDO DE UN CASILLERO CUANDO REDIBUJO EL TABLERO
    while (id.firstChild != null) {
        id.removeChild(id.firstChild);
    }
}

function dibujarFichas(board){ //DIBUJO LAS FICHAS QUE RECIBO DEL TABLERO
    
    for (let i = 1; i<=8;i++){
        for (let j = 1; j<=8;j++){
            let valor = board[i-1][j-1]
            if (valor != 0){
                let ficha = crearFicha();
                if (valor == 1){
                    ficha.style.backgroundColor = 'black';}
                else 
                if (valor == 2){
                    ficha.style.backgroundColor = 'white';}
                let casillero = document.getElementById('grid'+i+'_'+j);
                borrar (casillero);
                casillero.appendChild(ficha);
            }
        }
    }
}

function esconder(id){   
    id.hidden = true;
}

function mostrar(id){   
    id.hidden = false;
}

function startGameFunction (event){  //HANDLER DE CREAR TABLERO /UNISER A TABLERO
    if (event.target.id == 'crear'){
        let randomRoom = (Math.random() + 1).toString(36).substring(7)
        socket.emit('startGame',randomRoom)
    }
    else{ 
        esconder(document.getElementById('crear'))
        document.getElementById('sala').hidden = false;
        let boton = document.getElementById('buscarSala');
        boton.hidden = false;
        boton.addEventListener('click',enviarSala); //BOTON BUSQUEDA DE SALA
    }
}

function enviarSala(){  //HANDLER DEL BOTON PARA BUSCAR SALA.
    socket.emit('joinGame',document.getElementById("sala").value);
}

function iniciar (datos,crear,unir){  //CUANDO RECIBO RESPUESTA SERVIDOR
    esconder(crear);
    esconder(unir)
    document.getElementById('buttonContainer').className = 'd-none'
    document.getElementById('searchBarContainer').className = 'd-none'
    document.getElementById('gameInfo').innerHTML = "CODIGO DE SALA: " + datos.room;
    usuario.room = datos.room;
    usuario.user = datos.user;
}

function unirse (datos,unir){  //CUANDO RECIBO RESPUESTA SERVIDOR
    switch (datos.room) {
        case 'fullRoom': {alert('SALA LLENA');
            mostrar(document.getElementById('crear'));
        }
        break;
        case 'non-existing room': {alert('NO EXISTE SALA');
        mostrar(document.getElementById('crear'));
        }
        break;
        default:{
            esconder(unir);
            document.getElementById('buttonContainer').className = 'd-none'
            document.getElementById('searchBarContainer').className = 'd-none'
            usuario.room = datos.room;
            usuario.user = datos.user;
        } 
        break;
    }
    document.getElementById('sala').hidden = true;
    document.getElementById('buscarSala').hidden = true;
}

function mostrarScore(negro,blanco){ //MOSTRAR SCORE
    let scoreBoard = document.getElementById('scoreBoard')
    scoreBoard.innerHTML = "NEGRO: " + negro + " BLANCO: " + blanco; 
}

function mostrarFichas(fichas){ //MOSTRAR SCORE
    let fichasDisp = document.getElementById('fichasDisponibles')
    fichasDisp.innerHTML = "FICHAS NEGRO: " + fichas.fichasNegro + " FICHAS BLANCO: " + fichas.fichasBlanco 
}

function mostrarTurno(turn){
    if (turn % 2 == 0){
        document.getElementById('gameInfo').innerHTML = "TURNO: NEGRO";
    }
    else if (turn % 2 == 1){
        document.getElementById('gameInfo').innerHTML = "TURNO: BLANCO";
    }
}

function matchFound (datos){ //ENCUENTRO OPONENTE
    crearTablero();
    document.getElementById('gameInfo').innerHTML = "TURNO: NEGRO";
    dibujarFichas(datos);
}

function gameOver (data){
        document.getElementById('gameInfo').hidden = true;
        document.getElementById('fichasDisponibles').hidden = true;

        let tablero = document.getElementById('tablero');
        tablero.hidden = true;

        let p = document.getElementById('resultBoard')
        p.innerHTML = data;

        if (data == '¡Ganaste!')
            p.style.backgroundColor = 'green';
        else if (data == '¡Perdiste!')
            p.style.backgroundColor = 'red';
            else  p.style.backgroundColor = 'blue';
    }

function principal() {

    const crear = document.getElementById('crear');
    crear.addEventListener('click', startGameFunction);
    const unir = document.getElementById('unir');
    unir.addEventListener('click', startGameFunction);

    socket.on('startGame', (datos) => {iniciar(datos,crear,unir)})

    socket.on('joinGame',(datos) =>{unirse(datos,unir)})

    socket.on('fichaJugada', (datos) => {
        mostrarTurno(datos.turn)
        dibujarFichas(datos.board);
        mostrarScore (datos.score.scoreNegro,datos.score.scoreBlanco)
        mostrarFichas(datos.fichas)
    });

    socket.on ('matchFound',(datos) => matchFound(datos));

    socket.on ('gameOver',(data) => gameOver(data));
}