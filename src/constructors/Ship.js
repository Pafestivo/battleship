export default function Ship(len, direct, id = null) {
  const length = len
  const shipCoordinates = []
  const direction = direct
  let hits = 0
  let isSunk = false
  return {
    get length() {
      return length
    },

    get direction() {
      return direction
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