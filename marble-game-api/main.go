package main

import (
	storage "marble-game-api/cmd/database"
	"marble-game-api/cmd/handlers"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()
	e.Debug = true
	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	storage.InitDB()

	e.GET("/", handlers.Home)

	// connect to DB

	// starting routes
	e.POST("/scores", handlers.CreateScore)
	e.GET("/scores", handlers.GetScores)
	e.DELETE("/scores_trunc_auth", handlers.TruncateTableScores)
	e.DELETE("/scores_drop_auth", handlers.DropTableScores)
	e.Use(handlers.LogRequest)
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{AllowOrigins: []string{"http://localhost:5173"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))
	// start server or log fatal
	e.Logger.Fatal(e.Start(":8080"))

}
