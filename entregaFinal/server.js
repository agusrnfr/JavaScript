const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bodyParser = require('body-parser');

const bn = require('./batallaNavalUtils/bn')
const reversi = require('./reversiUtils/reversi');

const bnBack = require('./serverUtils/bnBack')
const reversiBack = require('./serverUtils/reversiBack')
const sharedBack = require('./serverUtils/sharedBack')


//----------------------------------------------------------------------------------------------------------------------//

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  if (req.body.juego == "reversi")
    res.redirect('/reversi')
  else
    res.redirect('/batallaNaval')
  res.end();
})

app.get('/informacion', (req, res) => {
  res.sendFile(__dirname + '/public/information/information.html');
  res
});


app.get('/reversi', (req, res) => {
  res.sendFile(__dirname + '/public/reversi/reversi.html');
});

app.get('/batallaNaval', (req, res) => {
  res.sendFile(__dirname + '/public/batallaNaval/batallaNaval.html');
})

//Conexion Batalla Naval
//----------------------------------------------------------------------------------------------------------------------/
app.get('/batallaNaval/crear', (req, res) => {
  let file = 'batallaNavalUtils/bn.json'
  let randomRoom = (Math.random() + 1).toString(36).substring(7)
  let id = (Math.random() + 1).toString(36).substring(7)
  bnBack.createBatallaNavalRoom(randomRoom, file); // crea sala en json
  bnBack.pushearJugadorBatalla(randomRoom, id, file) //agrega al jugador
  res.json({
    user: id,
    room: randomRoom,
  })
})

app.get('/batallaNaval/unirse', (req, res) => {
  let file = 'batallaNavalUtils/bn.json'
  let id = (Math.random() + 1).toString(36).substring(7)
  let last = sharedBack.searchLastGame(req.query.sala, file); //OBTENGO EL ULTIMO JUEGO DE LA SALA
  let respuesta;     //DATO A ENVIAR POR SERVIDOR

  if (last != undefined) { //SI EXISTE LA SALA
    if (last.players.length < 2) { //SI LA SALA EXISTENTE NO ESTA LLENA
      bnBack.pushearJugadorBatalla(req.query.sala, id, file)
      respuesta = {
        user: id,
        room: req.query.sala,
      }
    }
    else { //SI LA SALA EXISTENTE ESTA LLENA
      respuesta = {
        user: id,
        room: 'fullRoom',
      }
    }
  }
  else {  //SI NO EXISTE LA SALA
    respuesta = {
      user: id,
      room: 'non-existing room'
    }
  }
  res.json(respuesta);
})

app.post('/enviarBarcos', (req, res) => {
  let file = 'batallaNavalUtils/bn.json'
  let board = req.body.tablero
  let id = req.body.usuario.user
  let room = req.body.usuario.room
  if (bn.checkBoard(board) == true) {
    bnBack.addBoard(room, id, board, file)
    res.send('Barco Enviado')
  }
  else {
    console.log('err')
    res.statusMessage = "Tablero Invalido";
    res.status(400).end();
  }
})

app.post('/enviarAtaque', (req, res) => {
  let file = 'batallaNavalUtils/bn.json'
  let lastGame = sharedBack.searchLastGame(req.body.usuario.room, file)
  if ((lastGame != undefined) && (lastGame.players.length == 2) && (lastGame.ganador == -1)) {
    let { jugador, indiceJugador } = bnBack.searchPlayer(lastGame, req.body.usuario.user)
    let { oponente, indiceOponente } = bnBack.searchOpponent(lastGame, req.body.usuario.user)
    if ((indiceJugador != -1) && (bn.validationTurn(indiceJugador, lastGame.turn)) && (oponente.tableroBarco.length != 0)) {
      let { hitCount, tableroAtaque, tableroEnemigo, turn } = bn.attack(jugador.hitCount, jugador.tableroAtaque, oponente.tableroBarco, req.body.fila, req.body.columna, lastGame.turn)
      lastGame.players[indiceJugador].hitCount = hitCount;
      lastGame.players[indiceJugador].tableroAtaque = tableroAtaque;
      lastGame.players[indiceOponente].tableroBarco = tableroEnemigo;
      lastGame.turn = turn;
      lastGame.ganador = bn.calculateWinner(turn, lastGame.players[0].hitCount, lastGame.players[1].hitCount)
      sharedBack.addArrayJSON(lastGame, file)
      res.status(200).json({
        "tableroAtaque": tableroAtaque,
        "hitCount": hitCount
      })
    } else {
      console.log('err')
      res.statusMessage = "No se puedo realizar el ataque";
      res.status(400).end();
    }
  } else {
    console.log('err')
    res.statusMessage = "No se puede realizar ataques en la sala";
    res.status(400).end();
  }
})

app.get('/batallaNaval/obtenerTablero', (req, res) => {
  let file = 'batallaNavalUtils/bn.json'
  let lastGame = sharedBack.searchLastGame(req.query.sala, file)
  if (lastGame != undefined) {
    if (lastGame.players.length == 2) {
      let { jugador, indiceJugador } = bnBack.searchPlayer(lastGame, req.query.id)
      if (indiceJugador != -1) {
        let { indiceOponente } = bnBack.searchOpponent(lastGame, req.query.id)
        if (lastGame.players[indiceOponente].tableroBarco.length != 0) {
          let turno = (lastGame.turn % 2) + 1;
          res.status(200).json({
            "board": jugador.tableroBarco,
            "ganador": lastGame.ganador,
            "turno": turno
          })
        } else {
          res.statusMessage = "Esperando tablero oponente"
          console.log(res.statusMessage)
          res.status(400).end()
        }
      } else {
        res.statusMessage = "No existe indice del jugador"
        console.log(res.statusMessage)
        res.status(400).end()
      }
    } else {
      res.statusMessage = "No se encuentra contrincante"
      console.log(res.statusMessage)
      res.status(400).end()
    }
  } else {
    res.statusMessage = "No se encuentra sala"
    console.log(res.statusMessage)
    res.status(400).end()
  }
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});

//Conexion Reversi
//----------------------------------------------------------------------------------------------------------------------/

const emitWinner = (io, players, score) => {
  let ganador = reversi.calculateWinner(score.scoreNegro, score.scoreBlanco);
  let jugador1 = players[0];
  let jugador2 = players[1];

  if (ganador == 1) {
    console.log('GANO 1 ')
    io.to(jugador1).emit('gameOver', '¡Ganaste!');
    io.to(jugador2).emit('gameOver', '¡Perdiste!');
  }
  else
    if (ganador == 2) {
      console.log('GANO 2 ')
      io.to(jugador2).emit('gameOver', '¡Ganaste!');
      io.to(jugador1).emit('gameOver', '¡Perdiste!');
    }
    else {
      console.log('EMPATE ')
      io.to(jugador1).emit('gameOver', 'Empate');
      io.to(jugador2).emit('gameOver', 'Empate');
    }
}

io.on('connection', (socket) => {

  //UNION PLAYER 1 (CREACION DE SALA)
  socket.on('startGame', (randomRoom) => {
    let file = 'reversiUtils/reversiData.json';
    reversiBack.createDataRoom(randomRoom, file);
    reversiBack.pushearJugadorSala(randomRoom, socket.id, file)
    socket.join(randomRoom);
    socket.emit('startGame', {
      user: socket.id,
      room: randomRoom,
    });
  })

  //UNION PLAYER 2
  socket.on('joinGame', (room) => {
    let file = 'reversiUtils/reversiData.json';
    let res = sharedBack.searchLastGame(room, file); //OBTENGO EL ULTIMO JUEGO DE LA SALA
    let resp;     //DATO A ENVIAR POR SERVIDOR

    if (res != undefined) { //SI EXISTE LA SALA
      socket.join(room);
      if (res.players.length < 2) { //SI LA SALA EXISTENTE NO ESTA LLENA
        reversiBack.pushearJugadorSala(room, socket.id, file)
        resp = {
          user: socket.id,
          room: room,
        }
        io.in(room).emit('matchFound', res.board)
      }
      else { //SI LA SALA EXISTENTE ESTA LLENA
        resp = {
          user: socket.id,
          room: 'fullRoom',
        }
        socket.leave(room);
        console.log('a user leave the room')
      }
    }
    else {  //SI NO EXISTE LA SALA
      resp = {
        user: socket.id,
        room: 'non-existing room'
      }
    }
    socket.emit('joinGame', resp)
  })

  //FICHA JUGADA
  socket.on('fichaJugada', (data) => {
    let file = 'reversiUtils/reversiData.json';
    let lastGame = sharedBack.searchLastGame(data.room, file) //obtengo ultimaPartida de la sala 
    let coordenadas = data.id.slice(4).split('_') //obtengo coordenadas del movimiento

    if (lastGame != undefined) {
      let color = lastGame.players.indexOf(socket.id) + 1; //obtengo color correspondiente al jugador que realizo el movimiento
      if (lastGame.players.length == 2) { //puedo realizar un movimiento si son dos jugadores.
        if (reversi.validationTurn(color, lastGame.turn)) { //si no es su turno no se hace ningun movimiento
          if (reversi.canPlay(color, lastGame.board) && reversi.tieneFichas(color,lastGame.fichas)) {
            let res = reversi.makeAMove(coordenadas[0] - 1, coordenadas[1] - 1, color, lastGame.board, lastGame.turn, lastGame.fichas.fichasNegro, lastGame.fichas.fichasBlanco)

            lastGame.turn = res.turn;   //actualizo turno
            lastGame.board = res.board; //actualizo tablero
            lastGame.fichas.fichasNegro = res.fichasNegro;
            lastGame.fichas.fichasBlanco = res.fichasBlanco;
            lastGame.score = reversi.calculateScore(lastGame.board) //actualizo score

            if (res.ok == true) {
              sharedBack.addArrayJSON(lastGame, file) // agrego JSON la ultima jugada
              io.in(data.room).emit('fichaJugada', lastGame);
            }

            if (lastGame.fichas.fichasNegro == 0 && lastGame.fichas.fichasBlanco == 0)
              emitWinner(io, lastGame.players, lastGame.score); //chequeo si ese movimimiento fue el ultimo permitido
          }
          else {
            if (!reversi.canPlay(color, lastGame.board) && !reversi.oponenteTieneFichas(color,lastGame.fichas)) { // SI NO PUEDO JUGAR O NO TENGO FICHAS Y EL OTRO JUGADOR NO TIENE FICHAS, TERMINA EL JUEGO |
              //*NOTA: No existe la posibilidad que no tenga fichas y su oponente tampoco ya que se tendria que haber emitido ganador en la linea 280   
              emitWinner(io, lastGame.players, lastGame.score);
                }
              else if (!reversi.canPlay(color, lastGame.board) || !reversi.tieneFichas(color,lastGame.fichas)) { // SI NO PUEDO JUGAR  O NO TENGO FICHAS Y EL OTRO JUGADOR TIENE FICHAS, PASA A SER SU TURNO
                lastGame.turn++;
                sharedBack.addArrayJSON(lastGame, file);
                io.in(data.room).emit('fichaJugada', lastGame);
              }
            }
          }
        }
      }
  });


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});
