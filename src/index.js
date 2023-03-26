import prepareGame from "./Modules/prepareGame";
import AIplayer from "./constructors/AIplayer";
import Player from "./constructors/Player";
import { deleteShip, deleteLocations } from "./Modules/mockAPI";
import './styles/styles.css'
import './styles/winner-overlay.css'
import './styles/prepare-game.css'
import './styles/media-queries.css'

// create the players
const player = Player('player')
const AI = AIplayer()

prepareGame(player, AI)

const playAgain = document.querySelector('.winner-overlay > button')
const overlay = document.querySelector('.overlay')
const winnerOverlay = document.querySelector('.winner-overlay')
const playerBoard = document.getElementById('player-board')
const AIPlayer = document.querySelector('#AI-player')
const AIBoard = document.getElementById('AI-board')


playAgain.addEventListener('click', async () => {
  playAgain.setAttribute("disabled", true)
  await deleteShip(1)
  overlay.style.display = 'none'
  winnerOverlay.style.display = 'none'
  playAgain.removeAttribute("disabled")
  restartGame()
})

function restartGame() {
  AIPlayer.classList.add('hidden')
  playerBoard.innerHTML = ""
  AIBoard.innerHTML = ""
  window.location.reload()
  deleteLocations(1)
}
