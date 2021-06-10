export default class CurrentActivityController extends Stimulus.Controller {
  static get targets () {
    return [ "symbol" ]
  }

  static values = { refreshInterval: Number }

  connect() {
    console.log(this.hasSymbolTarget)
    this.load()
    this.refreshTimer = setInterval(() => { this.load() }, this.refreshIntervalValue)
  }

  disconnect() {
    clearInterval(this.refreshTimer)
  }

  load() {
    fetch("api/activities/current")
      .then(response => response.json())
      .then(data => this.symbolTarget.innerHTML = data.Symbol)
  }
}
