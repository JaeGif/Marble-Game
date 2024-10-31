package storage

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"

	_ "github.com/lib/pq"
)


var db *sql.DB

func InitDB() {
  err := godotenv.Load()
  if err != nil {
    log.Fatal("Error loading .env file")
  }

  dbHost := os.Getenv("DB_HOST")
  dbPort := os.Getenv("DB_PORT")
  dbUser := os.Getenv("DB_USER")
  dbPass := os.Getenv("DB_PASSWORD")
  dbName := os.Getenv("DB_NAME")
  dbExt := os.Getenv("DB_EXT")

  var dbString = fmt.Sprintf("%s://%s:%s@%s:%s/%s", dbName, dbUser, dbPass, dbHost, dbPort, dbExt)

  db, err = sql.Open("postgres", dbString)

  if err != nil {
    panic(err.Error())
  }

  err = db.Ping()
  
  if err != nil {
    panic(err.Error())
  }

  fmt.Println("Successfully connected to database")
}

func GetDB() *sql.DB{
    return db
}
