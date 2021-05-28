package main

import (
	"log"
	"net/http"
	"os"
	"server/app"
	"server/app/database"
	"time"
)

func main() {
	app := app.New()
	app.DB = &database.DB{}
	err := app.DB.Open()
	check(err)

	defer app.DB.Close()

	app.Router.HandleFunc("/api/activites", app.CreateActivityHandler()).Methods("POST")

	log.Println("App running...")

	srv := &http.Server{
		Handler:      app.Router,
		Addr:         "127.0.0.1:9000",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}

func check(e error) {
	if e != nil {
		log.Println(e)
		os.Exit(1)
	}
}
