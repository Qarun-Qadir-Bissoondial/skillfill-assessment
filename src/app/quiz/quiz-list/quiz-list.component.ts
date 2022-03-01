import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizList } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.sass']
})
export class QuizListComponent implements OnInit {
  quizList: Observable<QuizList>

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.quizList = this.api.getQuizList()
  }

}
