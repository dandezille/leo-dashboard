package app

import (
	"html/template"
	"log"
	"net/http"
)

func HandleHome(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)

	templates := template.Must(template.ParseGlob("app/views/**/_*.html"))
	templates = template.Must(templates.ParseGlob("app/views/layouts/*.html"))
	templates = template.Must(templates.ParseGlob("app/views/pages/home.html"))

	data := struct {
		TempMin     int
		TempCurrent int
		TempMax     int
	}{
		14,
		16,
		17,
	}

	err := templates.ExecuteTemplate(w, "layout", data)
	if err != nil {
		log.Fatal(err)
	}
}
