package app

import (
	"log"
	"net/http"
	"testing"
)

func TestHomeHandler(t *testing.T) {
	_, err := http.NewRequest("GET", "/", nil)
	if err != nil {
		log.Fatal(err)
	}
}
