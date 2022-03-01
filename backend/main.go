package main

import (
	"context"
	"skillfill-backend/database"
	"skillfill-backend/routehandler"

	firebase "firebase.google.com/go"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"google.golang.org/api/option"
)

func main() {
	opt := option.WithCredentialsFile("p_key.json")
	conf := &firebase.Config{
		DatabaseURL: "https://skillfill-assessment-default-rtdb.firebaseio.com/",
	}
	app, err := firebase.NewApp(context.Background(), conf, opt)
	if err != nil {
		panic("Could not authenticate Admin User")
	}

	var fbDatabase database.Database
	err = fbDatabase.InitDB(app)
	if err != nil {
		panic("Could not initialize Firebase Database")
	}

	var handler routehandler.Handler
	handler.Init()
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:4200"},
		AllowMethods: []string{"GET", "POST"},
	}))
	r.GET("/quizList", handler.GetQuizList(fbDatabase))
	r.GET("/quiz", handler.GetQuiz(fbDatabase))
	r.GET("/question", handler.GetQuestion(fbDatabase))
	r.PUT("/submit-question", handler.SubmitAnswer(fbDatabase))
	r.Run()
}
