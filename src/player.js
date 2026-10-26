import Gameboard from "./gameboard.js";

/**
 * Represents a player in the game
 */
class Player {
  /**
   * Constructor
   */
  constructor() {
    this.gameboard = new Gameboard();
  }
}

/**
 * Represents a human player in the game
 */
class HumanPlayer extends Player {}

/**
 * Represents a computer player in the game
 */
class ComputerPlayer extends Player {}

export { HumanPlayer, ComputerPlayer };
