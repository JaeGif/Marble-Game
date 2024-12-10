package repositories

import (
	"database/sql"
	"fmt"
	storage "marble-game-api/cmd/database"
	"marble-game-api/cmd/models"
	"reflect"
	"time"
)

func CreateScore(Score models.Score) (models.Score, error) {
	// must create a brand new score
	db := storage.GetDB()
	var current_time = time.Now()

	// add safeguard for the score typing
	if Score.Id == 0 || reflect.TypeOf(Score.FinalTime).Kind() != reflect.Int {
		return Score, fmt.Errorf("invalid input")
	}
	sqlStatement := `INSERT INTO scores (id, score, user_name, created_at, updated_at, final_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`
	err := db.QueryRow(sqlStatement, Score.Id, Score.Score, Score.UserName, current_time, current_time, Score.FinalTime).Scan(&Score.Id)
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
	  SET score = $2, user_name = $3, updated_at = $4, final_time = $5
	  WHERE id = $1
	  RETURNING id`
	err := db.QueryRow(sqlStatement, id, Score.Score, Score.UserName, time.Now(), Score.FinalTime).Scan(&id)
	if err != nil {
		return models.Score{}, err
	}
	Score.Id = id
	return Score, nil
}
func TruncateTableScores() (sql.Result, error) {
	db := storage.GetDB()
	sqlStatement := `TRUNCATE TABLE scores`

	result, err := db.Exec(sqlStatement)

	if err != nil {
		return nil, err
	}
	fmt.Println(result)

	return result, nil

}
