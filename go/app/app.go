package app

type appImp struct {
	router Router
	db     DB
}

func New(db DB, router Router) App {
	app := &appImp{
		router: router,
		db:     db,
	}

	router.Get("/", app.home)
	router.Get("/activities", app.getActivities)
	router.Post("/activities", app.postActivities)
	router.Get("/activities/new", app.getActivitiesNew)
	router.Get("/activities/:id/edit", app.getActivityEdit)
	router.Patch("/activities/:id", app.patchActivity)
	router.Put("/activities/:id", app.putActivity)
	router.Delete("/activities/:id", app.deleteActivity)
	router.Get("/weather", app.getWeather)
	router.Get("/weather_full", app.getWeatherFull)

	return app
}

func (a *appImp) Close() {
	a.db.Close()
}

func (a *appImp) Start() {
	a.router.Start()
}
