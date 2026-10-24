/**
 * Represents a ship on the gameboard
 */
class Ship {
  /**
   * Constructor
   * @param {Number} length The length of the ship
   */
  constructor(length) {
    this.length = length;
    this.hitsTaken = 0;
  }

  /**
   * Increases the number of hits taken by one
   */
  hit() {
    this.hitsTaken++;
  }

  /**
   * Checks if the ship is sunk
   * @return True if the ship is sunk, false otherwise
   */
  isSunk() {
    return this.length - this.hitsTaken <= 0;
  }
}

export default Ship;
