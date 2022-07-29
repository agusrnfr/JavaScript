const calculateWinner = (scoreNegro,scoreBlanco) => {
    if (scoreNegro > scoreBlanco) {
      return 1;
    }
    else
      if (scoreNegro < scoreBlanco) {
        return 2;
      }
      else {
        return 0;
      }
  }
  
  const makeAMove = (i, j, color,board,turn,fichasNegro,fichasBlanco) => { //RETORNA EL TABLERO CON EL MOVIMIENTO SI ES QUE SE REALIZO Y EL TURNO 
    let ok = false;                               // Y UN BOOLEAN QUE DICE SI SE REALIZO O NO MOVIMIENTO
    if (validation(i, j, color,board) == true) {
      if (board[i][j] == 0){
        let piezasAfectadas = getAffected(i, j, color,board)
        flipAffected(piezasAfectadas,board)
        board[i][j] = color;
        turn += 1;
        ok = true;
        if (color == 1)
          fichasNegro--
        else if (color == 2)
          fichasBlanco--
      }
    }
    return {
        board: board,
        turn: turn,
        fichasNegro:fichasNegro,
        fichasBlanco:fichasBlanco,
        ok: ok
  }
}
  
  const canPlay = (color,board) => { //RETORNA SI EL COLOR PUEDE REALIZAR UN MOVIMIENTO 
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if ((validation(i, j, color, board) == true) && (board[i][j]) == 0) {
          console.log(i, j) //LO USO PARA TESTEAR EL JUEGO Y SABER DONDE CLICKEAR
          return true;
        }
      }
    }
    return false;
  }
  
  const calculateScore = (board) => { //RETORNA EL SCORE
    let scoreNegro = 0;
    let scoreBlanco = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (board[i][j] == 1)
          scoreNegro += 1
        else if (board[i][j] == 2)
          scoreBlanco += 1
      }
    }
    return {
        scoreNegro: scoreNegro,
        scoreBlanco: scoreBlanco
    }
  }
  
  const validation = (i, j, color, board) => { //RETORNA SI SE PUEDE HACER UN MOVIMIENTO EN LA CELDA
    let piezasAfectadas = getAffected(i, j, color, board);
    if (piezasAfectadas.length == 0)
      return false
    else
      return true;
  }
  
  const getAffected = (i, j, color, board) => { //RETORNA LISTA DE AFECTADOS
    let listaAfectados = [];
  
    //derecha
    let posibleAfectado = []
    let dj = j;
    while (dj < 7) {
      dj += 1;
      let value = board[i][dj];
      if (value == 0 || value == color) {
        if (value == color) {
          listaAfectados = listaAfectados.concat(posibleAfectado)
        }
        break;
      }
      else {
        let coordenadas = { i: i, j: dj }
        posibleAfectado.push(coordenadas)
      }
    }
  
    //izquierda
    posibleAfectado = []
    dj = j;
    while (dj > 0) {
      dj -= 1;
      let value = board[i][dj];
      if (value == 0 || value == color) {
        if (value == color) {
          listaAfectados = listaAfectados.concat(posibleAfectado)
        }
        break;
      }
      else {
        let coordenadas = { i: i, j: dj }
        posibleAfectado.push(coordenadas)
      }
    }
    //abajo
    posibleAfectado = []
    let di = i;
    while (di < 7) {
      di += 1;
      let value = board[di][j];
      if (value == 0 || value == color) {
        if (value == color) {
          listaAfectados = listaAfectados.concat(posibleAfectado)
        }
        break;
      }
      else {
        let coordenadas = { i: di, j: j }
        posibleAfectado.push(coordenadas)
      }
    }
  
    //arriba
    posibleAfectado = []
    di = i;
    while (di > 0) {
      di -= 1;
      let value = board[di][j];
      if (value == 0 || value == color) {
        if (value == color) {
          listaAfectados = listaAfectados.concat(posibleAfectado)
        }
        break;
      }
      else {
        let coordenadas = { i: di, j: j }
        posibleAfectado.push(coordenadas)
      }
    }
  
    //abajo derecha
    posibleAfectado = []
    di = i;
    dj = j
    while ((di < 7) && (dj < 7)) {
      di += 1;
      dj += 1;
      let value = board[di][dj];
      if (value == 0 || value == color) {
        if (value == color) {
          listaAfectados = listaAfectados.concat(posibleAfectado)
        }
        break;
      }
      else {
        let coordenadas = { i: di, j: dj }
        posibleAfectado.push(coordenadas)
      }
    }
  
    //abajo izquierda
    posibleAfectado = []
    di = i;
    dj = j
    while ((di < 7) && (dj > 0)) {
      di += 1;
      dj -= 1;
      let value = board[di][dj];
      if (value == 0 || value == color) {
        if (value == color) {
          listaAfectados = listaAfectados.concat(posibleAfectado)
        }
        break;
      }
      else {
        let coordenadas = { i: di, j: dj }
        posibleAfectado.push(coordenadas)
      }
    }
  
    //arriba izquierda
    posibleAfectado = []
    di = i;
    dj = j
    while ((di > 0) && (dj > 0)) {
      di -= 1;
      dj -= 1;
      let value = board[di][dj];
      if (value == 0 || value == color) {
        if (value == color) {
          listaAfectados = listaAfectados.concat(posibleAfectado)
        }
        break;
      }
      else {
        let coordenadas = { i: di, j: dj }
        posibleAfectado.push(coordenadas)
      }
    }
  
    //arriba derecha
    posibleAfectado = []
    di = i;
    dj = j
    while ((di > 0) && (dj < 7)) {
      di -= 1;
      dj += 1;
      let value = board[di][dj];
      if (value == 0 || value == color) {
        if (value == color) {
          listaAfectados = listaAfectados.concat(posibleAfectado)
        }
        break;
      }
      else {
        let coordenadas = { i: di, j: dj }
        posibleAfectado.push(coordenadas)
      }
    }
    return listaAfectados;
  }
  
  const flipAffected = (piezasAfectadas,board) => { //RETORNA TABLERO CON LAS PIEZAS DADAS VUELTAS
    for (let i = 0; i < piezasAfectadas.length; i++) {
      var pos = piezasAfectadas[i];
      if (board[pos.i][pos.j] == 1) {
        board[pos.i][pos.j] = 2
      }
      else
        board[pos.i][pos.j] = 1
    }
    return board; 
  }
  
  const validationTurn = (color,turn) => { //RETORNA SI ES EL TURNO DEL QUE REALIZO EL MOVIMIENTO
    if (color == 1) {
      if (turn % 2 == 0) return true;
      else return false;
    }
    else
      if (color == 2) {
        if (turn % 2 == 1) return true;
        else return false;
      }
  }

  const tieneFichas = (color,fichas) => {
    if (color == 1) {
      if (fichas.fichasNegro == 0) {
        return false;
      }
    }
    else if (color == 2) {
      if (fichas.fichasBlanco == 0) {
        return false;
      }
    }
    return true;
  }

  const oponenteTieneFichas = (color,fichas) =>{
    if (color == 1) {
      if (fichas.fichasBlanco == 0) {
        return false;
      }
    }
    else if (color == 2) {
      if (fichas.fichasNegro == 0) {
        return false;
      }
    }
    return true;
  }

  module.exports = {
    validationTurn,
    calculateScore,
    calculateWinner,
    canPlay,
    makeAMove,
    tieneFichas,
    oponenteTieneFichas
  }