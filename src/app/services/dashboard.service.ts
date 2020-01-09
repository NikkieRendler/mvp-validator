import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { ProjectSetupService } from './project-setup.service';

export interface ProjectConfig {
  theme: string;
  name: string;
  title: string;
  features: string[];
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  previewProjectDesign: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  previewProjectTheme: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  previewProjectName: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  previewProjectTitle: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  previewProjectDescription: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  previewProjectFeatures: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  serverUrl = 'https://mvp-validator.herokuapp.com/';
  header = new HttpHeaders()
  constructor(private http: HttpClient, private authSrvice: AuthService, private projectSetupService: ProjectSetupService) { }

  createProject(projectConfig: ProjectConfig): Observable<any> {
    return this.http.post(this.serverUrl + 'dashboard', projectConfig, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append(`Authorization`, `Bearer ${this.authSrvice.getToken()}`)
    });
  }

  getDashboard(): Observable<any> {
    return this.http.get(this.serverUrl + 'dashboard', {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append(`Authorization`, `Bearer ${this.authSrvice.getToken()}`)
    });
  }

  composeProjectConfig(): ProjectConfig {
    let createdAppConfig: ProjectConfig;
    combineLatest(
      this.projectSetupService.customerProjectTheme,
      this.projectSetupService.customerProjectName,
      this.projectSetupService.customerProjectTitle,
      this.projectSetupService.customerProjectFeatures,
      this.projectSetupService.customerProjectDescription,
    ).subscribe(config => {
      createdAppConfig = {
        theme: config[0],
        name: config[1],
        title: config[2],
        features: config[3],
        description: config[4],
      };
    })
    return createdAppConfig;
  }

  composePreviewConfig(): ProjectConfig {
    let previewAppConfig: ProjectConfig;
    combineLatest(
      this.previewProjectTheme,
      this.previewProjectName,
      this.previewProjectTitle,
      this.previewProjectFeatures,
      this.previewProjectDescription,
    ).subscribe(config => {
      previewAppConfig = {
        theme: config[0],
        name: config[1],
        title: config[2],
        features: config[3],
        description: config[4],
      };
    })
    return previewAppConfig;
  }

  deleteProject(id): Observable<any> {
    return this.http.delete(this.serverUrl + 'dashboard/' + id, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append(`Authorization`, `Bearer ${this.authSrvice.getToken()}`)
    })
  }
}
