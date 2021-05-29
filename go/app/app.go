package app

import (
	"server/app/handlers"
)

type appImp struct {
	router Router
	db     DB
}

func New(db DB, router Router) App {

	router.Get("/", handlers.Home)
	router.Get("/activities", nil)
	router.Post("/activities", nil)
	router.Get("/activities/new", nil)
	router.Get("/activities/:id/edit", nil)
	router.Patch("/activities/:id", nil)
	router.Put("/activities/:id", nil)
	router.Delete("/activities/:id", nil)
	router.Get("/weather", nil)
	router.Get("/weather_full", nil)

	return &appImp{
		router: router,
		db:     db,
	}
}

func (a *appImp) Close() {
	a.db.Close()
}

func (a *appImp) Start() {
	a.router.Start()
}
