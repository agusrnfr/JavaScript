const sb = require('./sharedBack')

function createDataRoom(room, file) { //creo sala en JSON
    let data = {
      board: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]],
      score: {
        scoreNegro: 0,
        scoreBlanco: 0
      },
      fichas:{
        fichasNegro:30,
        fichasBlanco:30
      },
      turn: 0,
      room: room,
      players: []
    }
    sb.addArrayJSON(data, file);
  }
  
  function pushearJugadorSala(room, id, file) { //agrego jugador a la sala
    let data = sb.searchLastGame(room, file);
    data.players.push(id);
    sb.addArrayJSON(data, file);
  }

module.exports = {createDataRoom, pushearJugadorSala}