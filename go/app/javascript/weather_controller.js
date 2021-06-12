export default class WeatherController extends Stimulus.Controller {
  static get targets () {
    return [ "min", "now", "max" ]
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
    console.log(data)
    this.minTarget.innerHTML = data.Min
    this.nowTarget.innerHTML = data.Now
    this.maxTarget.innerHTML = data.Max
  }
}
