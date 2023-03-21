import GameBoard from "./GameBoard";

export default function AIplayer() {
  const name = 'AI'
  const gameBoard = new GameBoard()
  // make a copy of the board array
  const boardArrayCopy = [...gameBoard.board]

  return {
    name,
    gameBoard,
    get board() {
      return gameBoard.board
    },

    placeShip(len) {
      while(boardArrayCopy.length) {
        // pick a random item from the copy array
        const randomLocation = boardArrayCopy[Math.floor(Math.random() * boardArrayCopy.length)]
        // get it's coordinates
        const randomCoords = randomLocation.coordinates

        // pick random direction
        const possibleDirections = ['right', 'up']
        const randomDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)]

        // try to place ship
        gameBoard.placeShip(randomCoords, randomDirection, len)

        // check if ship is placed, if yes, break loop
        if(randomLocation.ship != null) return

        // if not, remove item from the array and repeat
        let index = boardArrayCopy.indexOf(randomLocation)
        boardArrayCopy.splice(index, 1)
      }  
    },

    shoot(target) {
      while(true) {
        // declare empty coords array
        let coords = []

        // generate random coordinates
        const x = Math.ceil(Math.random() * 10)
        const y = Math.ceil(Math.random() * 10)

        // push them to the array
        coords.push(x)
        coords.push(y)

        // find the correct location on target board
        const targetBoard = target.gameBoard.board

        let location = targetBoard.find(box => box.coordinates.every((coord, index) => coord === coords[index]))

        // check if the location was already attacked
        if(!location.attacked) {
          // if not attack
          target.gameBoard.receiveAttack(location.coordinates)
          return
        }
        // if yes, repeat
      }
    }
  }
}