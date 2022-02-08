import { TURN } from './constants.js';
import {
  getCellElementList,
  getCurrentTurnElement,
  getCellElementAtIdx,
  getGameStatusElement,
} from './selectors.js';

/**
 * Global variables
 */

let currentTurn = TURN.CROSS;
let isGameEnded = false;
let cellValues = new Array(9).fill('');

/**
 * TODOs
 *
 * 1. Bind click event for all cells
 * 2. On cell click, do the following:
 *    - Toggle current turn
 *    - Mark current turn to the selected cell
 *    - Check game state: win, ended or playing
 *    - If game is win, highlight win cells
 *    - Not allow to re-click the cell having value.
 *
 * 3. If game is win or ended --> show replay button.
 * 4. On replay button click --> reset game to play again.
 *
 */

function toggleTurn() {
  currentTurn = currentTurn === TURN.CIRCLE ? TURN.CROSS : TURN.CIRCLE;

  const currentElementTurn = getCurrentTurnElement();
  //update turn elenmentDOM
  if (currentElementTurn) {
    currentElementTurn.classList.remove(TURN.CROSS, TURN.CROSS);
    currentElementTurn.classList.add(currentTurn);
  }
}
function handleClick(cell, index) {
  const isClickTurn =
    cell.classList.contains(TURN.CIRCLE) || cell.classList.contains(TURN.CROSS);
  if (isClickTurn) return;
  //set selected cell
  cell.classList.add(currentTurn);
  //toggle turn
  toggleTurn();
  console.log('click', cell, index);
}

function initCellElementList() {
  const cellElement = getCellElementList();

  cellElement.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(cell, index));
  });
}

(() => {
  //bind click event for all li element
  initCellElementList();
  // bind click event for button
  handleClick();
})();
