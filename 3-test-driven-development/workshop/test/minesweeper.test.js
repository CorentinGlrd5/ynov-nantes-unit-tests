const { minesweeper } = require("../src/minesweeper");

describe("minesweeper", function () {
  it("For each field, you must print the following message in a line alone", function () {
    const input = "4 4*........*......3 5**.........*...0 0";
    const result = minesweeper(input);
    console.log(result);
    expect(result.substring(0, 9)).toBe("Field #1:");
  });

  it("1er cas, checker que dans le input on a les deux entier, puis des * et des ., si il y a autre chose ça pete", function () {});

  it("2eme cas, checker que les deux entier soit superieur de 0 et infierieur de 100", function () {});

  it("3eme cas, checker que les * et . font la taille de ligne et de colomne egale au entier qu'il les definissent", function () {});
});
