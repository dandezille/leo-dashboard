function twoDigits(value) {
  return ('0' + value).slice(-2);
}

class CurrentTimeController extends Stimulus.Controller {
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

(() => {
  const application = Stimulus.Application.start()
  application.register("current-time", CurrentTimeController)
})()
