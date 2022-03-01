package routehandler

import (
	"fmt"
	"skillfill-backend/database"
	"skillfill-backend/models"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	router *gin.Engine
}

func (h *Handler) Init() {
	h.router = gin.Default()
}

func (h *Handler) GetQuizList(database database.Database) func(*gin.Context) {
	return func(c *gin.Context) {
		quizList := models.QuizList{}
		err := database.Fetch("/quiz", &quizList)
		if err != nil {
			c.JSON(500, err)
		}
		c.JSON(200, quizList)
	}
}

func (h *Handler) GetQuiz(database database.Database) func(*gin.Context) {
	return func(c *gin.Context) {
		quiz := models.Quiz{}
		quizID := c.Query("quizID")
		err := database.Fetch("/quiz/"+quizID, &quiz)
		if err != nil {
			c.JSON(500, err)
		}
		c.JSON(200, quiz)
	}
}

func (h *Handler) GetQuestion(database database.Database) func(*gin.Context) {
	return func(c *gin.Context) {
		question := models.Question{}
		questionID := c.Query("questionID")
		err := database.Fetch("/questions/"+questionID, &question)
		if err != nil {
			c.JSON(500, err)
		}
		c.JSON(200, question)
	}
}

func (h *Handler) GetSubmittedAnswer(database database.Database) func(*gin.Context) {
	return func(c *gin.Context) {
		submittedAnswer := []int{}
		questionID := c.Query("questionID")
		quizID := c.Query("quizID")
		uid := c.Query("uid")
		err := database.Fetch(fmt.Sprintf("/submitted/%s/%s/%s", uid, quizID, questionID), &submittedAnswer)
		if err != nil {
			c.JSON(500, err)
		}
		c.JSON(200, submittedAnswer)
	}
}

func (h *Handler) SubmitAnswer(database database.Database) func(*gin.Context) {
	return func(c *gin.Context) {
		s := models.SubmittedAnswer{}
		c.BindJSON(&s)
		err := database.Set("/submitted/"+s.Uid+"/"+s.QuizID+"/"+s.QuestionID, s.Submitted)
		if err != nil {
			c.JSON(400, map[string]string{
				"message": "bad data",
			})
		}
		c.JSON(200, map[string]string{
			"message": "okay",
		})
	}
}
