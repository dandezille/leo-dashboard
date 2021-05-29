package main

import (
	"server/app"
	"server/app/database"
	"server/app/router"
)

func main() {
	db := database.Open("./data.db")
	r := router.New()
	a := app.New(db, r)
	defer a.Close()
	a.Start()
}
