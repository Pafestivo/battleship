import GameBoard from "./GameBoard"

export default function Player(name) {
  this.name = name
  this.game = new GameBoard()

  return {
    name
  }
}