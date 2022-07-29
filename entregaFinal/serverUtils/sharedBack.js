const fs = require('fs');

function addArrayJSON(data, file) { //agrego datos a JSON
    let boardArray = JSON.parse(fs.readFileSync(file)) //DEBE YA ESTAR EL ARRAY EN EL JSON.
    boardArray.push(data);
    let arr = JSON.stringify(boardArray, 2, null)
    fs.writeFileSync(file, arr);
  }
  
  function searchLastGame(room, file) { //busco ultima partida de la sala
    let boardArray = JSON.parse(fs.readFileSync(file))
    let newAr = boardArray.filter((data => data.room == room));
    return newAr[newAr.length - 1];
  }

module.exports = {addArrayJSON , searchLastGame}