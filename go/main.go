package main

import (
	"server/app"
	"server/app/database"
)

func main() {
	db := database.Open()
	a := app.New(db)
	defer a.Close()
	a.Start()
}
