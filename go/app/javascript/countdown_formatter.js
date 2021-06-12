export default class CountdownFormatter {
  format(targetTime) {
    var remaining = this._diffNow(targetTime)
    console.log(remaining.toObject())

    var text = [ 
      this._hoursString(remaining), 
      this._minutesString(remaining),
      this._secondsString(remaining)
    ].filter((x) => x != null)

    return text.join(', ').trim()
  }

  _diffNow(time) {
    return luxon.DateTime.fromISO(time)
      .diffNow(['hours', 'minutes', 'seconds', 'milliseconds'])
  }

  _hoursString(diff) { 
    return diff.hours > 0 ? diff.hours + ' hours' : null
  }

  _minutesString(diff) { 
    return diff.minutes > 0 ? diff.minutes + ' minutes' : null
  }

  _secondsString(diff) { 
    return diff.seconds > 0 ? diff.seconds + ' seconds' : null
  }
}
