import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Question, Quiz, QuizList, SubmittedQuestion } from '../models/models';
import { AuthService } from './auth.service';

/**
 * Responsible for API calls
 * I'll keep these calls as Observables so that extra logic
 * can be easily added in the future, but at this stage in the application,
 * only single api calls are required
 * 
 * No need to unsubscribe from these as take(1) automatically unsubscribes
 * after the first value
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  getQuizList(): Observable<QuizList> {
    return this.http.get<QuizList>('http://localhost:8080/quizList').pipe(take(1));
  }

  getQuiz(quizID: string): Observable<Quiz> {
    return this.http.get<Quiz>(`http://localhost:8080/quiz?quizID=${quizID}`).pipe(take(1));
  }

  getQuestion(questionID: string): Observable<Question> {
    return this.http.get<Question>(`http://localhost:8080/question?questionID=${questionID}`).pipe(take(1))
  }

  submitQuestion(submitted: SubmittedQuestion) {
    submitted.uid = this.auth.user.uid
    return this.http.put('http://localhost:8080/submit-question', submitted).pipe(take(1))
  }

  getSubmittedAnswer(quizID: string, questionID: string): Observable<number[]> {
    return this.http.get<number[]>(`http://localhost:8080/submitted-answer`, {
      params: {
        quizID,
        questionID,
        uid: this.auth.user.uid
      }
    }).pipe(take(1))
  }
}
