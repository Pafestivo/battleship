import prepareGame from "./Modules/prepareGame";
import AIplayer from "./constructors/AIplayer";
import Player from "./constructors/Player";
import './styles/styles.css'
import './styles/winner-overlay.css'
import './styles/prepare-game.css'
import './styles/ship-list.css'
import './styles/media-queries.css'

// create the players
const player = Player('player')
const AI = AIplayer()

prepareGame(player, AI)

const playAgain = document.querySelector('.winner-overlay > p')

playAgain.addEventListener('click', () => {
  window.location.reload()
})
