export default class GameStrategy {
  _strategy = []
  AddStrategy(page, component) {
    this._strategy.push({ page, component })
  }
  returnPage(page) {
    const pageIndex = this._strategy.findIndex(str => str.page === page)
    if (pageIndex === -1) {
      return null
    }
    return this._strategy[pageIndex].component
  }
}
