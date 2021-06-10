export default class NextActivityController extends Stimulus.Controller {
  connect() {
    this.load()
    this.refreshTimer = setInterval(() => { this.load() }, 1000)
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
