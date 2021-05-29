package database

import (
	"log"

	"server/app/models"
)

func (d *DB) GetActivities() []*models.Activity {
	var activities []*models.Activity
	return append(activities, &models.Activity{})
}

func (d *DB) Create(a *models.Activity) {
	err := d.db.QueryRow(insertActivity, a.Symbol, a.Time, a.Note).Scan(&a.ID)
	if err != nil {
		log.Fatal(err)
	}
}
