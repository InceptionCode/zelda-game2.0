export default class GameStrategy {
  _strategy = []
  AddStrategy(page, component, needsContext = true) {
    this._strategy.push({ page, component, needsContext })
  }
  returnPage(page) {
    const pageIndex = this._strategy.findIndex(str => str.page === page)
    if (pageIndex === -1) {
      return null
    }
    return {
      component: this._strategy[pageIndex].component,
      needsContext: this._strategy[pageIndex].needsContext
    }
  }
}
