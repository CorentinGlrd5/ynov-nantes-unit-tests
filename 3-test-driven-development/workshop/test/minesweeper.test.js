const { minesweeper } = require("../src/minesweeper");

describe("minesweeper", function () {
  it("1er cas, checker que dans le input on a les deux entier, si il y a autre chose ça pete", () => {
    const inputWhenNotTwoWhole = "y z*........*......3 5**.........*...0 0";
    expect(() => {
      minesweeper(inputWhenNotTwoWhole);
    }).toThrow();
  });

  it("2eme cas, checker que dans le input on a les deux entier, puis des *, si il y a autre chose ça pete", () => {
    const inputWhenNotAsterisk = "4 4*........z......3 5**.........5...0 0";
    expect(() => {
      minesweeper(inputWhenNotAsterisk);
    }).toThrow();
  });

  it("3eme cas, checker que dans le input on a les deux entier, puis des * et des ., si il y a autre chose ça pete", () => {
    const inputWhenNotPoint = "4 4*...z....*......3 5**....5....*...0 0";
    expect(() => {
      minesweeper(inputWhenNotPoint);
    }).toThrow();
  });

  it("4eme cas, checker que les deux entier soit superieur de 0", function () {
    const inputWhenFirstWholeIsNegative =
      "-1 4*........*......3 -5**.........*...0 0";
    expect(() => {
      minesweeper(inputWhenFirstWholeIsNegative);
    }).toThrow();
  });

  it("5eme cas, checker que les deux entier soit infierieur ou égale de 100", function () {
    const inputWhenFirstWholeToBeLessThanOrEqualAt100 =
      "4 105*........*......110 5**.........*...0 0";
    expect(() => {
      minesweeper(inputWhenFirstWholeToBeLessThanOrEqualAt100);
    }).toThrow();
  });

  it("6eme cas, checker que les * et . font la taille de ligne et de colomne defini par les deux entier", function () {
    const inputWhenAsteriskAndPointEqualeToTwoWholeValue =
      "4 4*........*...3 5**.........*........0 0";
    expect(() => {
      minesweeper(inputWhenAsteriskAndPointEqualeToTwoWholeValue);
    }).toThrow("Invalid map size");
  });

  it("7eme cas, checker qu'avec la valeur du input on obtient la bonne valeur en output", function () {
    const input = "4 4*........*......3 5**.........*...0 0";
    const output =
      "Field #1:\n*100\n2210\n1*10\n1110\nField #2:\n**100\n33200\n1*100\n";
    const result = minesweeper(input);
    expect(result).toBe(output);
  });
});
