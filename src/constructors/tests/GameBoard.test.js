import GameBoard from "../GameBoard";

describe('Game Board', () => {
  let testGameBoard
  beforeEach(() => {
    testGameBoard = new GameBoard()
  })

  test('Board created', () => {
    expect(testGameBoard.board.length).toBe(100)
  })

  test('Each board box has coordinates', () => {
    expect(testGameBoard.board[0].coordinates).toEqual([1,1])
    expect(testGameBoard.board[1].coordinates).toEqual([2,1])
    expect(testGameBoard.board[2].coordinates).toEqual([3,1])
    expect(testGameBoard.board[10].coordinates).toEqual([1,2])
    expect(testGameBoard.board[44].coordinates).toEqual([5,5])
    expect(testGameBoard.board[99].coordinates).toEqual([10,10])
  })

  describe('Create ship at coordinates', () => {
    test('With right direction', () => {
      testGameBoard.placeShip([1,1], 'right', 3)
      expect(testGameBoard.board[0].ship.length).toEqual(3)
      expect(testGameBoard.board[1].ship.length).toEqual(3)
      expect(testGameBoard.board[2].ship.length).toEqual(3)
    })

    test('With up direction', () => {
      testGameBoard.placeShip([1,2], 'up', 2)
      expect(testGameBoard.board[0].ship.length).toEqual(2)
      expect(testGameBoard.board[10].ship.length).toEqual(2)
    })

    test("Abort if ship exceeds boundaries", () => {
      testGameBoard.placeShip([8,1], 'right', 4)
      expect(testGameBoard.board[8].ship).toEqual(null)
    })

    test("Make space unavailable when creating ship", () => {
      testGameBoard.placeShip([2,2], 'right', 2)
      expect(testGameBoard.board[0].available).toEqual(false)
      expect(testGameBoard.board[1].available).toEqual(false)
      expect(testGameBoard.board[2].available).toEqual(false)
      expect(testGameBoard.board[3].available).toEqual(false)
      expect(testGameBoard.board[10].available).toEqual(false)
      expect(testGameBoard.board[11].available).toEqual(false)
      expect(testGameBoard.board[12].available).toEqual(false)
      expect(testGameBoard.board[13].available).toEqual(false)
      expect(testGameBoard.board[20].available).toEqual(false)
      expect(testGameBoard.board[21].available).toEqual(false)
      expect(testGameBoard.board[22].available).toEqual(false)
      expect(testGameBoard.board[23].available).toEqual(false)

    })

    test("Abort if space isn't available", () => {
      testGameBoard.placeShip([1,1], 'right', 4)
      testGameBoard.placeShip([1,2], 'right', 4)
      testGameBoard.placeShip([5,1], 'right', 4)
      testGameBoard.placeShip([1,1], 'right', 2)
      expect(testGameBoard.board[0].ship.length).toEqual(4)
      expect(testGameBoard.board[10].ship).toEqual(null)
      expect(testGameBoard.board[14].ship).toEqual(null)
      expect(testGameBoard.board[4].ship).toEqual(null)
    })
  })

  describe('Receive attack', () => {
    test("Log attack at chosen location", () => {
      testGameBoard.receiveAttack([1, 1])
      expect(testGameBoard.board[0].attacked).toEqual(true)
    })

    test("Hit ship on chosen location", () => {
      testGameBoard.placeShip([1,1], 'right', 3)
      testGameBoard.receiveAttack([1, 1])
      expect(testGameBoard.board[0].ship.hits).toEqual(1)
    })

    test("Sink ship", () => {
      testGameBoard.placeShip([1,1], 'right', 3)
      testGameBoard.receiveAttack([1, 1])
      testGameBoard.receiveAttack([2, 1])
      testGameBoard.receiveAttack([3, 1])
      expect(testGameBoard.board[0].ship.hits).toEqual(3)
      expect(testGameBoard.board[0].ship.isSunk).toEqual(true)
    })
  })

  describe('hasArmedShips', () => {

    test("Return true when ships still alive", () => {
      testGameBoard.placeShip([1,1], 'right', 1)
      testGameBoard.placeShip([1,3], 'right', 2)
      testGameBoard.receiveAttack([1, 1])
      testGameBoard.receiveAttack([1, 3])
      expect(testGameBoard.hasArmedShips()).toEqual(true)
    })

    test("return false when all ships sunk", () => {
      testGameBoard.placeShip([1,1], 'right', 1)
      testGameBoard.placeShip([1,3], 'right', 2)
      testGameBoard.receiveAttack([1, 1])
      testGameBoard.receiveAttack([1, 3])
      testGameBoard.receiveAttack([2, 3])
      expect(testGameBoard.hasArmedShips()).toEqual(false)
    })
  })
})