package datastore

import (
	"database/sql"
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

type datastore struct {
	db *sql.DB
}

func NewSqliteDatastore(path string) (Datastore, error) {
	db, err := sql.Open("sqlite3", path)
	if err != nil {
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		return nil, err
	}

	_, err = db.Exec(createActivitiesTable)
	if err != nil {
		return nil, err
	}

	return &datastore{
		db: db,
	}, nil
}

func (s *datastore) Close() error {
	return s.db.Close()
}

func (s *datastore) FindById(id int64) (*models.Activity, error) {
	var a models.Activity
	var start string
	query := "SELECT id, symbol, start, note FROM activities WHERE id=?"
	err := s.db.QueryRow(query, id).Scan(&a.ID, &a.Symbol, &start, &a.Note)
	if err != nil {
		return nil, err
	}

	a.Start, err = time.Parse(time.RFC3339, start)
	if err != nil {
		return nil, err
	}

	return &a, nil
}

func (s *datastore) Find() ([]*models.Activity, error) {
	query := "SELECT id, symbol, start, note FROM activities"
	rows, err := s.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	activities := make([]*models.Activity, 0)
	for rows.Next() {
		var a models.Activity
		var start string
		err := rows.Scan(&a.ID, &a.Symbol, &start, &a.Note)
		if err != nil {
			return nil, err
		}

		a.Start, err = time.Parse(time.RFC3339, start)
		if err != nil {
			return nil, err
		}

		activities = append(activities, &a)
	}

	return activities, nil
}

func (s *datastore) Create(a *models.Activity) error {
	query := "INSERT INTO activities(symbol, start, note) VALUES (?,?,?) RETURNING id"
	return s.db.QueryRow(query, a.Symbol, a.Start, a.Note).Scan(&a.ID)
}

func (s *datastore) Update(a *models.Activity) error {
	query := "UPDATE activities SET symbol=?, start=?, note=? WHERE id=?"
	_, err := s.db.Exec(query, a.Symbol, a.Start, a.Note, a.ID)
	return err
}

func (s *datastore) Delete(id int64) error {
	query := "DELETE FROM activities WHERE id=?"
	_, err := s.db.Exec(query, id)
	return err
}
