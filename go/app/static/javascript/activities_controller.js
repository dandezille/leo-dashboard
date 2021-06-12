export default class ActivitiesController extends Stimulus.Controller {
  static get targets () {
    return [ "current", "next" ]
  }

  static values = { refreshInterval: Number }

  connect() {
    this.load()
    this.refreshTimer = setInterval(() => { this.load() }, this.refreshIntervalValue)
  }

  disconnect() {
    clearInterval(this.refreshTimer)
  }

  load() {
    fetch("api/activities")
      .then(response => response.json())
      .then(data => this.update(data))
  }

  update(data) {
      this.currentTarget.innerHTML = data.Current.Symbol
      this.nextTarget.innerHTML = data.Next.Symbol
  }
}
