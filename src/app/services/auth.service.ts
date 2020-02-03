import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


export interface User {
  _id: String,
  firstName: String,
  lastName: String,
  avatar: String,
  email: String
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {

  }

  serverUrl = environment.serverUrl;

  signUp(): Observable<any> {
    return this.http.get(this.serverUrl + 'auth/google/');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserInfo(): Observable<any> {
    return this.http.get(this.serverUrl + 'auth/profile');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/main');
  }
}
