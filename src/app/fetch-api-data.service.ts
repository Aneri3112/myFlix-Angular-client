import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-api3112.herokuapp.com'

const username = localStorage.getItem('user');

@Injectable({
  providedIn: 'root'
})


export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(apiUrl + '/users', userDetails)
    .pipe(catchError(this.handleError)
    );
  }

  //User Login
  public userLogin(userDetails: any): Observable<any> {
    return this.http
    .post(apiUrl + '/login', userDetails)
    .pipe(catchError(this.handleError));
  }

  // API call to get all movies from the myFlix API after log-In
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Get one movie from API
  public getMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({ Authorization: 'Bearer' + token }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get Genre 
  public getGenre(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies' + '/genres/' + name, {
      headers: new HttpHeaders({ Authorization: 'Bearer' + token }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get Director 
  public getDirector(directorname: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl +  'movies' + '/director/' + directorname, {
      headers: new HttpHeaders({ Authorization: 'Bearer' + token }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Get user by username
  public getuser(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'users/' + Username, {
      headers: new HttpHeaders({ Authorization: 'Bearer' + token }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Update user data
  public updateUserData(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http
      .put(apiUrl + 'users/' + Username, userDetails, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Add a movie to favorite List
  public addFavoriteMovie(Movieid: any): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http
      .post(apiUrl + 'users/' + Username + '/movies/' + Movieid, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Remove a movie to favorite Movies
  public removeFavoriteMovie(Movieid: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .delete(apiUrl + 'users/' + username + '/movies/' + Movieid, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Delete user account
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http
      .delete(apiUrl + 'users/' + Username, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }


  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}