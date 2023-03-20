export default function GameBoard() {
  let board = []
  let gridSize = 100
  for(let i = 0; i < gridSize; i++) {
    let box = []
    board.push(box)
  }

  return board
}