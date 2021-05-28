package routes

import (
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

type Router struct {
	router *mux.Router
}

func New() *Router {
	r := mux.NewRouter()

	r.HandleFunc("/", homeHandler)

	return &Router{
		router: r,
	}
}

func (r *Router) Start() {
	srv := &http.Server{
		Addr:         "0.0.0.0:8080",
		WriteTimeout: time.Second * 15,
		ReadTimeout:  time.Second * 15,
		IdleTimeout:  time.Second * 15,
		Handler:      r.router,
	}

	log.Fatal(srv.ListenAndServe())
}

func homeHandler(w http.ResponseWriter, r *http.Request) {

}
