import prepareGame from "./Modules/prepareGame";
import AIplayer from "./constructors/AIplayer";
import Player from "./constructors/Player";
import { deleteShip, deleteLocations, getHits, getShips } from "./Modules/mockAPI";
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
const restartBtn = document.querySelector('#restart')


playAgain.addEventListener('click', resetGame)

restartBtn.addEventListener('click', resetGame)

async function resetGame() {
  // disable the buttons
  playAgain.setAttribute("disabled", true)
  restartBtn.setAttribute("disabled", true)

  // delete the ships
  await getShips(remove)
  async function remove(ships) {
    for(let i = 0; i <= ships.length; i++) {
      if(ships[i]) deleteShip(ships[i].id)
    }
  }
  
  // delete the hits
  await getHits(erase)
  async function erase(hits) {
    for(let i = 0; i <= hits.length; i++) {
      if(hits[i]) deleteLocations(hits[i].id)
    }
  }

  // re-enable buttons and restart game
  playAgain.removeAttribute("disabled")
  restartBtn.removeAttribute("disabled")
  setTimeout(() => {
    window.location.reload()
  }, 700)
  
}
