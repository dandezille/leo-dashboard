package app

import (
	"fmt"
	"log"
	"net/http"
	"testing"

	"server/app/models"
)

type testDB struct {
	IsClosed bool
}

func (d *testDB) Close() {
	d.IsClosed = true
}

func (d *testDB) Create(a *models.Activity) {
	log.Fatal("Not implemented")
}

func (d *testDB) Delete(id int64) {
	log.Fatal("Not implemented")
}

func (d *testDB) FindActivity(id int64) *models.Activity {
	log.Fatal("Not implemented")
	return nil
}

func (d *testDB) GetActivities() []*models.Activity {
	log.Fatal("Not implemented")
	return nil
}

type testRouter struct {
	IsStarted bool
	Routes    []string
}

func (r *testRouter) Start() {
	r.IsStarted = true
}

func (r *testRouter) Get(path string, handler http.HandlerFunc) {
	r.Routes = append(r.Routes, fmt.Sprint("get ", path))
}

func (r *testRouter) Post(path string, handler http.HandlerFunc) {
	r.Routes = append(r.Routes, fmt.Sprint("post ", path))
}

func (r *testRouter) Put(path string, handler http.HandlerFunc) {
	r.Routes = append(r.Routes, fmt.Sprint("put ", path))
}

func (r *testRouter) Patch(path string, handler http.HandlerFunc) {
	r.Routes = append(r.Routes, fmt.Sprint("patch ", path))
}

func (r *testRouter) Delete(path string, handler http.HandlerFunc) {
	r.Routes = append(r.Routes, fmt.Sprint("delete ", path))
}

func assertHasRoute(t *testing.T, r *testRouter, spec string) {
	for _, s := range r.Routes {
		if spec == s {
			return
		}
	}

	t.Errorf("Route %s not defined", spec)
}

func TestAppNew(t *testing.T) {
	r := &testRouter{}
	New(&testDB{}, r)

	assertHasRoute(t, r, "get /")
	assertHasRoute(t, r, "get /activities")
	assertHasRoute(t, r, "post /activities")
	assertHasRoute(t, r, "get /activities/new")
	assertHasRoute(t, r, "get /activities/:id/edit")
	assertHasRoute(t, r, "patch /activities/:id")
	assertHasRoute(t, r, "put /activities/:id")
	assertHasRoute(t, r, "delete /activities/:id")
	assertHasRoute(t, r, "get /weather")
	assertHasRoute(t, r, "get /weather_full")
}

func TestAppStart(t *testing.T) {
	r := &testRouter{}
	a := appImp{
		router: r,
		db:     &testDB{},
	}

	a.Start()
	if !r.IsStarted {
		t.Error("Expected router to be started")
	}
}

func TestAppClose(t *testing.T) {
	d := &testDB{}
	a := appImp{
		router: &testRouter{},
		db:     d,
	}

	a.Close()
	if !d.IsClosed {
		t.Error("Expected database connection to be closed")
	}
}
