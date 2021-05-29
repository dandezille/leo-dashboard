package models

import (
	"time"
)

type Activity struct {
	ID     int64
	Symbol string
	Time   time.Duration
	Note   string
}
