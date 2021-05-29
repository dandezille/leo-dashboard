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
	Create(*models.Activity)
}

type Router interface {
	Start()
	Get(path string, handler http.HandlerFunc)
	Post(path string, handler http.HandlerFunc)
	Put(path string, handler http.HandlerFunc)
	Patch(path string, handler http.HandlerFunc)
	Delete(path string, handler http.HandlerFunc)
}
