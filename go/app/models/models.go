package models

import (
	"time"
)

type Activity struct {
	Symbol string
	Start  time.Time
}

type Activities struct {
	Current Activity
	Next    Activity
}

type Temperature struct {
	Min int
	Now int
	Max int
}
