package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"

	"server/app/database"
)

func main() {
	db := database.Open("./data.db")
	defer db.Close()

	r := mux.NewRouter()
	r.Use(logRequests)

	r.HandleFunc("/", handleHome)

	srv := &http.Server{
		Addr:         "0.0.0.0:8080",
		WriteTimeout: time.Second * 15,
		ReadTimeout:  time.Second * 15,
		IdleTimeout:  time.Second * 15,
		Handler:      r,
	}

	log.Fatal(srv.ListenAndServe())
}

func logRequests(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.RequestURI)
		next.ServeHTTP(w, r)
	})
}

func handleHome(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
}
