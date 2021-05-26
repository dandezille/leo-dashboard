package database

import "server/app/models"

func (d *DB) CreateActivity(a *models.Activity) error {
	res, err := d.db.Exec(insertActivitySchema, a.Symbol, a.Note)
	if err != nil {
		return err
	}

	res.LastInsertId()
	return err
}

func (d *DB) GetActivities() ([]*models.Activity, error) {
	var activities []*models.Activity
	err := d.db.Select(&activities, "SELECT * from activities")
	if err != nil {
		return activities, err
	}

	return activities, nil
}
