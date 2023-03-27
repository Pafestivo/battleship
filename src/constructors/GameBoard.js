import Ship from "./Ship"

export default function GameBoard() {
  let board = []
  let ships = []
  let sunkShips = []
  let totalHits = 0
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

    get sunkShips() {
      return sunkShips
    },

    get totalHits() {
      return totalHits
    },

    get ships() {
      return ships
    },

    placeShip(coords, direction, len, id = null) {
      // check if ship stays within boundaries
      if(direction === 'right' && coords[0] + len > 11) return 'ship exceeding boundaries'
      if(direction === 'down' && coords[1] + len > 11) return 'ship exceeding boundaries'

      let coordsCopy = [...coords]

      for(let i = 0; i < len; i++) {
        if(i !== 0) {
          if(direction === 'right') coordsCopy[0]++
          else coordsCopy[1] ++
        }
        let chosenLocation = board.find(box => box.coordinates.every((coord, index) => coord === coordsCopy[index]))
        if(!chosenLocation) return 'No such coordinates'
        if(!chosenLocation.available) return `${chosenLocation.coordinates} is unavailable`
      }

      // creates the ship
      const battleship = new Ship(len, id)
      ships.push(battleship)

      // add the ship coordinates to the ship object
      let coordinatesCopy = [...coords]
      for(let i = 0; i < len; i++) {
        let currentCoords = [...coordinatesCopy]

        if(direction === 'right') coordinatesCopy[0]++
        else coordinatesCopy[1]++

        battleship.addCoordinates(currentCoords)
      }

      for(let i = 0; i < len; i++) {
        // skips statement on first round to add the chosen coordinates
        if(i !== 0) {
          // continue moving in the chosen direction
          if(direction === 'right') coords[0]++
          else coords[1]++
        }

        // make an array containing all of the adjacent locations
        let [a, b] = coords;
        let adjacentLocations = [
          [a - 1, b],
          [a + 1, b],
          [a - 1, b + 1],
          [a - 1, b - 1],
          [a + 1, b + 1],
          [a + 1, b - 1],
          [a, b + 1],
          [a, b - 1]
        ];

        let chosenLocation = board.find(box => box.coordinates.every((coord, index) => coord === coords[index]))
        chosenLocation.ship = battleship
        chosenLocation.ship.coordinates = chosenLocation.coordinates

        // set ship boxes and adjacent boxes unavailable
        chosenLocation.available = false
        adjacentLocations.forEach(location => {
          let current = board.find(box => box.coordinates.every((coord, index) => coord === location[index]))
          if(current) current.available = false
        })
      }
    },

    receiveAttack(coords) {
      const chosenLocation = board.find(box => box.coordinates.every((coord, index) => coord === coords[index]))
      // if the location is out of boundaries or was already attacked
      if(chosenLocation === undefined || chosenLocation.attacked) return
    
      // mark location as attacked
      chosenLocation.attacked = true
      totalHits++
      // hit ship if present
      if(chosenLocation.ship) {
        chosenLocation.ship.hit()
        // if ship sunk, add to sunkShips
        if(chosenLocation.ship.isSunk) {
          sunkShips.push(chosenLocation.ship)
        }
      }
    },

    // return the adjacent locations
    getAdjacentBoxes(coords) {
      const [a, b] = coords;
      const adjacentLocations = [
        [a - 1, b],
        [a + 1, b],
        [a - 1, b + 1],
        [a - 1, b - 1],
        [a + 1, b + 1],
        [a + 1, b - 1],
        [a, b + 1],
        [a, b - 1]
      ];
      const adjacentBoxes = adjacentLocations.map(location => {
        const adjacentBox = this.board.find(box => box.coordinates.every((coord, index) => coord === location[index]));
        return adjacentBox;
      });
      return adjacentBoxes.filter(box => box !== undefined);
    },
    
    hasArmedShips() {
      let armedShips = false
      ships.forEach(ship => {
        if(!ship.isSunk) armedShips = true
      })
      return armedShips
    }
  }
}