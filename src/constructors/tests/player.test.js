import Player from "../Player"

describe('Player Constructor', () => {
  let player
  beforeEach(() => {
    player = new Player('Player')
  })

  test('Player created', () => {
    expect(player.name).toBe('Player')
  })
})