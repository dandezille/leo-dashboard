package main

import (
	"fmt"
	"log"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello from %s!", r.URL.Path[1:])
}

func main() {
	http.HandleFunc("/", handler)
	log.Print("Starting server...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
