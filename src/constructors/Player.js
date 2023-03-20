import GameBoard from "./GameBoard"

export default function Player(playerName) {
  const name = playerName
  const gameBoard = new GameBoard()

  return {
    name,
    get board() {
      return gameBoard.board
    },

    placeShip(coord, direction, len) {
      gameBoard.placeShip(coord, direction, len)
    },

    shoot(target, coord) {
      return target.gameBoard.receiveAttack(coord)
    }
  }
}