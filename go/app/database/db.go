package database

import (
	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
	"log"
)

type ServerDB interface {
	Open() error
	Close() error
}

type DB struct {
	db *sqlx.DB
}

func (d *DB) Open() error {
	db, err := sqlx.Open("sqlite3", "./data.db")
	if err != nil {
		return err
	}

	log.Println("Database opened")

	db.MustExec(createSchema)
	log.Println("Schema applied")

	d.db = db
	return nil
}

func (d *DB) Close() error {
	return d.db.Close()
}
