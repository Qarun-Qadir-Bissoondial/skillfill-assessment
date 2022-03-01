package models

type Quiz struct {
	Id          string   `json:"id"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Questions   []string `json:"questions"`
	TimeLimit   int      `json:"timeLimit"`
	Score       int      `json:"score,omitempty"`
}

type QuizList map[string]Quiz

type Question struct {
	Id              string   `json:"id"`
	Body            string   `json:"body"`
	CorrectAnswer   []int    `json:"correctAnswer"`
	PossibleAnswers []string `json:"possibleAnswers"`
}

type SubmittedAnswer struct {
	QuizID     string `json:"quiz"`
	QuestionID string `json:"question"`
	Submitted  []int  `json:"submittedAnswer"`
	Uid        string `json:"uid"`
}
