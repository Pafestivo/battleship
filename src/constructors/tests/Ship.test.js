import Ship from "../Ship"

describe('ship functions', () => {
  let ship
  beforeEach(() => {
    ship = new Ship(5)
  })

  test('Ship accepts hit', () => {
    ship.hit()
    expect(ship.hits).toEqual(1)
  })

  test('Ship accepts multiple hits', () => {
    ship.hit()
    ship.hit()
    ship.hit()
    expect(ship.hits).toEqual(3)
  })

  test('Ship sinks if taken more hits than length', () => {
    ship.hit()
    ship.hit()
    ship.hit()
    ship.hit()
    ship.hit()
    expect(ship.isSunk).toBe(true)
  })
})