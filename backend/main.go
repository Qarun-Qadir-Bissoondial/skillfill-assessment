package main

import (
	"context"
	"fmt"
	"log"
	"skillfill-backend/database"

	firebase "firebase.google.com/go"
	"github.com/gin-gonic/gin"
	"google.golang.org/api/option"
)

type Quiz struct {
	Id          string   `json:"id"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Questions   []string `json:"questions"`
	TimeLimit   int      `json:"timeLimit"`
	Score       int      `json:"score,omitempty"`
}

type Question struct {
	Id              string   `json:"id"`
	Body            string   `json:"body"`
	CorrectAnswer   []int    `json:"correctAnswer"`
	PossibleAnswers []string `json:"possibleAnswers"`
}

type SubmittedAnswer struct {
	QuizID     string `json:"quiz"`
	QuestionID string `json:"question"`
	Submitted  int    `json:"submittedAnswer"`
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

	var database database.Database
	err = database.InitDB(app)
	if err != nil {
		panic("Could not initialize Firebase Database")
	}

	if err != nil {
		log.Fatalln(err)
		panic("Could not connect to Firebase Database")
	}

	r := gin.Default()
	r.GET("/quiz", func(c *gin.Context) {
		quiz := Quiz{}
		quizID := c.Query("quizID")
		err := database.Fetch("/quiz/"+quizID, &quiz)
		if err != nil {
			c.JSON(500, err)
		}
		c.JSON(200, quiz)
	})

	r.GET("/question", func(c *gin.Context) {
		question := Question{}
		questionID := c.Query("questionID")
		err := database.Fetch("/questions/"+questionID, &question)
		if err != nil {
			c.JSON(500, err)
		}
		c.JSON(200, question)
	})

	r.PUT("/submit-question", func(c *gin.Context) {
		s := SubmittedAnswer{}
		b := map[string]int{}
		c.BindJSON(&s)
		b[s.QuestionID] = s.Submitted
		log.Println(b)
		err := database.Set(fmt.Sprintf("/submitted/%s/", s.QuizID), b)
		if err != nil {
			c.JSON(400, map[string]string{
				"message": "bad data",
			})
		}
		c.JSON(200, map[string]string{
			"message": "okay",
		})
	})

	r.Run()
}
