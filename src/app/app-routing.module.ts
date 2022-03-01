import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { QuizListComponent } from './quiz/quiz-list/quiz-list.component';
import { QuizQuestionComponent } from './quiz/quiz-question/quiz-question.component';
import { QuizCompletedComponent } from './quiz/quiz-completed/quiz-completed.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'quiz',
    canActivate: [AngularFireAuthGuard],
    children: [
      { path: 'list', component: QuizListComponent },
      { path: ':quizID', component: QuizQuestionComponent },
      { path: 'completed/:quizID', component: QuizCompletedComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
