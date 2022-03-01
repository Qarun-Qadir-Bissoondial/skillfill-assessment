import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizList } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.sass']
})
export class QuizListComponent implements OnInit {
  quizList: Observable<QuizList>

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.quizList = this.api.getQuizList()
  }

  showInstructions(template: TemplateRef<HTMLElement>, quiz: string) {
    this.dialog.open(template, {
      data: quiz
    })
  }

  startQuiz() {
    this.router.navigateByUrl(`/quiz/`)
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('/')
    })
  }

}
