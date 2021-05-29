package app

import (
	"server/app/database"
	"server/app/routes"
)

type App interface {
	Start()
	Close()
}

type appImp struct {
	router *routes.Router
	db     *database.DB
}

func New(db *database.DB) App {
	return &appImp{
		router: routes.New(),
		db:     db,
	}
}

func (a *appImp) Close() {
	a.db.Close()
}

func (a *appImp) Start() {
	a.router.Start()
}
