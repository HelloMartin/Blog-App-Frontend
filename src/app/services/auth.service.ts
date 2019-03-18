import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt'; 


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private url = 'http://localhost:4300/user/authenticate';
  constructor(private http: Http) { } 

  httpOptions = {
    headers: new Headers({
      'Content-Type':  'application/json'
    })
  };

  signIn(credentials) {
    return this.http.post(this.url, JSON.stringify(credentials), this.httpOptions)
      .pipe(
        catchError(this.handleError),
        map(response => {
          let result = response.json();
          if (result && result.token) {
            localStorage.setItem('token', result.token);
            return true;
          } else {
            return false;
          }
        })
      )
  }

  signOut() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return tokenNotExpired();
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return throwError(new BadInput(error.json()));
    }
    if (error.status === 404) {
      return throwError(new NotFoundError());
    }
    return throwError(new AppError(error)); 
  }
}