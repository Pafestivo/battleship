import GameBoard from "./GameBoard";

export default function AIplayer() {
  const name = 'AI'
  const gameBoard = new GameBoard()
  // make a copy of the board array
  // const boardArrayCopy = [...gameBoard.board]

  return {
    name,
    gameBoard,
    get board() {
      return gameBoard.board
    },

    placeShip(len) {
      const id = crypto.randomUUID()
      while(true) {
        // declare empty coords array
        let coords = []

        // generate random coordinates
        const x = Math.ceil(Math.random() * 10)
        const y = Math.ceil(Math.random() * 10)

        // push them to the array
        coords.push(x)
        coords.push(y)

        // pick random direction
        const possibleDirections = ['right', 'up']
        const randomDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)]

        // try to place ship
        gameBoard.placeShip(coords, randomDirection, len, id)

        // get the ship location on the board
        let location = gameBoard.board.find(box => box.coordinates.every((coord, index) => coord === coords[index]))

        // check if ship is present at the location
        if(location.ship != null) {
          // check if its the ship we just created
          if(location.ship.id === id) return
        }

        // if not, repeat
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
          return location
        }
        // if yes, repeat
      }
    }
  }
}