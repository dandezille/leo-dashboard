package database

const createActivitiesTable = `
CREATE TABLE IF NOT EXISTS activities
(
	id SERIAL PRIMARY KEY,
	symbol TEXT,
	time TIME,
	note TEXT
)
`
