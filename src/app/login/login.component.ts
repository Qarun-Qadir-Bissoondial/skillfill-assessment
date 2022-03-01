import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: this.fb.control(null, [Validators.required, Validators.email]),
    password: this.fb.control(null, Validators.required),
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar) {}

  /**
   * Demo Account: dev-user@skillfill.com, DevTest1!
   */
  onSubmit(): void {
    const { email, password } = this.loginForm.value;
    this.auth.login(email, password)
    .then(() => {
      this.router.navigateByUrl('/quiz/list')
    })
    .catch(() => {
      this.snack.open('Invalid Credentials!', 'Dismiss')
    })
  }
}
