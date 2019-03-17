import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 constructor(
    private service: AuthService,
    private router: Router) { }

  invalidLogin: true;

  signIn(credentials) {
    this.service.signIn(credentials)
    .subscribe(response => { 
      if (response)
        this.router.navigate(['/']);
      else  
        this.invalidLogin = true;
    });
  }
}
