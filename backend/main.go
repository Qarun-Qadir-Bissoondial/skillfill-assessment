package main

import (
	"context"
	"fmt"
	"log"

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

	dbClient, err := app.Database(context.Background())
	if err != nil {
		log.Fatalln(err)
		panic("Could not connect to Firebase Database")
	}

	r := gin.Default()
	r.GET("/quiz", func(c *gin.Context) {
		quiz := Quiz{}
		quizID := c.Query("quizID")
		dbClient.NewRef("/quiz/"+quizID).Get(context.Background(), &quiz)
		c.JSON(200, quiz)
	})

	r.GET("/question", func(c *gin.Context) {
		question := Question{}
		questionID := c.Query("questionID")
		dbClient.NewRef("/questions/"+questionID).Get(context.Background(), &question)
		log.Println(question)
		c.JSON(200, question)
	})

	r.PUT("/submit-question", func(c *gin.Context) {
		s := SubmittedAnswer{}
		c.BindJSON(&s)
		b := map[string]int{}
		b[s.QuestionID] = s.Submitted
		log.Println(b)
		err := dbClient.NewRef(fmt.Sprintf("/submitted/%s/", s.QuizID)).Set(context.Background(), b)
		if err != nil {
			c.JSON(400, map[string]string{
				"message": "check your params",
			})
		}
		c.JSON(200, map[string]string{
			"message": "okay",
		})
	})

	r.Run()
}
