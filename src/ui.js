/**
 * Represents the User Interface of the app
 */
class UI {
  renderGameboard(gameboardData, playerNumber) {
    const gameboard = document.getElementById(
      `player-${playerNumber}-ship-area`,
    );

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const cell = document.createElement("button");
        cell.setAttribute("style", "button");
        cell.classList.add("cell");
        cell.classList.add("ship-cell");
        cell.dataset.x = x;
        cell.dataset.y = y;

        switch (gameboardData[y][x]) {
          case "E":
            break;
          case "O":
            cell.style.backgroundColor = "red";
            break;
          case "X":
            cell.style.backgroundColor = "blue";
            break;
          default:
            cell.style.backgroundColor = "grey";
        }

        gameboard.appendChild(cell);
      }
    }
  }
}

export default UI;
