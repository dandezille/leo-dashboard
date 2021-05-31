package app

import (
	"net/http"
	"text/template"
)

func (a *appImp) home(w http.ResponseWriter, r *http.Request) {
	private_tmpl_files := []string{
		"app/views/layouts/layout.html",
		"app/views/pages/home.html",
	}

	templates := template.Must(template.ParseFiles(private_tmpl_files...))
	templates.ExecuteTemplate(w, "layout", nil)
}

func (a *appImp) getActivities(w http.ResponseWriter, r *http.Request) {
}

func (a *appImp) postActivities(w http.ResponseWriter, r *http.Request) {
}

func (a *appImp) getActivitiesNew(w http.ResponseWriter, r *http.Request) {
}

func (a *appImp) getActivityEdit(w http.ResponseWriter, r *http.Request) {
}

func (a *appImp) patchActivity(w http.ResponseWriter, r *http.Request) {
}

func (a *appImp) putActivity(w http.ResponseWriter, r *http.Request) {
}

func (a *appImp) deleteActivity(w http.ResponseWriter, r *http.Request) {
}

func (a *appImp) getWeather(w http.ResponseWriter, r *http.Request) {
}

func (a *appImp) getWeatherFull(w http.ResponseWriter, r *http.Request) {
}
