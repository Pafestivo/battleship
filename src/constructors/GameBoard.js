import Ship from "./Ship"

export default function GameBoard() {
  let board = []
  let gridSize = 100
  // initialize coordinates at 1,1
  let x = 1
  let y = 1
  for(let i = 0; i < gridSize; i++) {
    // make each box an object containing data
    let box = {
      "coordinates": [x,y],
      "ship": null,
      "attacked": false,
      "available": true
    }
    // add object to gameBoard array
    board.push(box)
    
    // increment x and y coordinates
    x++
    if(x > 10) {
      x = 1
      y++
    }

  }

  return {
    get board() {
      return board
    },

    placeShip(coords, direction, len) {
      // check if ship stays within boundaries
      if(direction === 'right' && coords[0] + len > 10) return 'ship exceeding boundaries'
      if(coords[1] + len > 10) return 'ship exceeding boundaries'

      let coordsCopy = [...coords]

      for(let i = 0; i < len; i++) {
        if(i !== 0) {
          if(direction === 'right') coordsCopy[0]++
          else coordsCopy[1] --
        }
        let chosenLocation = board.find(box => box.coordinates.every((coord, index) => coord === coordsCopy[index]))
        if(!chosenLocation.available) return 'Some of the space is unavailable'
      }

      // creates the ship
      const battleship = new Ship(len)

      for(let i = 0; i < len; i++) {
        // skips statement on first round to add the chosen coordinates
        if(i !== 0) {
          // continue moving in the chosen direction
          if(direction === 'right') coords[0]++
          else coords[1]--
        }

        // make an array containing all of the adjacent locations
        let adjacentLocations = [
          [coords[0] - 1, coords[1]],
          [coords[0] + 1, coords[1]],
          [coords[0] - 1, coords[1] + 1],
          [coords[0] - 1, coords[1] - 1],
          [coords[0] + 1, coords[1] - 1],
          [coords[0] + 1, coords[1] + 1],
          [coords[0], coords[1] + 1],
          [coords[0], coords[1] - 1]
        ]

        let chosenLocation = board.find(box => box.coordinates.every((coord, index) => coord === coords[index]))
        chosenLocation.ship = battleship
        chosenLocation.available = false
        adjacentLocations.forEach(location => {
          let current = board.find(box => box.coordinates.every((coord, index) => coord === location[index]))
          if(current) current.available = false
        })
      }
    },

    receiveAttack(coords) {
      const chosenLocation = board.find(box => box.coordinates.every((coord, index) => coord === coords[index]))
      if(chosenLocation === undefined) return

      if(!chosenLocation.attacked) {
        chosenLocation.attacked = true
        if(chosenLocation.ship) {
          chosenLocation.ship.hit()
        }
      }
    }
  }
}