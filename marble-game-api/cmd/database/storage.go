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

	dbHost := os.Getenv("RAILWAY_DB_HOST")
	dbPort := os.Getenv("RAILWAY_DB_PORT")
	dbUser := os.Getenv("RAILWAY_DB_USER")
	dbPass := os.Getenv("RAILWAY_DB_PASSWORD")
	dbName := os.Getenv("RAILWAY_DB_NAME")
	dbExt := os.Getenv("RAILWAY_DB_EXT")

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

func GetDB() *sql.DB {
	return db
}
func CreateTable() {
	pgsqlStatement := `CREATE TABLE IF NOT EXISTS scores (
    id SERIAL PRIMARY KEY,
    score INTEGER NOT NULL,
    user_name STRING NOT NULL,
    created_at DATE NOT NULL
    updated_at DATE NOT NULL
    final_time INTEGER NOT NULL,
)`

	// Execute the query
	_, err := db.Exec(pgsqlStatement)
	if err != nil {
		log.Fatalf("Failed to create table: %v", err)
	}

	fmt.Println("Table created successfully.")
}
