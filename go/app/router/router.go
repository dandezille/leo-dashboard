package router

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

func (r *Router) Get(path string, handler http.HandlerFunc) {}

func (r *Router) Post(path string, handler http.HandlerFunc) {}

func (r *Router) Put(path string, handler http.HandlerFunc) {}

func (r *Router) Patch(path string, handler http.HandlerFunc) {}

func (r *Router) Delete(path string, handler http.HandlerFunc) {}

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.RequestURI)
		next.ServeHTTP(w, r)
	})
}
