package database

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

type DB struct {
	db *sql.DB
}

func Open() *DB {
	db, err := sql.Open("sqlite3", "./data.db")
	if err != nil {
		log.Fatal(err)
	}

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
