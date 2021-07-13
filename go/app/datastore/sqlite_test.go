package datastore

import (
	"io/ioutil"
	"log"
	"os"
	"testing"
	"time"

	"server/app/models"
)

func create(t *testing.T) (Datastore, func()) {
	temp, err := ioutil.TempFile("", "testdb_")
	if err != nil {
		t.Fatal(err)
	}

	store, err := NewSqliteDatastore(temp.Name())
	if err != nil {
		t.Fatal(err)
	}

	return store, func() {
		store.Close()
		temp.Close()
		err := os.Remove(temp.Name())
		if err != nil {
			t.Fatal(err)
		}
	}
}

func TestCreateGet(t *testing.T) {
	store, cleanup := create(t)
	defer cleanup()

	activity := models.Activity{
		Symbol: "a",
		Start:  time.Now().Round(0),
		Note:   "note",
	}

	err := store.Create(&activity)
	if err != nil {
		t.Fatal(err)
	}

	if activity.ID == 0 {
		t.Fatal("ID should be non-zero")
	}

	got, err := store.FindById(activity.ID)
	if err != nil {
		t.Fatal(err)
	}

	if *got != activity {
		log.Printf("activity %+v\n", activity)
		log.Printf("got %+v\n", got)
		t.Fatal("Expected activities to match")
	}
}

func TestGetAll(t *testing.T) {
	store, cleanup := create(t)
	defer cleanup()

	activities := []*models.Activity{
		&models.Activity{
			Symbol: "a",
			Start:  time.Now().Round(0).Add(time.Hour),
			Note:   "note a",
		},
	}

	for _, element := range activities {
		err := store.Create(element)
		if err != nil {
			t.Fatal(err)
		}
	}

	got, err := store.Find()
	if err != nil {
		t.Fatal(err)
	}

	if len(activities) != len(got) {
		t.Fatal("Expected activities count to match")
	}

	for index, element := range activities {
		if *element != *got[index] {
			t.Errorf("Activity %v missmatch\n%v\n%v\n", index, element, got[index])
		}
	}
}

func TestUpdate(t *testing.T) {
	store, cleanup := create(t)
	defer cleanup()

	activity := models.Activity{
		Symbol: "a",
		Start:  time.Now().Round(0),
		Note:   "note",
	}

	err := store.Create(&activity)
	if err != nil {
		t.Fatal(err)
	}

	activity.Symbol = "b"
	err = store.Update(&activity)
	if err != nil {
		t.Fatal(err)
	}

	got, err := store.FindById(activity.ID)
	if err != nil {
		t.Fatal(err)
	}

	if got.Symbol != "b" {
		t.Fatal("Symbol should have changed")
	}
}

func TestDelete(t *testing.T) {
	store, cleanup := create(t)
	defer cleanup()

	activity := models.Activity{
		Symbol: "a",
		Start:  time.Now().Round(0),
		Note:   "note",
	}

	err := store.Create(&activity)
	if err != nil {
		t.Fatal(err)
	}

	err = store.Delete(activity.ID)
	if err != nil {
		t.Fatal(err)
	}

	got, err := store.Find()
	if err != nil {
		t.Fatal(err)
	}

	if len(got) != 0 {
		t.Fatal("Expected to find no activities")
	}
}
