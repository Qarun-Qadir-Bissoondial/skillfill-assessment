import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: boolean

  constructor(
    private auth: AngularFireAuth,
    private router: Router
    ) {
      this.auth.authState.subscribe(user => {
        console.log(user?.uid)
        this.loggedIn = user !== null

        if (this.loggedIn) {
          this.router.navigateByUrl('/quiz/list')
        }
      })
  }

  login(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password)
  }
}
