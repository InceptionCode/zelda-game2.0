import GameStrategy from './gameStrategy'

describe('GameStrategy', () => {
  let gameStrategy
  beforeEach(() => {
    gameStrategy = new GameStrategy()
  })
  describe('when AddStrategy is called', () => {
    it('should add the strategy ({page, component, needsContext})', () => {
      gameStrategy.AddStrategy('page', 'component', false)
      expect(gameStrategy._strategy).toHaveLength(1)
      expect(gameStrategy._strategy[0].page).toEqual('page')
      expect(gameStrategy._strategy[0].component).toEqual('component')
      expect(gameStrategy._strategy[0].needsContext).toEqual(false)
    })
  })

  describe('when returnPage is called', () => {
    it('should return null if strategy is not found', () => {
      expect(gameStrategy.returnPage('page')).toEqual(null)
    })
    it('should return component if strategy is found', () => {
      gameStrategy.AddStrategy('page', 'component')
      expect(gameStrategy.returnPage('page')).toEqual({
        component: gameStrategy._strategy[0].component,
        needsContext: gameStrategy._strategy[0].needsContext
      })
    })
  })
})
