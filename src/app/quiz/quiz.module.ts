import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    QuizListComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    QuizListComponent
  ]
})
export class QuizModule { }
