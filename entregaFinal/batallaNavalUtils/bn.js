function checkBoard(board) {
  let count = 0;
  if (board.length == 10) {
    for (let i = 0; i <= 9; i++) {
      if (board.length == 10) {
        for (let j = 0; j <= 9; j++) {
          if (board[i][j] == 1)
            count += 1
        }
      }
      else return false
    }
  }
  else return false
  return count == 10 ? true : false
}

// tablero ataque
// 1 = agua
// 2 = le pegue a un barco

// tablero barcos Enemigo
// 3 = agua
// 2 = barco tocado


function attack(hitCount, tableroAtaque, tableroEnemigo, i, j, turn) {
  if (tableroAtaque[i][j] == 0) {
    turn++;
    if (tableroEnemigo[i][j] == 0) {
      tableroEnemigo[i][j] = 3; 
      tableroAtaque[i][j] = 1; //si le pego al agua
    } else if (tableroEnemigo[i][j] == 1) {
      tableroEnemigo[i][j] = 2;
      tableroAtaque[i][j] = 2; //si le pego al barco
      hitCount++; //aumento el hitcount
    }
  }
  return {
    hitCount, //envio el hitcount del jugador que realiza el ataque 
    tableroAtaque,
    tableroEnemigo,
    turn
  }
}

const validationTurn = (player, turn) => { //RETORNA SI ES EL TURNO DEL QUE REALIZO EL MOVIMIENTO
  if (player == 0) {
    if (turn % 2 == 0) return true;
    else return false;
  }
  else
    if (player == 1) {
      if (turn % 2 == 1) return true;
      else return false;
    }
}

function calculateWinner(turn, scoreJugador1, scoreJugador2) {
  if ((turn % 2 == 0) && (scoreJugador1 == 10 && scoreJugador2 < 10)) //TUVIERON LA MISMA CANTIDAD DE TURNOS Y GANO EL JUGADOR 1
    return 0
  else
    if ((turn % 2 == 0) && (scoreJugador1 < 10 && scoreJugador2 == 10))
      return 1
    else
      if ((turn % 2 == 0) && (scoreJugador1 == 10 && scoreJugador2 == 10)) //TUVIERON LA MISMA CANTIDAD DE TURNOS Y EMPATARON
        return 2
  return -1; //TODAVIA NO GANO NINGUNO
}

module.exports = { checkBoard, attack, validationTurn, calculateWinner }