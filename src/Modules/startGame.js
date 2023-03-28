import Player from "../constructors/Player"
import { updatePlayerHitsAPI, updateAIHitsAPI, getPlayerHits, getAIHits } from "./JSON-server"

export default async function startGame(player, AI) {

    // add a placeholder to the hits array in the server
    await getPlayerHits(processPlayerHits)
    await getAIHits(processAIHits)
    function processPlayerHits(hits) {      
      if(hits.length === 0) return

      // if there are hits, convert object to array
      const hitsArray = Object.values(hits[0])

      hitsArray.forEach(hit => {
        player.gameBoard.receiveAttack([hit[0], hit[1]])
      })
    }

    function processAIHits(hits) {      
      if(hits.length === 0) return

      // if there are hits, convert object to array
      const hitsArray = Object.values(hits[0])

      hitsArray.forEach(hit => {
        AI.gameBoard.receiveAttack([hit[0], hit[1]])
      })
    }

  // select the containers of each board
  const playerBoard = document.getElementById('player-board')
  const AIBoard = document.getElementById('AI-board')
  const pageTitle = document.getElementById('page-title')
  pageTitle.classList.add('mobile-hidden')


  // hide pre-game titles, show AI board
  const placeShipsTitle = document.querySelector('.player > h1')
  const changeDirectionBtn = document.querySelector('.direction')
  const lengthIndicator = document.getElementById('length-indicator')
  const AISide = document.querySelector('#AI-player')
  const restartBtn = document.querySelector('#restart')
  placeShipsTitle.classList.add('hidden')
  changeDirectionBtn.classList.add('hidden')
  lengthIndicator.classList.add('hidden')
  AISide.classList.remove('hidden')
  restartBtn.classList.remove('hidden')

  // reset the player board
  playerBoard.innerHTML = ""
  AIBoard.innerHTML = ""

  // render the player board
  for(let i = 0; i < player.board.length; i++) {
    const box = document.createElement('div')
    box.id = `p${i}`
    box.classList.add('box')
    // shows ships on the board
    if(player.board[i].ship) box.classList.add('contain-ship')

    // mark attacked boxes
    if(player.board[i].attacked) box.classList.add('attacked')
    if(player.board[i].attacked && player.board[i].ship) box.classList.add('ship-hit')

    playerBoard.append(box)
  }

  // render the AI board
  for(let i = 0; i < AI.board.length; i++) {
    const box = document.createElement('div')
    box.id = AI.board[i].coordinates // set the id of the box to it's coordinates
    box.classList.add('AI-box', 'box')

    // mark attacked boxes
    if(AI.board[i].attacked) box.classList.add('attacked')
    if(AI.board[i].attacked && AI.board[i].ship) box.classList.add('ship-hit')

    // when box is clicked
    box.addEventListener('click', async () => {
      // do nothing if it's already attacked
      if(AI.board[i].attacked) return
      // if not, shoot AI at location
      player.shoot(AI, AI.board[i].coordinates)
      // if ship got hit
      if(AI.board[i].ship) {
        box.classList.add('ship-hit')
        // if ship sunk
        if(AI.board[i].ship.isSunk) {
          AIBoard.style.backgroundColor = 'red'
          AIState.style.color = 'red'
          setTimeout(() => {
            AIBoard.style.backgroundColor = '#2389da'
            AIState.style.color = '#fff'
          }, 50)
          // mark adjacent as attacked
          const shipCoords = AI.board[i].ship.shipCoordinates
          shipCoords.forEach(coords => {
            const adjacentBoxes = AI.gameBoard.getAdjacentBoxes(coords)
            adjacentBoxes.forEach(adjacent => {
              document.getElementById(adjacent.coordinates).classList.add('attacked')
              AI.gameBoard.receiveAttack(adjacent.coordinates)
            })
          })
          // check if game is over
          isGameOver()
        }
      }
      else box.classList.add('attacked')

      // then AI shoots back at random location
      const AIHit = player.board.indexOf(AI.shoot(player))
      const targetBox = document.querySelector(`#player-board > #p${AIHit}`)
      // if ship got hit
      if(player.board[AIHit].ship) {
        targetBox.classList.add('ship-hit') 
        // if ship sunk
        if(player.board[AIHit].ship.isSunk) {
          playerBoard.style.backgroundColor = 'red'
          playerState.style.color = 'red'
          setTimeout(() => {
            playerBoard.style.backgroundColor = '#2389da'
            playerState.style.color = '#fff'
          }, 50)
          // mark adjacent as attacked
          const shipCoords = player.board[AIHit].ship.shipCoordinates
          shipCoords.forEach(coords => {
            const adjacentBoxes = player.gameBoard.getAdjacentBoxes(coords)
            adjacentBoxes.forEach(adjacent => {
              // find the correct box in the array corresponding to the coord
              const currentBox = player.board.find(item => item.coordinates.every((coord, index) => coord === adjacent.coordinates[index]))
              // get the index of this box
              const currentBoxIndex = player.board.indexOf(currentBox)
              // use selector to select the box with the index as it's id
              document.getElementById(`p${currentBoxIndex}`).classList.add('attacked')
              // adjacent.attacked = true
              player.gameBoard.receiveAttack(adjacent.coordinates)
            })
          })
          // check if game is over
          isGameOver()
        }
      } 
      else targetBox.classList.add('attacked')
      // updates the APIs
      await updatePlayerHitsAPI(1, player.gameBoard.hitLocations)
      await updateAIHitsAPI(1, AI.gameBoard.hitLocations)
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
  playerName.classList.add('mobile-hidden')
  AIName.textContent = AI.name
  AIName.classList.add('mobile-hidden')
  updateShipsDetails()


  function updateShipsDetails() {
    playerState.textContent = `Ships alive: ${player.gameBoard.ships.length - player.gameBoard.sunkShips.length}`
    AIState.textContent = `Ships alive: ${AI.gameBoard.ships.length - AI.gameBoard.sunkShips.length}`
  }

  function isGameOver() {
    const overlay = document.querySelector('.overlay')
    const winnerOverlay = document.querySelector('.winner-overlay')
    const winnerName = document.querySelector('.winner-overlay > h1')

    // if player has no more ships alive
    if(player.gameBoard.ships.length === player.gameBoard.sunkShips.length) {
      // computer wins
      overlay.style.display = 'block'
      winnerName.textContent = 'Computer won!'
      winnerOverlay.style.display = 'flex'
    }
    // if computer has no more ships alive
    else if(AI.gameBoard.ships.length === AI.gameBoard.sunkShips.length) {
      // player wins
      overlay.style.display = 'block'
      winnerName.textContent = 'Player won!'
      winnerOverlay.style.display = 'flex'
    }
  }
}