package app

import (
	"server/app/database"
	"server/app/routes"
)

type App struct {
	router *routes.Router
	db     *database.DB
}

func New() *App {
	return &App{
		router: routes.New(),
		db:     database.Open(),
	}
}

func (a *App) Close() {
	a.db.Close()
}

func (a *App) Start() {
	a.router.Start()
}
