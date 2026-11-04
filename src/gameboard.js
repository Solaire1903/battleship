import Ship from "./ship.js";
import getRandomInt from "./random-number.js";

/**
 * Represents a player's gameboard
 */
class Gameboard {
  /**
   * Constructor
   */
  constructor() {
    this.board = this.#createNewBoard();
    this.ships = [];
  }

  /**
   * Places a new ship on the given coordinates, if possible,
   * and adds it to the list of ships
   * @param {Number} y The y coordinate
   * @param {Number} x The x coordinate
   * @param {Boolean} isHorizontal Should be true if the ship is to be placed
   * horizontally
   * @param {Number} shipLength The length of the ship
   * @return True if ship was successfully placed, false otherwise
   */
  placeNewShip(y, x, isHorizontal, shipLength) {
    if (!this.#canPlaceShip(y, x, isHorizontal, shipLength)) return false;

    const shipNumber = (this.ships.length + 1).toString();
    if (isHorizontal) {
      for (let i = 0; i < shipLength; i++) {
        this.board[y][x + i] = shipNumber;
      }
    } else {
      for (let i = 0; i < shipLength; i++) {
        this.board[y + i][x] = shipNumber;
      }
    }

    this.ships.push(new Ship(shipLength, shipNumber));
    return true;
  }

  /**
   * Places all ships in random locations, until the board has 5 ships.
   * Only works when there are no ships on the board yet
   */
  placeAllShipsRandomly() {
    if (this.ships.length !== 0) return;

    let shipLength = 2;
    while (this.ships.length < 5) {
      const randomY = getRandomInt(0, 9);
      const randomX = getRandomInt(0, 9);
      const randomOrientation = Math.random() < 0.5;

      if (this.placeNewShip(randomY, randomX, randomOrientation, shipLength)) {
        shipLength++;

        //Keep shipLength at the third ship, because two ships of length 3 need to be placed
        if (this.ships.length === 2) shipLength--;
      }
    }
  }

  /**
   * Receives an attack on the board and registers the hit
   * to the correct ship, or the empty spot
   * @param {Number} y The y-coordinate of the attack
   * @param {Number} x The x-coordinate of the attack
   */
  receiveAttack(y, x) {
    //Coordinates are out of range
    if (x < 0 || x > 9 || y < 0 || y > 9) return;
    //Coordinate was already hit
    if (
      this.board[y][x] === "X" ||
      this.board[y][x] === "S" ||
      this.board[y][x].includes("O")
    )
      return;

    //Empty spot hit
    if (this.board[y][x] === "E") this.board[y][x] = "X";
    //Ship hit
    else {
      const hitShip = this.ships.find(
        (ship) => ship.number === this.board[y][x],
      );
      hitShip.hitsTaken++;
      this.board[y][x] = this.board[y][x].concat(",", "O");

      //Mark as sunk if it was the last cell of the ship
      if (hitShip.isSunk()) {
        this.#markShipAsSunk(hitShip.number);
      }
    }
  }

  /**
   * Checks if all ships on the board are sunk
   * @returns True if all ships are sunk, false otherwise
   */
  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }

  /**
   * Creates a new empty board with the size of 10 x 10
   * @returns The created board
   */
  #createNewBoard() {
    const board = [];
    for (let i = 0; i < 10; i++) {
      board.push([]);
    }

    board.forEach((row) => {
      for (let i = 0; i < 10; i++) {
        row.push("E");
      }
    });

    return board;
  }

  /**
   * Checks if a ship can be placed on the given coordinates
   * @param {Number} y The y coordinate
   * @param {Number} x The x coordinate
   * @param {Boolean} isHorizontal Should be true if the ship is to be placed
   * horizontally
   * @param {Number} shipLength The length of the ship
   * @returns True if the ship can be placed, false otherwise
   */
  #canPlaceShip(y, x, isHorizontal, shipLength) {
    //Coordinates out of range
    if (x < 0 || x > 9 || y < 0 || y > 9) return false;

    if (isHorizontal) {
      //Ship too long
      if (x + (shipLength - 1) > 9) return false;

      //Another ship is already occupying the space
      for (let i = 0; i < shipLength; i++) {
        if (this.board[y][x + i] !== "E") return false;
      }
    } else {
      //Ship too long
      if (y + (shipLength - 1) > 9) return false;

      //Another ship is already occupying the space
      for (let i = 0; i < shipLength; i++) {
        if (this.board[y + i][x] !== "E") return false;
      }
    }

    return true;
  }

  /**
   * Marks all cells of the ship as sunk ("S") on the board
   * @param {Number} shipNumber The number of the ship to mark as sunk
   */
  #markShipAsSunk(shipNumber) {
    let y = this.board.findIndex((row) => row.includes(`${shipNumber},O`));

    while (y !== -1) {
      const x = this.board[y].indexOf(`${shipNumber},O`);
      this.board[y][x] = "S";

      y = this.board.findIndex((row) => row.includes(`${shipNumber},O`));
    }
  }
}

export default Gameboard;
