import startGame from "./startGame";

export default function prepareGame(player, AI) {

  const playerBoard = document.getElementById('player-board')

  // render the player board
  for(let i = 0; i < player.board.length; i++) {
    const box = document.createElement('div')
    box.id = player.board[i].coordinates
    box.classList.add('box')
    playerBoard.append(box)
  }

  // drag and drop mechanics
  let direction = 'right'
  let shipsPlaced = 0
  const rotateBtn = document.getElementById('rotate')
  const shipContainer = document.getElementById('ship-container')
  const ships = document.querySelectorAll('.ship')
  const boardBoxes = document.querySelectorAll('.box')
  const shipSquares = document.querySelectorAll('.square')

  rotateBtn.addEventListener('click', () => {
    if(direction === 'right') {
      direction = 'down'
      shipContainer.classList.remove('ships-container-horizontal')
      shipContainer.classList.add('ships-container-vertical')
      ships.forEach(ship => {
        ship.style.flexDirection = "column"
      })
    } else {
      direction = 'right'
      shipContainer.classList.remove('ships-container-vertical')
      shipContainer.classList.add('ships-container-horizontal')
      ships.forEach(ship => {
        ship.style.flexDirection = "row"
      })
    }
  })

  boardBoxes.forEach(box => {
    box.addEventListener('dragover', dragOver)
    box.addEventListener('drop', dragDrop)
  })

  ships.forEach(ship => {
    ship.addEventListener('dragstart', dragstart)
  })

  let beingDragged
  let hookPoint

  shipSquares.forEach(square => {
    square.addEventListener('mouseover', () => {
      hookPoint = square
    })
  })

  function dragstart(e) {
    beingDragged = e.target
  }

  function dragOver(e) {
    e.preventDefault()
  }

  function dragDrop(e) {
    if(!beingDragged) return

    let minValue = 0
    let maxValue = 0
    const targetId = e.target.id.split(',')
    if(direction === 'right') {
      minValue = targetId[0] - (hookPoint.id - 1)
      maxValue = +targetId[0] + (beingDragged.id - hookPoint.id)
    } else {
      minValue = targetId[1] - (hookPoint.id - 1)
      maxValue = +targetId[1] + (beingDragged.id - hookPoint.id)
    }


    // try to place ship
    if(direction === 'right') player.placeShip([minValue, +targetId[1]], direction, +beingDragged.id)
    else player.placeShip([+targetId[0], minValue], direction, +beingDragged.id)

    // checks if ship placed, abort if not
    if(player.gameBoard.ships.length > shipsPlaced) {
      shipsPlaced++
    } else {
      return
    }

    boardBoxes.forEach(box => {
      // if end and start point are not in the same line, abort
      if(maxValue > 10) return
      const boxId = box.id.split(',')

      // if direction is right
      if(direction === 'right') {
        if(boxId[0] >= minValue && boxId[0] <= maxValue && boxId[1] === targetId[1]) {
          box.classList.add('contain-ship')
          if(shipContainer.contains(beingDragged)) {
            shipContainer.removeChild(beingDragged)
            beingDragged = null
          }
        }

      // if direction is down
      } else if(boxId[1] >= minValue && boxId[1] <= maxValue && boxId[0] === targetId[0]) {
        box.classList.add('contain-ship')
        if(shipContainer.contains(beingDragged)) {
          shipContainer.removeChild(beingDragged)
          beingDragged = null
        }
      }
    })
  }
}