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
  const shipList = document.querySelector('.ship-list')
  const ships = document.querySelectorAll('.ship')
  const boardBoxes = document.querySelectorAll('.box')
  const shipSquares = document.querySelectorAll('.square')

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

    console.log(minValue)
    console.log(maxValue)
    // try to place ship
    player.placeShip([minValue, +targetId[1]], direction, +beingDragged.id)
    // checks if ship placed, abort if not
    if(player.gameBoard.ships.length > shipsPlaced) {
      shipsPlaced++
    } else return

    boardBoxes.forEach(box => {
      // if end and start point are not in the same line, abort
      if(maxValue > 10) return
      const boxId = box.id.split(',')

      // if direction is right
      if(direction === 'right') {
        if(boxId[0] >= minValue && boxId[0] <= maxValue && boxId[1] === targetId[1]) {
          box.classList.add('contain-ship')
          if(shipList.contains(beingDragged)) shipList.removeChild(beingDragged)
        }

      // if direction is down
      } else if(boxId[1] >= minValue && boxId[1] <= maxValue && boxId[0] === targetId[0]) {
        box.classList.add('contain-ship')
        if(shipList.contains(beingDragged)) shipList.removeChild(beingDragged)
      }
    })
    console.log(player.gameBoard.ships)
  }
}