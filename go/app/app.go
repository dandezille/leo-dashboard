package app

import (
	"github.com/gorilla/mux"
	"server/app/database"
)

type App struct {
	Router *mux.Router
	DB     database.ServerDB
}

func New() *App {
	a := &App{
		Router: mux.NewRouter(),
	}

	a.initRoutes()
	return a
}

func (a *App) initRoutes() {
	a.Router.HandleFunc("/", a.IndexHandler()).Methods("GET")
}
