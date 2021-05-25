package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

type App struct {
	Port string
}

func index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "hello world\n")
}

func (a *App) Start() {
	addr := fmt.Sprintf(":%s", a.Port)
	log.Printf("Starting app on %s", addr)

	http.Handle("/", logreq(index))

	log.Fatal(http.ListenAndServe(addr, nil))
}

func logreq(f func(w http.ResponseWriter, r *http.Request)) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("path: %s", r.URL.Path)
		f(w, r)
	})
}

func env(key, defaultValue string) string {
	val, ok := os.LookupEnv(key)
	if !ok {
		return defaultValue
	}
	return val
}

func main() {
	server := App{
		Port: env("PORT", "8080"),
	}
	server.Start()
}
