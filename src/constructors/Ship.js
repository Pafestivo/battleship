export default function Ship(len, id = null) {
  const length = len
  const shipCoordinates = []
  let hits = 0
  let isSunk = false
  return {
    get length() {
      return length
    },

    get shipCoordinates() {
      return shipCoordinates
    },
    
    get id() {
      return id
    },

    get hits() {
      return hits
    },

    get isSunk() {
      return isSunk
    },

    addCoordinates(coord) {
      shipCoordinates.push(coord)
    },

    hit() {
      hits++
      if(hits === length) isSunk = true
    }
  }
}