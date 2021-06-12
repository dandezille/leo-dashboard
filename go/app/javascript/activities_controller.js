import CountdownFormatter from './countdown_formatter.js'

export default class ActivitiesController extends Stimulus.Controller {
  static get targets () {
    return [ "current", "next", "remaining", "progress" ]
  }

  static values = { 
    refreshInterval: Number,
    progressRadius: Number
  }

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

    const formatter = new CountdownFormatter()
    this.remainingTarget.innerHTML = formatter.format(data.Next.Start)

    this.updateProgress(data)
  }

  updateProgress(data) {
    const now = luxon.DateTime.now()
    const current = luxon.DateTime.fromISO(data.Current.Start)
    const next = luxon.DateTime.fromISO(data.Next.Start)

    const progress = (now - current) / (next - current)
    console.log('progress: ' + progress)

    const circumference = this.progressRadiusValue * 2 * Math.PI
    const offset = circumference - progress * circumference

    this.progressTarget.setAttribute('stroke-width', 1 - this.progressRadiusValue)
    this.progressTarget.setAttribute('stroke-dasharray', circumference + ' ' + circumference)
    this.progressTarget.setAttribute('stroke-dashoffset', offset)
    this.progressTarget.setAttribute('r', this.progressRadiusValue)
  }
}

