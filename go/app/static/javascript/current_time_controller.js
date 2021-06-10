import twoDigits from './utils.js'

export default class CurrentTimeController extends Stimulus.Controller {
  static get targets() {
    return [ "name" ]
  }

  connect() {
    this.load()
    this.refreshTimer = setInterval(() => { this.load() }, 1000)
  }

  disconnect() {
    clearInterval(this.refreshTimer)
  }

  load() {
    const now = new Date()
    this.element.innerHTML = twoDigits(now.getHours()) + ":" + twoDigits(now.getMinutes())
  }
}

