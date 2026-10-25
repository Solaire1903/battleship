import Gameboard from "../gameboard.js";

describe("Function Test: placeNewShip", () => {
  const gameboard = new Gameboard();
  const emptyRow = ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E"];

  test("Initial Coordinates are out of range", () => {
    gameboard.placeNewShip(-1, -1, "horizontal", 3);
    gameboard.placeNewShip(10, 10, "horizontal", 3);
    gameboard.placeNewShip(-1, 5, "horizontal", 3);
    gameboard.placeNewShip(10, 5, "horizontal", 3);
    gameboard.placeNewShip(5, -1, "horizontal", 3);
    gameboard.placeNewShip(5, 10, "horizontal", 3);

    gameboard.board.forEach((row) => {
      expect(row).toEqual(emptyRow);
    });
  });

  test("Ship is too long to fit on the board", () => {
    gameboard.placeNewShip(0, 0, "horizontal", 11);
    gameboard.placeNewShip(0, 0, "vertical", 11);
    gameboard.placeNewShip(7, 7, "horizontal", 5);
    gameboard.placeNewShip(7, 7, "vertical", 5);

    gameboard.board.forEach((row) => {
      expect(row).toEqual(emptyRow);
    });
  });

  test("Place ship correctly", () => {
    gameboard.placeNewShip(0, 0, "horizontal", 5);
    expect(gameboard.board[0]).toEqual([
      "1",
      "1",
      "1",
      "1",
      "1",
      "E",
      "E",
      "E",
      "E",
      "E",
    ]);

    gameboard.placeNewShip(9, 5, "horizontal", 5);
    expect(gameboard.board[9]).toEqual([
      "E",
      "E",
      "E",
      "E",
      "E",
      "2",
      "2",
      "2",
      "2",
      "2",
    ]);

    gameboard.placeNewShip(0, 9, "vertical", 5);
    for (let i = 0; i < 5; i++) {
      expect(gameboard.board[i][9]).toBe("3");
    }

    gameboard.placeNewShip(5, 0, "vertical", 5);
    for (let i = 5; i < 10; i++) {
      expect(gameboard.board[i][0]).toBe("4");
    }

    gameboard.placeNewShip(4, 3, "horizontal", 3);
    expect(gameboard.board[4]).toEqual([
      "E",
      "E",
      "E",
      "5",
      "5",
      "5",
      "E",
      "E",
      "E",
      "3",
    ]);

    gameboard.placeNewShip(4, 8, "vertical", 3);
    for (let i = 4; i < 7; i++) {
      expect(gameboard.board[i][8]).toBe("6");
    }
  });

  test("Try to place ship on occupied space", () => {
    gameboard.placeNewShip(0, 0, "horizontal", 3);
    gameboard.placeNewShip(0, 4, "horizontal", 3);
    gameboard.placeNewShip(0, 7, "horizontal", 3);
    expect(gameboard.board[0]).toEqual([
      "1",
      "1",
      "1",
      "1",
      "1",
      "E",
      "E",
      "E",
      "E",
      "3",
    ]);

    gameboard.placeNewShip(5, 0, "vertical", 3);
    gameboard.placeNewShip(7, 6, "vertical", 3);
    gameboard.placeNewShip(6, 8, "vertical", 3);
    for (let i = 5; i < 7; i++) {
      expect(gameboard.board[i][0]).toBe("4");
    }
    expect(gameboard.board[6]).toEqual([
      "4",
      "E",
      "E",
      "E",
      "E",
      "E",
      "E",
      "E",
      "6",
      "E",
    ]);
    expect(gameboard.board[9]).toEqual([
      "4",
      "E",
      "E",
      "E",
      "E",
      "2",
      "2",
      "2",
      "2",
      "2",
    ]);
  });
});

describe("Function Test: receiveAttack", () => {
  const gameboard = new Gameboard();
  gameboard.placeNewShip(0, 0, "horizontal", 5);
  gameboard.placeNewShip(9, 5, "horizontal", 5);

  test("Attack is out of bounds", () => {
    gameboard.receiveAttack(0, 10);
    gameboard.receiveAttack(0, -1);
    expect(gameboard.board[0]).toEqual([
      "1",
      "1",
      "1",
      "1",
      "1",
      "E",
      "E",
      "E",
      "E",
      "E",
    ]);
  });

  test("Attack hits an empty spot", () => {
    gameboard.receiveAttack(0, 7);
    gameboard.receiveAttack(0, 9);
    expect(gameboard.board[0]).toEqual([
      "1",
      "1",
      "1",
      "1",
      "1",
      "E",
      "E",
      "X",
      "E",
      "X",
    ]);

    gameboard.receiveAttack(9, 0);
    expect(gameboard.board[9]).toEqual([
      "X",
      "E",
      "E",
      "E",
      "E",
      "2",
      "2",
      "2",
      "2",
      "2",
    ]);
  });

  test("Attack hits a ship", () => {
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 2);
    expect(gameboard.board[0]).toEqual([
      "O",
      "1",
      "O",
      "1",
      "1",
      "E",
      "E",
      "X",
      "E",
      "X",
    ]);
    expect(gameboard.activeShips[0].hitsTaken).toBe(2);

    gameboard.receiveAttack(9, 9);
    expect(gameboard.board[9]).toEqual([
      "X",
      "E",
      "E",
      "E",
      "E",
      "2",
      "2",
      "2",
      "2",
      "O",
    ]);
    expect(gameboard.activeShips[1].hitsTaken).toBe(1);
  });
});
