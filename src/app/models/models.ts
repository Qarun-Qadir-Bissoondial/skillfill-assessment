export interface Quiz {
    id: string;
    name: string;
    description: string;
    questions: string[]
    timeLimit: number
}

export type QuizList = Record<string, Quiz>