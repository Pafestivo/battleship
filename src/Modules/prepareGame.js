import startGame from "./startGame";
import { addShipToAPI, getShips } from "./JSON-server";

export default async function prepareGame(player, AI) {

  // if game is already in progress, skip the preparation part
  await getShips(check)
  function check(ships) {
    if(ships.length === 2) {
      // convert objects to arrays
      const playerShips = Object.values(ships[0])
      const AIShips = Object.values(ships[1])
      // remove the ID property
      playerShips.pop()
      AIShips.pop()

      // place player ships
      playerShips.forEach(ship => {
        player.placeShip(ship.shipCoordinates[0], ship.direction, ship.length)
      })

      // place AI ships
      AIShips.forEach(ship => {
        AI.placeShip(ship.shipCoordinates[0], ship.direction, ship.length)
      })
      
      // start game without preparation
      startGame(player, AI)
    } 
  }

  const playerBoard = document.getElementById('player-board')
  const lengthIndicator = document.getElementById('ship-length')
  const shipLens = [5, 5, 3, 2, 2, 2, 1]
  let direction = 'right'
  let currentShip = 0

  // handle changing direction
  const directionText = document.getElementById('direction-text')
  const rotateBtn = document.querySelector('.rotate')
  rotateBtn.addEventListener('click', () => {
    if (direction === 'right') direction = 'down'
    else if(direction === 'down') direction = 'right'
    directionText.textContent = direction
  })

  for(let i = 0; i < player.board.length; i++) {
    const box = document.createElement('div')
    box.id = player.board[i].coordinates
    box.classList.add('box', 'pre-game')
    // show ship location on hover
    box.addEventListener('mouseover', () => {
      allBoxes.forEach(square => {
        square.classList.remove('highlight')
        // get the x and the y of hovered box and other squares
        const hoveredCoords = box.id.split(',')
        const boxX = +hoveredCoords[0]
        const boxY = +hoveredCoords[1]
        const squareCoord = square.id.split(',')
        const squareX = +squareCoord[0]
        const squareY = +squareCoord[1]

        // highlight the ship size in the correct direction
        if(direction === 'right') {
          if(boxX <= squareX && squareX < boxX + shipLens[currentShip] && squareY === boxY) {
            // if ship exceeding the board return
            if(boxX + shipLens[currentShip] > 11) return
            // else color the squares the ship will take
            square.classList.add('highlight')
          }
        } else if(direction === 'down') {
          if(boxY <= squareY && squareY < boxY + shipLens[currentShip] && squareX === boxX) {
            // if ship exceeding the board return
            if(boxY + shipLens[currentShip] > 11) return
            // else color the squares the ship will take
            square.classList.add('highlight')
          }
        }
      })
    })

    // place the ship on click
    box.addEventListener('click', () => {
      // get an array of two numbers as coordinates
      const hoveredCoordsString = box.id.split(',')
      const hoveredCoords = []
      hoveredCoords.push(+hoveredCoordsString[0])
      hoveredCoords.push(+hoveredCoordsString[1])
      
      // try to place ship
      player.placeShip(hoveredCoords, direction, shipLens[currentShip])
      // check if ship really placed
      if(player.gameBoard.ships.length > currentShip) {
        currentShip++
        lengthIndicator.textContent = shipLens[currentShip]
        // if it's placed, changed highlighted squares to ship squares
        const highlightedSquares = document.querySelectorAll('.highlight')
        highlightedSquares.forEach(square => {
          square.classList.add('contain-ship')
        })
      }
      if(!shipLens[currentShip]) {
        addShipToAPI('1', player.gameBoard.ships)
        // create AI ships and start game
        AI.placeRandomShip(1) 
        AI.placeRandomShip(2) 
        AI.placeRandomShip(2) 
        AI.placeRandomShip(2) 
        AI.placeRandomShip(3) 
        AI.placeRandomShip(5) 
        AI.placeRandomShip(5) 
        addShipToAPI('2', AI.gameBoard.ships)
        startGame(player, AI)
      }
    })
    playerBoard.append(box)
  }
  const allBoxes = document.querySelectorAll('.pre-game')
}