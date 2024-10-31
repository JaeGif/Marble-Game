package models

import "time"

// models are simply representations of db tables that Go can use

type Score struct {
	Id        int       `json:"id"`
	Score     int       `json:"score"`
	UserName  string    `json:"user_name"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
