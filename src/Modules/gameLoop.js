import AIplayer from "../constructors/AIplayer";
import Player from "../constructors/Player";

export default function gameLoop() {
  // create the players
  const player = Player('player')
  const AI = AIplayer()

  // create the ships manually for testing
  player.placeShip([1,1], 'right', 1)
  player.placeShip([1,3], 'right', 2)
  player.placeShip([1,5], 'right', 3)
  player.placeShip([1,7], 'right', 4)
  player.placeShip([1,9], 'right', 5)
  player.placeShip([10,10], 'up', 6)
  AI.placeShip(1) 
  AI.placeShip(2) 
  AI.placeShip(5) 
  AI.placeShip(5) 

  // select the containers of each board
  const playerBoard = document.getElementById('player-board')
  const AIBoard = document.getElementById('AI-board')

  // render the player board
  for(let i = 0; i < player.board.length; i++) {
    const box = document.createElement('div')
    box.id = `num${i}`
    box.classList.add('box')
    if(player.board[i].ship) box.classList.add('contain-ship')
    playerBoard.append(box)
  }

  // render the AI board
  for(let i = 0; i < AI.board.length; i++) {
    const box = document.createElement('div')
    box.classList.add('box')
    if(AI.board[i].ship) box.classList.add('contain-ship')

    // when box is clicked
    box.addEventListener('click', () => {
      // do nothing if it's already attacked
      if(AI.board[i].attacked) return
      // if not, shoot AI at location
      player.shoot(AI, AI.board[i].coordinates)
      box.classList.add('attacked')

      // then AI shoots back at random location
      const AIHit = player.board.indexOf(AI.shoot(player))
      document.querySelector(`#player-board > #num${AIHit}`).classList.add('attacked')
      updateShipsDetails()
    })
    AIBoard.append(box)
  }

  // add player details:
  const playerName = document.querySelector('#player-details h1')
  const AIName = document.querySelector('#AI-details h1')
  const playerState = document.querySelector('#player-details p')
  const AIState = document.querySelector('#AI-details p')
  playerName.textContent = player.name
  AIName.textContent = AI.name
  updateShipsDetails()


  function updateShipsDetails() {
    playerState.textContent = `Ships alive: ${player.gameBoard.ships.length - player.gameBoard.sunkShips.length}`

    AIState.textContent = `Ships alive: ${AI.gameBoard.ships.length - AI.gameBoard.sunkShips.length}`
  }
}