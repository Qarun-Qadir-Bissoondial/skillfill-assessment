package database

import (
	"context"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/db"
)

type Database struct {
	client *db.Client
}

func (db *Database) InitDB(app *firebase.App) error {
	client, err := app.Database(context.Background())
	if err != nil {
		panic(err)
	}
	db.client = client
	return err
}

func (db *Database) Fetch(path string, dataPtr interface{}) error {
	error := db.client.NewRef(path).Get(context.Background(), dataPtr)
	return error
}

func (db *Database) Set(path string, data interface{}) error {
	error := db.client.NewRef(path).Set(context.Background(), data)
	return error
}
