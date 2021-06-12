package api

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/gorilla/mux"

	"server/app/models"
)

func SetupRoutes(r *mux.Router) {
	r.HandleFunc("/activities", handleActivities)
}

func handleActivities(w http.ResponseWriter, r *http.Request) {
	data := models.Activities{
		Current: models.Activity{
			Symbol: "A",
			Start:  time.Now().Local(),
		},
		Next: models.Activity{
			Symbol: "B",
			Start:  time.Now().Local().Add(time.Hour * time.Duration(1)),
		},
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(data)
}
