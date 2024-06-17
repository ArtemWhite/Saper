function createBoard(width, height) {
    const board = document.createElement("table");
    board.setAttribute("class", "board");
  
    for (let y = 0; y < height; y++) {
      const row = document.createElement("tr");
  
      for (let x = 0; x < width; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("class", "cell");
        row.appendChild(cell);
      }
  
      board.appendChild(row);
    }
  
    return board;
  }
  
  const game = document.getElementById("game");
  game.appendChild(createBoard(10, 10));
    
  let mines = [];
  let minesLeft = 10;

function addMines(width, height) {
  while (mines.length < 10) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);

    if (!mines.some(([mx, my]) => mx === x && my === y)) {
      mines.push([x, y]);
    }
  }
}
function reveal(row, col, board) {
    // Проверяем, что координаты находятся в пределах игрового поля
    if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) {
      return;
    }
  
    // Получаем значение ячейки
    var cell = board[row][col];
  
    // Если ячейка уже была открыта или помечена флагом, выходим
    if (cell.isOpen || cell.isFlagged) {
      return;
    }
  
    // Открываем ячейку и обновляем ее значение на доске
    cell.isOpen = true;
    board[row][col] = cell;
  
    // Если ячейка содержит минон, возвращаем "X"
    if (cell.isMine) {
      return "X";
    }
  
    // Если ячейка не содержит минон, но рядом с ней есть мины, возвращаем количество мин вокруг ячейки
    if (cell.nearbyMines > 0) {
      return cell.nearbyMines;
    }
  
    // Если ячейка пустая, рекурсивно открываем соседние ячейки
    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        reveal(row + i, col + j, board);
      }
    }
  }