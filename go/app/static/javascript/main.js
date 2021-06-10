import CurrentTimeController from './current_time_controller.js'
import CurrentActivityController from './current_activity_controller.js'
import NextActivityController from './next_activity_controller.js'

(() => {
  const application = Stimulus.Application.start()
  application.register("current-time", CurrentTimeController)
  application.register("current-activity", CurrentActivityController)
  application.register("next-activity", NextActivityController)
})()
