package repositories

import (
	"fmt"
	storage "marble-game-api/cmd/database"
	"marble-game-api/cmd/models"
	"time"
)

func CreateScore(Score models.Score) (models.Score, error) {
	// must create a brand new score
	db := storage.GetDB()
	var current_time = time.Now()
	fmt.Println(current_time)
	sqlStatement := `INSERT INTO scores (id, score, user_name, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING id`
	err := db.QueryRow(sqlStatement, Score.Id, Score.Score, Score.UserName, current_time, current_time).Scan(&Score.Id)
	if err != nil {
		return Score, err
	}

	return Score, nil
}

func UpdateScore(Score models.Score, id int) (models.Score, error) {
	// requires that score must already exist to use this one
	db := storage.GetDB()
	sqlStatement := `
	  UPDATE scores
	  SET score = $2, user_name = $3, updated_at = $4
	  WHERE id = $1
	  RETURNING id`
	err := db.QueryRow(sqlStatement, id, Score.Score, Score.UserName, time.Now()).Scan(&id)
	if err != nil {
		return models.Score{}, err
	}
	Score.Id = id
	return Score, nil
}
