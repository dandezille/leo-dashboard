import TimeController from './time_controller.js'
import ActivitiesController from './activities_controller.js'
import WeatherController from './weather_controller.js'

(() => {
  const application = Stimulus.Application.start()
  application.register("time", TimeController)
  application.register("activities", ActivitiesController)
  application.register("weather", WeatherController)
})()
