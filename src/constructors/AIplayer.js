import GameBoard from "./GameBoard";

export default function AIplayer() {
  const name = 'AI'
  const gameBoard = new GameBoard()
  let lastTurnHit = false
  let shipDirection = ''
  let firstHit = []
  let lastHit = []

  function findNextAttack(direction) {
    let nextAttack = []
    if(direction === 'right') nextAttack = [lastHit[0] + 1, lastHit[1]]
    if(direction === 'left') nextAttack = [lastHit[0] - 1, lastHit[1]]
    if(direction === 'up') nextAttack = [lastHit[0], lastHit[1] - 1]
    if(direction === 'down') nextAttack = [lastHit[0], lastHit[1] + 1]
    return nextAttack
  }

  return {
    name,
    gameBoard,
    get board() {
      return gameBoard.board
    },

    placeShip(len) {
      const id = crypto.randomUUID()
      // limit the amount of attempts
      let attempts = 0
      while(attempts < 1000) {
        attempts++
        // declare empty coords array
        let coords = []

        // generate random coordinates
        const x = Math.ceil(Math.random() * 10)
        const y = Math.ceil(Math.random() * 10)

        // push them to the array
        coords.push(x)
        coords.push(y)

        // pick random direction
        const possibleDirections = ['right', 'down']
        const randomDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)]

        // try to place ship
        gameBoard.placeShip(coords, randomDirection, len, id)

        // get the ship location on the board
        let location = gameBoard.board.find(box => box.coordinates.every((coord, index) => coord === coords[index]))

        // check if ship is present at the location
        if(location.ship != null) {
          // check if its the ship we just created
          if(location.ship.id === id) {
            return
          }
        }
      }
    },

    shoot(target) {
      // store the target board array as a variable
      const targetBoard = target.gameBoard.board

      // check if last turn was a hit
      if(lastTurnHit) {
        // check if we already know the ship direction
        if(shipDirection !== '') {
          // keep shooting in the same direction

          let shotFired = false
          
          // find next target coordinates using the direction
          let nextAttack = findNextAttack(shipDirection)

          // find the location with the correct coordinates
          let location = targetBoard.find(box => box.coordinates.every((coord, index) => coord === nextAttack[index]))
          // check if location is inside the board
          if(location) {
            // if location isn't attacked, attack it
            if(!location.attacked) {
              target.gameBoard.receiveAttack(location.coordinates)
              lastHit = location.coordinates
              shotFired = true
              // if ship was hit in this location, return
              if(location.ship) {
                if(location.ship.isSunk) {
                  lastTurnHit = false
                  shipDirection = ''
                }
                return location
              }
              // if location has no ship, continue to change direction
            }
            // if location is outside the board, continue to change direction
          }
          
          // if it is attacked, flip the direction to the other side and hit it
          if(shipDirection === 'right') shipDirection = 'left'
          else if(shipDirection === 'left') shipDirection = 'right'
          else if(shipDirection === 'up') shipDirection = 'down'
          else if(shipDirection === 'down') shipDirection = 'up'
          lastHit = firstHit
          if(location && !location.ship) return location


          // if no shot was fired that turn
          if(!shotFired) {
            // find the new location for attack
            nextAttack = findNextAttack(shipDirection)
            location = targetBoard.find(box => box.coordinates.every((coord, index) => coord === nextAttack[index]))
            // attack it
            target.gameBoard.receiveAttack(location.coordinates)
            lastHit = location.coordinates
            return location
          }



        // if we don't know the direction, find it
        } else {
          let firstX = firstHit[0]
          let firstY = firstHit[1]
          let adjacentLocations = [
            [firstX + 1, firstY],
            [firstX, firstY + 1],
            [firstX - 1, firstY],
            [firstX, firstY - 1]
          ]
          // get the adjacent box that isn't attacked
          let location
          for(let i = 0; i < adjacentLocations.length; i++) {
            location = targetBoard.find(box => box.coordinates.every((coord, index) => coord === adjacentLocations[i][index]))
            // break the loop when location that isn't attack found
            if(location && !location.attacked) break
          }
          // attack the location
          target.gameBoard.receiveAttack(location.coordinates)

          // if the location has ship (which means it's a hit)
          if(location.ship) {

            // if the ship sunk, make next attack random
            if(location.ship.isSunk) lastTurnHit = false

            // else store the coordinates as last hit
            else {
              lastHit = location.coordinates
              let lastX = lastHit[0]
              let lastY = lastHit[1]

              // determine the correct direction
              if(lastX > firstX) shipDirection = 'right'
              else if(lastX < firstX) shipDirection = 'left'
              else if(lastY < firstY) shipDirection = 'up'
              else if(lastY > firstY) shipDirection = 'down'
            }
          }
          return location
        }
      }

      // if last time wasn't a hit, take a random shot
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
        let location = targetBoard.find(box => box.coordinates.every((coord, index) => coord === coords[index]))

        // if the location isn't attacked
        if(!location.attacked) {
          // attack it
          target.gameBoard.receiveAttack(location.coordinates)
          // if there is a ship at the location
          if(location.ship) {
            // if ship sunk(the ship with length of 1)
            if(location.ship.isSunk) return location

            // if ship didn't sink
            // declare this turn as a hit
            lastTurnHit = true
            // store the coordinates where it hit
            firstHit = location.coordinates
          }
          return location
        }
        // if location is attacked, repeat to get another location
      }
    }
  }
}