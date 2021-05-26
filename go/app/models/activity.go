package models

type Activity struct {
	ID     int64  `db:"id"`
	Symbol string `db:"symbol"`
	Note   string `db:"note"`
}

type JsonActivity struct {
	ID     int64  `json:"id"`
	Symbol string `json:"symbol"`
	Note   string `json:"note"`
}

type ActivityRequest struct {
	Symbol string `json:"symbol"`
	Note   string `json:"note"`
}
