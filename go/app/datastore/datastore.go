package datastore

import (
	"database/sql"
	"log"
	"time"

	_ "github.com/mattn/go-sqlite3"

	"server/app/models"
)

const createActivitiesTable = `
CREATE TABLE IF NOT EXISTS activities
(
	id INTEGER PRIMARY KEY,
	symbol TEXT,
	start DATETIME,
	note TEXT
)
`

const getActivities = `
SELECT id, symbol, start, note FROM activities
`

const getActivity = `
SELECT id, symbol, start, note FROM activities WHERE id=?
`

const insertActivity = `
INSERT INTO activities(symbol, start, note) VALUES (?,?,?) RETURNING id
`

const updateActivity = `
UPDATE activities SET symbol=?, start=?, note=? WHERE id=?
`

const deleteActivity = `
DELETE FROM activities WHERE id=?
`

type Datastore struct {
	db *sql.DB
}

func Open(path string) *Datastore {
	db, err := sql.Open("sqlite3", path)
	if err != nil {
		log.Fatal(err)
	}

	_, err = db.Exec(createActivitiesTable)
	if err != nil {
		log.Fatal(err)
	}

	return &Datastore{
		db: db,
	}
}

func (s *Datastore) Close() {
	err := s.db.Close()
	if err != nil {
		log.Fatal(err)
	}
}

func (s *Datastore) GetActivities() []*models.Activity {
	rows, err := s.db.Query(getActivities)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var activities []*models.Activity
	for rows.Next() {
		var a models.Activity
		var start string
		err := rows.Scan(&a.ID, &a.Symbol, &start, &a.Note)
		if err != nil {
			log.Fatal(err)
		}

		a.Start, err = time.Parse(time.RFC3339, start)
		if err != nil {
			log.Fatal(err)
		}

		activities = append(activities, &a)
	}

	return activities
}

func (s *Datastore) GetActivity(id int64) *models.Activity {
	var a models.Activity
	var start string
	err := s.db.QueryRow(getActivity, id).Scan(&a.ID, &a.Symbol, &start, &a.Note)
	if err != nil {
		log.Fatal(err)
	}

	a.Start, err = time.Parse(time.RFC3339, start)
	if err != nil {
		log.Fatal(err)
	}

	return &a
}

func (s *Datastore) CreateActivity(a *models.Activity) {
	err := s.db.QueryRow(insertActivity, a.Symbol, a.Start, a.Note).Scan(&a.ID)
	if err != nil {
		log.Fatal(err)
	}
}

func (s *Datastore) UpdateActivity(a *models.Activity) {
	_, err := s.db.Exec(updateActivity, a.Symbol, a.Start, a.Note, a.ID)
	if err != nil {
		log.Fatal(err)
	}
}

func (s *Datastore) DeleteActivity(id int64) {
	_, err := s.db.Exec(deleteActivity, id)
	if err != nil {
		log.Fatal(err)
	}
}
