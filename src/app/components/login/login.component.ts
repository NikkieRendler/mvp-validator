import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService, ProjectConfig } from 'src/app/services/dashboard.service';
import { ProjectSetupService } from 'src/app/services/project-setup.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService,
    private projectSetupService: ProjectSetupService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token');
    localStorage.setItem('token', token);
    const createdAppConfig: ProjectConfig = this.getProjectFromLocalStorage();
    if (token) {
      let userInfo;
      this.authService.getUserInfo().subscribe(res => {
        userInfo = res;
        localStorage.setItem('userInfo', JSON.stringify(userInfo.user));
      });
      if (createdAppConfig) {
        this.dashboardService.createProject(createdAppConfig).subscribe(res => {
          localStorage.removeItem('project-preview');
          this.router.navigateByUrl('/dashboard');
        });
      }
      this.router.navigateByUrl('/dashboard');
    }

  }

  getProjectFromLocalStorage(): ProjectConfig {
    return JSON.parse(localStorage.getItem('project-preview'));
  }

  // ngOnDestroy() {
  //   this.projectSetupService.customerProjectTheme.unsubscribe();
  //   this.projectSetupService.customerProjectName.unsubscribe();
  //   this.projectSetupService.customerProjectTitle.unsubscribe();
  //   this.projectSetupService.customerProjectFeatures.unsubscribe();
  //   this.projectSetupService.customerProjectDescription.unsubscribe();
  // }

}
