import GameBoard from "./GameBoard"

export default function Player(playerName) {
  const name = playerName
  const gameBoard = new GameBoard()

  return {
    name,
    gameBoard,
    get board() {
      return gameBoard.board
    },

    placeShip(coord, direction, len) {
      return gameBoard.placeShip(coord, direction, len)
    },

    shoot(target, coord) {
      target.gameBoard.receiveAttack(coord)
    }
  }
}