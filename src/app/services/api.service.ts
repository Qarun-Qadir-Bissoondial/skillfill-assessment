import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz, QuizList } from '../models/models';

/**
 * Responsible for API calls
 * I'll keep these calls as Observables so that extra logic
 * can be easily added in the future, but at this stage in the application,
 * only single api calls are required
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getQuizList(): Observable<QuizList> {
    return this.http.get<QuizList>('http://localhost:8080/quizList');
  }
}
