import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';


@Injectable({
  providedIn: 'root'
})

export class DataService {
  private url = 'http://localhost:4300/blogs';
  constructor(private http: Http) { } 

  httpOptions = {
    headers: new Headers({
      'Content-Type':  'application/json'
    })
  };

  getAll() {
    return this.http.get(this.url)
      .pipe(
        catchError(this.handleError),
        map(response => response.json())
      )
  }

  get(id) { 
    return this.http.get(this.url + '/' + id)
      .pipe(
        catchError(this.handleError),
        map(response => response.json())
      )
  }

  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource), this.httpOptions)
      .pipe(
        map(response => response.json())
      )
  }

  update(resource) {
    return this.http.post(this.url + '/' + resource._id + '?_method=PUT', JSON.stringify(resource), this.httpOptions)
    .pipe(
      map(response => response.json())
    ) 
  }

  delete(resource) {
    return this.http.post(this.url + '/' + resource._id + '?_method=DELETE', this.httpOptions)
    .pipe(
      map(response => response.json())
    ) 
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