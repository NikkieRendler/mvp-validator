import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  serverUrl = 'https://mvp-validator.herokuapp.com/';
  header = new HttpHeaders()
  constructor(private http: HttpClient, private authSrvice: AuthService) { }

  createProject(projectConfig): Observable<any> {
    return this.http.post(this.serverUrl, projectConfig, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append(`Authorization`, `Bearer: ${this.authSrvice.getToken()}`)
    });
  }

  composeProjectConfig(): Observable<any> {
    return 
  }
}
