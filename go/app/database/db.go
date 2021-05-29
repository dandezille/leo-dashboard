package database

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

type DB struct {
	db *sql.DB
}

func Open(file string) *DB {
	db, err := sql.Open("sqlite3", file)
	if err != nil {
		log.Fatal(err)
	}

	setup(db)

	return &DB{
		db: db,
	}
}

func (d *DB) Close() {
	err := d.db.Close()
	if err != nil {
		log.Fatal(err)
	}
}

func setup(db *sql.DB) {
	_, err := db.Exec(createActivitiesTable)
	if err != nil {
		log.Fatal(err)
	}
}
