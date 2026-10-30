import Ship from "./ship.js";

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
   */
  placeNewShip(y, x, isHorizontal, shipLength) {
    if (!this.#canPlaceShip(y, x, isHorizontal, shipLength)) return;

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
    if (this.board[y][x] === "X" || this.board[y][x] === "O") return;

    //Empty spot hit
    if (this.board[y][x] === "E") this.board[y][x] = "X";
    //Ship hit
    else {
      const hitShip = this.ships.find(
        (ship) => ship.number === this.board[y][x],
      );
      hitShip.hitsTaken++;

      this.board[y][x] = "O";
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
}

export default Gameboard;
