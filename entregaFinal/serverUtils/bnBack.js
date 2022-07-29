const sb = require('./sharedBack')

function createBatallaNavalRoom(room, file) {
    let data = {
      players: [],
      ganador: -1, // si es 0 gano el jugador 1 y si es 1 gano el jugador 2, si esta en 2 empate
      room: room,
      turn: 0,  //si el turno es par, va el jugador 1, si es impar el jugador 2
    }
    sb.addArrayJSON(data, file);
  }
  
  function pushearJugadorBatalla(room, id, file) {
    let data = sb.searchLastGame(room, file);
    data.players.push({
      id: id,
      tableroBarco: [],
      tableroAtaque: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      hitCount: 0,
    })
    sb.addArrayJSON(data, file);
  }

  function addBoard(room, id, board, file) {
    let last = sb.searchLastGame(room, file)
    if (last != undefined) {
      let jugador = last.players.findIndex((e) => e.id == id)
      if (jugador != undefined) {
        if (last.players[jugador].tableroBarco.length == 0) {
          last.players[jugador].tableroBarco = board;
          sb.addArrayJSON(last, file)
        }
      }
    }
  }

  function searchPlayer(lastGame, id) {
    let indiceJugador = lastGame.players.findIndex((e) => e.id == id)
    let jugador = lastGame.players.find((e) => e.id == id)
    return {
      jugador,
      indiceJugador
    };
  }
  
  function searchOpponent(lastGame, id) {
    let indiceOponente = lastGame.players.findIndex((e) => e.id != id)
    let oponente = lastGame.players.find((e) => e.id != id)
    return {
      oponente,
      indiceOponente
    }
  }

module.exports = { createBatallaNavalRoom, pushearJugadorBatalla, addBoard, searchPlayer, searchOpponent}