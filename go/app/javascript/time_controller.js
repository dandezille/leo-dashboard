export default class TimeController extends Stimulus.Controller {
  connect() {
    this.load()
    this.refreshTimer = setInterval(() => { this.load() }, 1000)
  }

  disconnect() {
    clearInterval(this.refreshTimer)
  }

  load() {
    const now = luxon.DateTime.now()
    this.element.innerHTML = now.toLocaleString(luxon.DateTime.TIME_SIMPLE)
  }
}

