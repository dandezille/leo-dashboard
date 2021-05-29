package app

import (
	"net/http"
	"server/app/models"
)

type App interface {
	Start()
	Close()
}

type DB interface {
	Close()

	FindActivity(id int64) *models.Activity
	GetActivities() []*models.Activity
	Create(*models.Activity)
	Delete(id int64)
}

type Router interface {
	Start()
	Get(path string, handler http.HandlerFunc)
	Post(path string, handler http.HandlerFunc)
	Put(path string, handler http.HandlerFunc)
	Patch(path string, handler http.HandlerFunc)
	Delete(path string, handler http.HandlerFunc)
}
