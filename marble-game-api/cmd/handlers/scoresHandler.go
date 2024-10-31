package handlers

import (
	storage "marble-game-api/cmd/database"
	"marble-game-api/cmd/models"
	"marble-game-api/cmd/repositories"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func GetScores(c echo.Context) error {

	db := storage.GetDB()

	if db == nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Database connection failed")
	}

	psqlStatement := `SELECT * FROM scores LIMIT 10`

	rows, err := db.Query(psqlStatement)

	if err != nil {
		// query fails
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	var scores []models.Score

	for rows.Next() {
		// need to go across pgsqls result and assign the results to a slice
		var score models.Score
		if err := rows.Scan(&score.Id, &score.Score, &score.UserName, &score.CreatedAt, &score.UpdatedAt); err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
		}
		scores = append(scores, score)
	}
	if err := rows.Err(); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, scores)
}
func CreateScore(c echo.Context) error {
	score := models.Score{}
	c.Bind(&score)
	newScore, err := repositories.CreateScore(score)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())

	}

	return c.JSON(http.StatusCreated, newScore)
}

func UpdateScore(c echo.Context) error {
	id := c.Param("id")

	idInt, err := strconv.Atoi(id)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())

	}
	score := models.Score{}
	c.Bind(&score)
	updatedScore, err := repositories.UpdateScore(score, idInt)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())

	}
	return c.JSON(http.StatusOK, updatedScore)

}
