package router

import (
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"

	"server/app/handlers"
)

type Router struct {
	router *mux.Router
}

func New() *Router {
	r := mux.NewRouter()

	r.HandleFunc("/", handlers.Home)
	r.HandleFunc("/activities", nil)
	r.HandleFunc("/activities", nil).Methods("POST")
	r.HandleFunc("/activities/new", nil)
	r.HandleFunc("/activities/:id/edit", nil)
	r.HandleFunc("/activities/:id", nil).Methods("PATCH")
	r.HandleFunc("/activities/:id", nil).Methods("PUT")
	r.HandleFunc("/activities/:id", nil).Methods("DELETE")
	r.HandleFunc("/weather", nil)
	r.HandleFunc("/weather_full", nil)

	r.Use(loggingMiddleware)

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

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.RequestURI)
		next.ServeHTTP(w, r)
	})
}
