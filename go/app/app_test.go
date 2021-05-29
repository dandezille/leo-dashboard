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
	d := &testDB{}
	a := appImp{
		router: r,
		db:     d,
	}

	a.Start()
	if !r.IsStarted {
		t.Error("Expected router to be started")
	}
}
