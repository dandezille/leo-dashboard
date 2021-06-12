package app

import (
	"html/template"
	"log"
	"net/http"
)

func HandleHome(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)

	err := renderPage("app/views/pages/home.html", w)
	if err != nil {
		log.Fatal(err)
	}
}

func renderPage(page string, w http.ResponseWriter) error {
	// partials
	templates := template.Must(template.ParseGlob("app/views/**/_*.html"))

	// layouts
	templates = template.Must(templates.ParseGlob("app/views/layouts/*.html"))

	templates = template.Must(templates.ParseGlob(page))

	return templates.ExecuteTemplate(w, "layout", nil)
}
