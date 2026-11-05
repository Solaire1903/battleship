/**
 * Represents the User Interface of the app
 */
class UI {
  /**
   * Constructor
   */
  constructor() {
    this.playerTurn;
  }

  /**
   * Renders the initial numbers and letters of the boards, as well as
   * the empty ship areas, to the page
   */
  renderInitialBoards() {
    const gameboards = document.querySelectorAll(".gameboard");
    let playerNumber = 0;
    gameboards.forEach((gameboard) => {
      playerNumber++;

      gameboard.appendChild(document.createElement("div"));

      for (let i = 1; i < 11; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = String.fromCharCode(64 + i);
        gameboard.appendChild(cell);
      }

      for (let i = 1; i < 11; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = i;
        gameboard.appendChild(cell);
      }

      const shipArea = document.createElement("div");
      shipArea.classList.add("ship-area");
      shipArea.id = `player-${playerNumber}-ship-area`;
      gameboard.appendChild(shipArea);
    });
  }

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

    gameboard.innerHTML = "";

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        let cell;
        if (playerNumber === 1) {
          cell = document.createElement("div");
        } else {
          cell = document.createElement("button");
          cell.setAttribute("style", "button");
        }
        cell.classList.add("cell");
        cell.classList.add("ship-cell");
        cell.dataset.x = x;
        cell.dataset.y = y;

        const gameboardDataString = gameboardData[y][x];
        //Recolor hit ship
        if (gameboardDataString.includes("O"))
          cell.style.backgroundColor = "red";
        else {
          switch (gameboardDataString) {
            case "E":
              break;
            //Recolor missed cell
            case "X":
              cell.style.backgroundColor = "blue";
              break;
            case "S":
              cell.style.backgroundColor = "yellow";
              break;
            //Recolor ship if not set to hidden
            default:
              if (!shipsHidden) cell.style.backgroundColor = "grey";
          }
        }

        gameboard.appendChild(cell);
      }
    }
  }

  /**
   * Creates a new event listener
   * @param {String} listenerType The type of event listener to create
   * @param {Function} callbacks Optional callback functions to be used by the listener
   */
  createEventListener(listenerType, ...callbacks) {
    switch (listenerType) {
      case "GAMEBOARD":
        this.#createPlayer2GameboardEventListener(callbacks, 2);
        break;
    }
  }

  /**
   * Creates a click event listener for the computer player's board
   * @param {Function} callbacks Callback functions for the event logic
   */
  #createPlayer2GameboardEventListener(callbacks) {
    const playHumanTurn = callbacks[0];
    const playComputerTurn = callbacks[1];
    const checkForWinner = callbacks[2];

    const gameboard = document.getElementById("player-2-ship-area");

    gameboard.addEventListener("click", (event) => {
      if (event.target.className !== "cell ship-cell" || this.playerTurn !== 1)
        return;

      const cell = event.target;
      const x = cell.dataset.x;
      const y = cell.dataset.y;

      const humanAttack = playHumanTurn(y, x);

      //Check if human won with turn
      let winner = checkForWinner();
      if (winner !== -1) {
        console.log(`Player 1 won!`);
        this.playerTurn = 2;
        return;
      }

      //If no empty spot is hit, human plays another turn
      if (humanAttack !== 0) return;

      //Computer turn starts here
      this.playerTurn = 2;
      let computerTurn = playComputerTurn();
      //If computer hits a ship, it plays another turn
      while (computerTurn === 1) {
        //Check if computer won first
        winner = checkForWinner();
        if (winner !== -1) {
          console.log(`Player 2 won!`);
          return;
        }

        computerTurn = playComputerTurn();
      }

      this.playerTurn = 1;
    });
  }
}

export default UI;
