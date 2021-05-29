package app

import (
	"testing"
)

type testDB struct {
	IsClosed bool
}

func (d *testDB) Close() {
	d.IsClosed = true
}

type testRouter struct {
	IsStarted bool
}

func (r *testRouter) Start() {
	r.IsStarted = true
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
