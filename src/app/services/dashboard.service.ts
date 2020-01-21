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
  url?: string;
  engagedUsers?: Feedback[];
}

export interface Feedback {
  url: string;
  name: string;
  text: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  serverUrl = 'https://mvp-validator.herokuapp.com/';
  header = new HttpHeaders();
  constructor(private http: HttpClient, private authSrvice: AuthService, private projectSetupService: ProjectSetupService) { }

  createProject(projectConfig: ProjectConfig): Observable<any> {
    return this.http.post(this.serverUrl + 'dashboard', projectConfig);
  }

  checkProjectExistance(projectName): Observable<any> {
    return this.http.get(this.serverUrl + `dashboard/is-project-exists/${projectName}`);
  }

  getDashboard(): Observable<any> {
    return this.http.get(this.serverUrl + 'dashboard');
  }

  getProjectConfig(projectUrl): Observable<any> {
    return this.http.get(this.serverUrl + `dashboard/project/${projectUrl}`);
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
    });
    return createdAppConfig;
  }

  deleteProject(id): Observable<any> {
    return this.http.delete(this.serverUrl + 'dashboard/' + id);
  }

  sumbitFeedback(url: string, formData: Feedback): Observable<any> {
    return this.http.post(this.serverUrl + `dashboard/${url}/engagedUser`, {
      engagedUserInfo: formData
    });
  }
}
