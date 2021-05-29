package app

import (
	"server/app/routes"
)

type App interface {
	Start()
	Close()
}

type DB interface {
	Close()
}

type appImp struct {
	router *routes.Router
	db     DB
}

func New(db DB) App {
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
