export default class WeatherController extends Stimulus.Controller {
  static get targets () {
    return [ "min", "current", "max" ]
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
    fetch("api/weather")
      .then(response => response.json())
      .then(data => this.update(data))
  }

  update(data) {
    this.minTarget.innerHTML = data.Min
    this.currentTarget.innerHTML = data.Current
    this.maxTarget.innerHTML = data.Max
  }
}
