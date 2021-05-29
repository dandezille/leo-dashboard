package app

type App interface {
	Start()
	Close()
}

type DB interface {
	Close()
}

type Router interface {
	Start()
}

type appImp struct {
	router Router
	db     DB
}

func New(db DB, router Router) App {
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
