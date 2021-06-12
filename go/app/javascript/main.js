import CurrentTimeController from './current_time_controller.js'
import ActivitiesController from './activities_controller.js'

(() => {
  const application = Stimulus.Application.start()
  application.register("current-time", CurrentTimeController)
  application.register("activities", ActivitiesController)
})()
