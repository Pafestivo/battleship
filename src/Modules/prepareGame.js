import startGame from "./startGame";

export default function prepareGame(player, AI) {

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
        // create AI ships and start game
        AI.placeShip(1) 
        AI.placeShip(2) 
        AI.placeShip(2) 
        AI.placeShip(2) 
        AI.placeShip(3) 
        AI.placeShip(5) 
        AI.placeShip(5) 
        startGame(player, AI)
      }
    })
    playerBoard.append(box)
  }
  const allBoxes = document.querySelectorAll('.pre-game')

  // create the ships manually for testing
  // player.placeShip([1,1], 'right', 1)
  // player.placeShip([1,3], 'right', 2)
  // player.placeShip([1,5], 'right', 3)
  // player.placeShip([1,7], 'right', 4)
  // player.placeShip([1,9], 'right', 5)
  // player.placeShip([10,10], 'down', 6)
  // AI.placeShip(1) 
  // AI.placeShip(2) 
  // AI.placeShip(2) 
  // AI.placeShip(2) 
  // AI.placeShip(3) 
  // AI.placeShip(5) 
  // AI.placeShip(5) 

  // gameLoop(player, AI)
}