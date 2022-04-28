function minesweeper(board) {
  let result = [];
  for (let i = 0; i < board.length; i++) {
    let row = [];
    for (let j = 0; j < board[i].length; j++) {
      let count = 0;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (
            i + x >= 0 &&
            i + x < board.length &&
            j + y >= 0 &&
            j + y < board[i].length
          ) {
            if (board[i + x][j + y] === "*") {
              count++;
            }
          }
        }
      }
      if (board[i][j] === "*") {
        row.push("*");
      } else {
        row.push(count);
      }
    }
    result.push(row);
  }
  return result.map((row) => row.join("")).join("\n");
}

function parseString(input) {
  let fields = input.split(/[0-9 ]+/g).filter((field) => field);
  let sizes = input.match(/[0-9 ]+/g);
  sizes.pop();
  const hints = fields.map((field, i) => {
    let array = field.split("");
    let board = [];
    let size = parseInt(sizes[i][2]);
    for (let x = 0; x < array.length; x += size) {
      let line = array.slice(x, x + size);
      board.push(line);
    }
    let result = minesweeper(board);
    return `Field #${i + 1}:\n${result}\n`;
  });
  return hints.join("");
}

console.log(parseString("4 4*........*......3 5**.........*...0 0"));

module.exports = {
  minesweeper,
};
