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

const getActivities = `
SELECT id, symbol, time, note FROM activities
`

const findActivity = `
SELECT id, symbol, time, note FROM activities WHERE id=?
`

const insertActivity = `
INSERT INTO activities(symbol, time, note) VALUES(?, ?, ?) RETURNING id
`

const deleteActivity = `
DELETE FROM activities WHERE id=?
`
