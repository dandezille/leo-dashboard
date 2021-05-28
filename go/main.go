package main

import (
	"server/app"
)

func main() {
	a := app.New()
	defer a.Close()
	a.Start()
}
