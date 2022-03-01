import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { QuizQuestionComponent } from './quiz-question/quiz-question.component';
import { RouterModule } from '@angular/router';
import { ClocktimePipe } from '../pipes/clocktime.pipe';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { QuizCompletedComponent } from './quiz-completed/quiz-completed.component';

@NgModule({
  declarations: [
    QuizListComponent,
    QuizQuestionComponent,
    ClocktimePipe,
    QuizCompletedComponent    
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatListModule,
    MatDialogModule,
    RouterModule
  ],
  exports: [
    QuizListComponent
  ]
})
export class QuizModule { }
