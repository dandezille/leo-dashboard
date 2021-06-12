package app

import (
	"encoding/json"
	"html/template"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

type Activity struct {
	Symbol string
	Start  time.Time
}

type Activities struct {
	Current Activity
	Next    Activity
}

func SetupRouter() *mux.Router {
	r := mux.NewRouter()
	r.Use(logRequests)

	r.HandleFunc("/", handleHome)

	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./app/static"))))
	r.PathPrefix("/javascript/").Handler(http.StripPrefix("/javascript/", http.FileServer(http.Dir("./app/javascript"))))

	api := r.PathPrefix("/api").Subrouter()
	api.HandleFunc("/activities", handleActivities)

	return r
}

func logRequests(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.RequestURI)
		next.ServeHTTP(w, r)
	})
}

func handleHome(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)

	files := []string{
		"app/views/layouts/layout.html",
		"app/views/pages/home.html",
	}

	templates := template.Must(template.ParseFiles(files...))

	data := struct {
		TimeRemaining string
		TempMin       int
		TempCurrent   int
		TempMax       int
	}{
		"21 hours",
		14,
		16,
		17,
	}

	err := templates.ExecuteTemplate(w, "layout", data)
	if err != nil {
		log.Fatal(err)
	}
}

func handleActivities(w http.ResponseWriter, r *http.Request) {
	data := Activities{
		Current: Activity{
			Symbol: "A",
			Start:  time.Now().Local(),
		},
		Next: Activity{
			Symbol: "B",
			Start:  time.Now().Local().Add(time.Hour * time.Duration(1)),
		},
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(data)
}
