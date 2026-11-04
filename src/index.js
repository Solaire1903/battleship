import "./styles.css";
import { HumanPlayer, ComputerPlayer } from "./player.js";
import UI from "./ui.js";
import ListenerType from "./listener-type.js";

/**
 * Updates the board data and UI for a given player's board after a cell click
 * @param {Number} y The y-coordinate of the clicked cell
 * @param {Number} x The x-coordinate of the clicked cell
 * @param {Number} playerNumber The number of the clicked board's player
 */
const updateBoard = (y, x, playerNumber) => {
  let currentPlayer;
  let shipsHidden;

  if (playerNumber === 1) {
    currentPlayer = player1;
    shipsHidden = false;
  } else {
    currentPlayer = player2;
    shipsHidden = true;
  }

  currentPlayer.gameboard.receiveAttack(y, x);
  ui.renderGameboard(currentPlayer.gameboard.board, playerNumber, shipsHidden);
};

/**
 * Loads the app on startup and initializes the boards and
 * event listeners
 */
const loadApp = () => {
  ui.renderInitialBoards();

  player1.gameboard.placeAllShipsRandomly();
  player2.gameboard.placeAllShipsRandomly();

  console.log(player1.gameboard.ships);
  console.log(player2.gameboard.ships);

  ui.renderGameboard(player1.gameboard.board, 1, false);
  ui.renderGameboard(player2.gameboard.board, 2, true);

  ui.createEventListener(updateBoard, ListenerType.GAMEBOARD);
};

const player1 = new HumanPlayer();
const player2 = new ComputerPlayer();
const ui = new UI();

loadApp();
