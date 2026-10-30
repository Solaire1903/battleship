/**
 * Represents the User Interface of the app
 */
class UI {
  /**
   * Renders a given players gameboard to the page
   * @param {Array<String>} gameboardData The gameboard data to render
   * @param {Number} playerNumber The player number
   * @param {Boolean} shipsHidden True if ships should be hidden
   */
  renderGameboard(gameboardData, playerNumber, shipsHidden) {
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
            if (!shipsHidden) cell.style.backgroundColor = "grey";
        }

        gameboard.appendChild(cell);
      }
    }
  }
}

export default UI;
