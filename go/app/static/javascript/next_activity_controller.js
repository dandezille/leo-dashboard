export default class NextActivityController extends Stimulus.Controller {
  static values = { refreshInterval: Number }

  connect() {
    this.load()
    this.refreshTimer = setInterval(() => { this.load() }, this.refreshIntervalValue)
  }

  disconnect() {
    clearInterval(this.refreshTimer)
  }

  load() {
    fetch("api/activities/next")
      .then(response => response.json())
      .then(data => this.element.innerHTML = data.Symbol)
  }
}
