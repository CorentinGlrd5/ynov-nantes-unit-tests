function minesweeper(input) {
  let splitted = input.split(/[0-9 ]+/gm);
  let count = 0;
  for (let step = 0; step < splitted.length; step++) {
    if (splitted[step] !== "") {
      count++;
      splitted.splice(step - 1, 0, `Field #${count}:`);
    }
  }
  return splitted.join("");
}

module.exports = {
  minesweeper,
};
