import GameBoard from "../constructors/GameBoard";

describe('Game Board', () => {
  let testGameBoard
  beforeEach(() => {
    testGameBoard = new GameBoard()
  })

  test('Board created', () => {
    expect(testGameBoard.length).toBe(100)
  })
})