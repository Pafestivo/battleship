export default function Ship(len) {
  const length = len
  let hits = 0
  let isSunk = false
  return {
    get length() {
      return length
    },

    get hits() {
      return hits
    },

    get isSunk() {
      return isSunk
    },

    hit() {
      hits++
      if(hits === length) isSunk = true
    }
  }
}