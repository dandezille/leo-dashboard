package datastore

import (
	"io/ioutil"
	"os"
	"testing"
	"time"

	"server/app/models"

	"github.com/stretchr/testify/assert"
)

func create(t *testing.T) (Datastore, func()) {
	temp, err := ioutil.TempFile("", "testdb_")
	assert.NoError(t, err)

	store, err := NewSqliteDatastore(temp.Name())
	assert.NoError(t, err)

	return store, func() {
		store.Close()
		temp.Close()
		err := os.Remove(temp.Name())
		assert.NoError(t, err)
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

	assert.NoError(t, store.Create(&activity))
	assert.NotEqual(t, 0, activity.ID)

	got, err := store.FindById(activity.ID)
	assert.NoError(t, err)
	if assert.NotNil(t, got) {
		assert.Equal(t, activity, *got)
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
		assert.NoError(t, store.Create(element))
	}

	got, err := store.Find()
	assert.NoError(t, err)
	if assert.NotNil(t, got) {
		assert.Len(t, got, 1)
	}

	for index, element := range activities {
		assert.Equal(t, element, got[index])
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

	assert.NoError(t, store.Create(&activity))

	activity.Symbol = "b"
	assert.NoError(t, store.Update(&activity))

	got, err := store.FindById(activity.ID)
	assert.NoError(t, err)
	if assert.NotNil(t, got) {
		assert.Equal(t, "b", got.Symbol)
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

	assert.NoError(t, store.Create(&activity))
	assert.NoError(t, store.Delete(activity.ID))

	got, err := store.Find()
	assert.NoError(t, err)
	if assert.NotNil(t, got) {
		assert.Empty(t, got)
	}
}
