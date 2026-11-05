import "./styles.css";
import { HumanPlayer, ComputerPlayer } from "./player.js";
import UI from "./ui.js";
import ListenerType from "./listener-type.js";
import getRandomInt from "./random-number.js";

/**
 * Updates the board data and UI for the computer's board after a cell click
 * @param {Number} y The y-coordinate of the clicked cell
 * @param {Number} x The x-coordinate of the clicked cell
 * @return -1 if attack was on invalid cell, 0 on empty cell and 1 on ship cell
 */
const playHumanTurn = (y, x) => {
  const successfulAttack = player2.gameboard.receiveAttack(y, x);
  ui.renderGameboard(player2.gameboard.board, 2, true);

  return successfulAttack;
};

/**
 * Updates the board data and UI for the computer's board after
 * the computer attacked the player board
 * @return 0 if attack was on empty cell and 1 on ship cell
 */
const playComputerTurn = () => {
  let successfulAttack = -1;
  while (successfulAttack === -1) {
    const y = getRandomInt(0, 9);
    const x = getRandomInt(0, 9);

    successfulAttack = player1.gameboard.receiveAttack(y, x);
  }

  ui.renderGameboard(player1.gameboard.board, 1, false);

  return successfulAttack;
};

/**
 * Check if there is a winner in the game
 * @returns 1 if player 1 won, 2 if player 2 won and -1 if there is no winner yet
 */
const checkForWinner = () => {
  if (player1.gameboard.allShipsSunk()) return 2;
  else if (player2.gameboard.allShipsSunk()) return 1;
  else return -1;
};

/**
 * Resets the boards and players for a new game
 */
const startNewGame = () => {
  player1 = new HumanPlayer();
  player2 = new ComputerPlayer();

  player1.gameboard.placeAllShipsRandomly();
  player2.gameboard.placeAllShipsRandomly();

  ui.renderGameboard(player1.gameboard.board, 1, false);
  ui.renderGameboard(player2.gameboard.board, 2, true);

  ui.playerTurn = 1;
};

/**
 * Loads the app on startup and initializes the boards and
 * event listeners
 */
const loadApp = () => {
  ui.renderInitialBoards();

  ui.createEventListener(
    ListenerType.GAMEBOARD,
    playHumanTurn,
    playComputerTurn,
    checkForWinner,
  );

  startNewGame();
};

let player1 = new HumanPlayer();
let player2 = new ComputerPlayer();
const ui = new UI();

loadApp();
