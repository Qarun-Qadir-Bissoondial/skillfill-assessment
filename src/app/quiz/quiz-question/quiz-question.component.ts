import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, forkJoin, map, Observable, of, tap, throwError, timer } from 'rxjs';
import { Question, Quiz } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';

const numSort = (a: number, b: number) => {
  if (a < b) return -1;
  if (a == b) return 0;
  return 1;
}

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.sass'],
})
export class QuizQuestionComponent implements OnInit {
  @ViewChild('multipleAnswers', { static: false }) multipleSelection: MatSelectionList;
  quizID: string
  quiz: Quiz;
  loading = true;
  timerLoading = true;
  previousQuestionIndex: number;
  currentQuestionIndex: number;
  currentQuestion: Question;
  countdown: Observable<number | null>
  questionLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private snack: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.quizID = this.route.snapshot.params['quizID'];

    this.api.getQuiz(this.quizID).pipe(concatMap(q => {
      if (q == null) {
        return throwError(() => new Error('Invalid Quiz ID'))
      }

      this.quiz = q;
      this.previousQuestionIndex = -1;
      this.currentQuestionIndex = 0;
      this.countdown = timer(0, 1000).pipe(
      map(i => this.quiz.timeLimit - i),
        tap(i => {
          if (i == 0) {
            this.snack.open('Time\'s up!', 'Dismiss');
            this.router.navigateByUrl(`/quiz/completed/${this.quizID}`)
          }
        })
      )
      this.timerLoading = false;

      return forkJoin({
        question: this.api.getQuestion(this.quiz.questions[this.currentQuestionIndex]),
        submittedAnswer: this.api.getSubmittedAnswer(this.quizID, this.quiz.questions[this.currentQuestionIndex])
      })
    })).subscribe({
      next: (response) => {
        if (response.question == null) {
          this.snack.open('Something went wrong!')
          this.router.navigateByUrl('/quiz/list')
        } else {
          this.currentQuestion = response.question;
          this.loading = false;
          this.questionLoading = false;
          setTimeout(() => {
            this.populateExistingAnswers(response.submittedAnswer);
          }, 50)
        }
       
      },
      error: () => {
        this.snack.open('Something went wrong!')
        this.router.navigateByUrl('/quiz/list')
      }
    });
  }

  private submitAnswer(action: 'next' | 'prev') {
    let selected: number[];

    if (this.currentQuestion.correctAnswer.length === 1) {
      selected = Array
      .from(document.querySelectorAll<HTMLElement>('mat-radio-button'))
      .map((e, index) => {
        if (e.classList.contains('mat-radio-checked')) {
          return index
        } else {
          return false
        }
      }).filter(e => e !== false) as number[]
    } else {
      selected = this.multipleSelection.selectedOptions.selected
      .map<number>(s => s.value)
      .sort(numSort);
      this.multipleSelection.deselectAll();
    }

    this.questionLoading = true;
    console.log(selected);

    this.api.submitQuestion({
      question: this.currentQuestion.id,
      quiz: this.quiz.id,
      submittedAnswer: selected
    }).pipe(concatMap(() => {
      if (this.currentQuestionIndex === this.quiz.questions.length - 1 && action == 'next') {
        return of({
          question: {
            body: 'finished'
          } as Question,
          submittedAnswer: []
        })
      } else {
        if (action === 'next') {
          this.previousQuestionIndex++;
          this.currentQuestionIndex++;
        } else {
          this.previousQuestionIndex--;
          this.currentQuestionIndex--;
        }

        return forkJoin({
          question: this.api.getQuestion(this.quiz.questions[this.currentQuestionIndex]),
          submittedAnswer: this.api.getSubmittedAnswer(this.quizID, this.quiz.questions[this.currentQuestionIndex])
        })
      }
    })).subscribe({
      next: (response: { question: Question, submittedAnswer: number[] }) => {
        if (response.question.body === 'finished') {
          this.router.navigateByUrl(`/quiz/completed/${this.quizID}`);
        } else {
          this.currentQuestion = response.question;
          this.questionLoading = false
          setTimeout(() => {
            this.populateExistingAnswers(response.submittedAnswer);
          }, 50)
         
         
        }
      }
    })
  }

  next() {
    this.submitAnswer('next')
  }

  previous() {
    this.submitAnswer('prev')
  }

  leaveQuiz(template: TemplateRef<HTMLElement>) {
    this.dialog.open(template)
  }

  populateExistingAnswers(submittedAnswer: number[]) {
    console.log(submittedAnswer);
    if (this.currentQuestion.correctAnswer.length === 1) {
      console.log(Array.from(document.querySelectorAll<HTMLElement>('mat-radio-button'))[submittedAnswer[0]])
      Array.from(document.querySelectorAll<HTMLElement>('mat-radio-button .mat-radio-label'))[submittedAnswer[0]].click()
      return
    }

    for (const answer of submittedAnswer) {
      for (const option of this.multipleSelection.options) {
        if (option.value === answer) {
          option.toggle();
        }
      }
    }
  }

}
