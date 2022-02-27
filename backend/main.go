package main

import (
	"context"
	"log"

	firebase "firebase.google.com/go"
	"github.com/gin-gonic/gin"
	"google.golang.org/api/option"
)

type Quiz struct {
	id          string   `json:"id"`
	name        string   `json:"name"`
	description string   `json:"description"`
	questions   []string `json:"questions"`
	timeLimit   int      `json:"timeLimit"`
	score       int      `json:"score"`
}

func main() {
	opt := option.WithCredentialsFile("p_key.json")
	conf := &firebase.Config{
		DatabaseURL: "https://skillfill-assessment-default-rtdb.firebaseio.com/",
	}
	app, err := firebase.NewApp(context.Background(), conf, opt)
	if err != nil {
		panic("Could not authenticate Admin User")
	}

	dbClient, err := app.Database(context.Background())
	if err != nil {
		log.Fatalln(err)
		panic("Could not connect to Firebase Database")
	}

	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		var quiz Quiz

		quizID := c.Query("quizID")
		dbClient.NewRef("/quiz/"+quizID).Get(context.Background(), quiz)
		c.JSON(200, gin.H{
			"message": quiz,
		})
	})

	r.Run()
}
