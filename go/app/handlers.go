package app

import (
	"fmt"
	"log"
	"net/http"
	"server/app/models"
)

func (a *App) IndexHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Welcome to server")
	}
}

func (a *App) CreateActivityHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		req := models.ActivityRequest{}
		err := parse(w, r, &req)
		if err != nil {
			log.Printf("Cannot parse activity body. err=%v \n", err)
			sendResponse(w, r, nil, http.StatusBadRequest)
			return
		}

		p := &models.Activity{
			ID:     0,
			Symbol: req.Symbol,
			Note:   req.Note,
		}

		log.Printf("%s\n", p.Note)

		err = a.DB.CreateActivity(p)
		if err != nil {
			log.Printf("Cannot save post in DB. err=%v \n", err)
			sendResponse(w, r, nil, http.StatusInternalServerError)
			return
		}

		resp := mapActivityToJSON(p)
		sendResponse(w, r, resp, http.StatusOK)
	}
}
