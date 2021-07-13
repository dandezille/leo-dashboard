package datastore

import (
	"log"
	"os"
	"testing"
	"time"

	"server/app/models"
)

func createDatastore(file string, t *testing.T) (*Datastore, func()) {
	store := Open(file)

	return store, func() {
		store.Close()
		err := os.Remove(file)
		if err != nil {
			t.Fatal(err)
		}
	}
}

func TestOpenClose(t *testing.T) {
	_, cleanup := createDatastore("test.db", t)
	if _, err := os.Stat("test.db"); os.IsNotExist(err) {
		t.Fatal("Expected test.db to exist")
	}

	cleanup()
	if _, err := os.Stat("test.db"); !os.IsNotExist(err) {
		t.Fatal(err)
	}
}

func TestCreateGet(t *testing.T) {
	store, cleanup := createDatastore("test.db", t)
	defer cleanup()

	activity := &models.Activity{
		Symbol: "a",
		Start:  time.Now().Round(0),
		Note:   "note",
	}

	store.CreateActivity(activity)

	if activity.ID == 0 {
		t.Fatal("ID should be non-zero")
	}

	got := store.GetActivity(activity.ID)
	if *got != *activity {
		log.Printf("activity %+v\n", activity)
		log.Printf("got %+v\n", got)
		t.Fatal("Expected activities to match")
	}
}

func TestGetAll(t *testing.T) {
	store, cleanup := createDatastore("test.db", t)
	defer cleanup()

	activities := []*models.Activity{
		&models.Activity{
			Symbol: "a",
			Start:  time.Now().Round(0).Add(time.Hour),
			Note:   "note a",
		},
	}

	for _, element := range activities {
		store.CreateActivity(element)
	}

	got := store.GetActivities()

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
	store, cleanup := createDatastore("test.db", t)
	defer cleanup()

	activity := &models.Activity{
		Symbol: "a",
		Start:  time.Now().Round(0),
		Note:   "note",
	}

	store.CreateActivity(activity)

	activity.Symbol = "b"
	store.UpdateActivity(activity)

	got := store.GetActivity(activity.ID)
	if got.Symbol != "b" {
		t.Fatal("Symbol should have changed")
	}
}

func TestDelete(t *testing.T) {
	store, cleanup := createDatastore("test.db", t)
	defer cleanup()

	activity := &models.Activity{
		Symbol: "a",
		Start:  time.Now().Round(0),
		Note:   "note",
	}

	store.CreateActivity(activity)
	store.DeleteActivity(activity.ID)

	got := store.GetActivities()
	if len(got) != 0 {
		t.Fatal("Expected to find no activities")
	}
}
