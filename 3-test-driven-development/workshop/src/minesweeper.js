function hintNumbers(board) {
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

function minesweeper(input) {
  let splitted = input.split(/[0-9 ]+/g).filter((field) => field);
  let sizes = input.match(/[0-9 ]+/g);
  let fields = splitted.map((field, i) => {
    let array = field.split("");
    if (array.length !== sizes[i][0] * sizes[i][2]) {
      throw new Error("Invalid map size");
    }
    array.forEach((char) => {
      if (char !== "*" && char !== ".") {
        throw new Error("Invalid character");
      }
    });
    return array;
  });
  sizes.forEach((size, i) => {
    if (size[0] == 0 && size[2] == 0) {
      sizes.splice(i, 1);
    } else if (
      size[0] > 0 &&
      size[0] <= 100 &&
      size[2] > 0 &&
      size[2] <= 100 &&
      parseInt(size[0]) !== NaN &&
      parseInt(size[2]) !== NaN
    ) {
      return;
    } else {
      throw new Error("Invalid input");
    }
  });
  const hints = fields.map((field, i) => {
    let board = [];
    let size = parseInt(sizes[i][2]);
    for (let x = 0; x < field.length; x += size) {
      let line = field.slice(x, x + size);
      board.push(line);
    }
    let result = hintNumbers(board);
    return `Field #${i + 1}:\n${result}\n`;
  });
  return hints.join("");
}

console.log(minesweeper("4 4*........*......3 5**.........*...0 0"));

module.exports = {
  minesweeper,
};
