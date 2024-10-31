CREATE TABLE scores {
    id SERIAL PRIMARY KEY,
    score INTEGER NOT NULL,
    user_name STRING NOT NULL,
    created_at DATE NOT NULL
    updated_at DATE NOT NULL
}