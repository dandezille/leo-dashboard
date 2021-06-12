package main

import (
	"log"
	"net/http"
	"time"

	"server/app"
)

func main() {
	srv := &http.Server{
		Addr:         "0.0.0.0:8080",
		WriteTimeout: time.Second * 15,
		ReadTimeout:  time.Second * 15,
		IdleTimeout:  time.Second * 15,
		Handler:      app.SetupRouter(),
	}

	log.Print("Server starting")
	log.Fatal(srv.ListenAndServe())
}
