import AIplayer from "../AIplayer"

describe('Player Constructor', () => {
  let AI
  let AI2
  beforeEach(() => {
    AI = new AIplayer()
    AI2 = new AIplayer()
  })

  test('Player created', () => {
    expect(AI.name).toBe('AI')
  })

  describe('AI methods', () => {

    test('Get board', () => {
      expect(AI.board).not.toBe(undefined)
    })

    test('Place ship', () => {
      AI.placeShip(5)
      AI.placeShip(2)
      expect(AI.gameBoard.ships.length).toEqual(2)
    })

    test('Shoot', () => {
      AI2.shoot(AI)
      AI2.shoot(AI)
      AI.shoot(AI2)
      expect(AI.gameBoard.totalHits).toEqual(2)
      expect(AI2.gameBoard.totalHits).toEqual(1)
    })
  })
})