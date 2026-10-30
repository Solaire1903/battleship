import "./styles.css";
import { HumanPlayer, ComputerPlayer } from "./player.js";
import UI from "./ui.js";

const loadApp = () => {
  const player1 = new HumanPlayer();
  const player2 = new ComputerPlayer();
  const ui = new UI();

  ui.renderGameboard(player1.gameboard.board, 1);
  ui.renderGameboard(player2.gameboard.board, 2);
};

loadApp();
