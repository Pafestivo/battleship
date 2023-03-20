import Player from "../Player"

describe('Player Constructor', () => {
  let player1
  let player2
  beforeEach(() => {
    player1 = new Player('Player1')
    player2 = new Player('Player2')
  })

  test('Player created', () => {
    expect(player1.name).toBe('Player1')
    expect(player2.name).toBe('Player2')
  })

  describe('Player methods', () => {

    test('Get board', () => {
      expect(player1.board).not.toBe(undefined)
    })

    test('Place ship', () => {
      player1.placeShip([1,1], 'right', 2)
      player2.placeShip([1,1], 'right', 3)
      expect(player1.board[0].ship.length).toEqual(2)
      expect(player2.board[0].ship.length).toEqual(3)
    })

    test('Shoot', () => {
      player1.placeShip([1,1], 'right', 2)
      player2.placeShip([1,1], 'right', 2)
      player1.shoot(player2, [1,1])
      player1.shoot(player2, [2,1])
      player2.shoot(player1, [1,1])
      expect(player1.board[0].ship.hits).toEqual(1)
      expect(player2.board[0].ship.hits).toEqual(2)
      expect(player2.board[0].ship.isSunk).toEqual(true)
    })
  })
})