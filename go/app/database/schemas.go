package database

const createSchema = `
CREATE TABLE IF NOT EXISTS activities
(
	id SERIAL PRIMARY KEY,
	symbol TEXT,
	note TEXT
)
`

var insertActivitySchema = `
INSERT INTO activities(symbol, note) VALUES($1, $2) RETURNING id
`
