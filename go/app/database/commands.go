package database

const createActivitiesTable = `
CREATE TABLE IF NOT EXISTS activities
(
	id INTEGER PRIMARY KEY,
	symbol TEXT,
	time TIME,
	note TEXT
)
`

const insertActivity = `
INSERT INTO activities(symbol, time, note) VALUES($1, $2, $3) RETURNING id
`

const getActivities = `
SELECT (id, symbol, time, note) FROM activities
`

const deleteActivity = `
DELETE FROM activities WHERE id = $1
`
