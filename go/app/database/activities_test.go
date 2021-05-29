package database

import (
	"os"
	"testing"
	"time"

	"server/app/models"
)

func TestCreateActivity(t *testing.T) {
	os.Remove("test.db")
	db := Open("test.db")
	defer db.Close()

	a := &models.Activity{
		Symbol: "a",
		Time:   8 * time.Hour,
		Note:   "sample",
	}

	db.Create(a)

	if a.ID == 0 {
		t.Error("Expected id to be set")
	}
}

func TestGetActivities(t *testing.T) {
	os.Remove("test.db")
	db := Open("test.db")
	defer db.Close()

	a := &models.Activity{
		Symbol: "a",
		Time:   8 * time.Hour,
		Note:   "sample",
	}

	db.Create(a)

	activities := db.GetActivities()
	if len(activities) == 0 {
		t.Error("Expected to find an activity")
	}

	if a != activities[0] {
		t.Errorf("Expected fetched activity %+v to equal %+v", activities[0], a)
	}
}
