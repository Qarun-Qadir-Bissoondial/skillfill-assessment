export interface Quiz {
    id: string;
    name: string;
    description: string;
    questions: string[]
    timeLimit: number
}

export type QuizList = Record<string, Quiz>

export interface Question {
    id: string;
    body: string;
    correctAnswer: number[]
    possibleAnswers: number[]
}

export interface SubmittedQuestion {
    uid?: string
    quiz: string
    question: string
    submittedAnswer: number[]
}
