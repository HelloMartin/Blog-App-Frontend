import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 constructor(
    private service: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  invalidLogin: true;

  signIn(credentials) {
    this.service.signIn(credentials)
    .subscribe(response => { 
      if (response) {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/']);
      } else  {
        this.invalidLogin = true;
      }
    });
  }
}
