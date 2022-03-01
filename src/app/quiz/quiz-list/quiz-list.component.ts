import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.sass']
})
export class QuizListComponent implements OnInit {

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
  }

}
