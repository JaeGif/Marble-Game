package main

import (
	"fmt"
	"log"
	storage "marble-game-api/cmd/database"
)

func main() {
	db := storage.GetDB()

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
