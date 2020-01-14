import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService, ProjectConfig } from 'src/app/services/dashboard.service';
import { ProjectSetupService } from 'src/app/services/project-setup.service';

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
    private projectSetupService: ProjectSetupService
  ) {

  }

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token');
    localStorage.setItem('token', token);
    const createdAppConfig: ProjectConfig = this.getProjectFromLocalStorage();
    console.log("TCL: LoginComponent -> ngOnInit -> createdAppConfig", createdAppConfig);
    this.dashboardService.createProject(createdAppConfig).subscribe(res => {
      console.log(res);
      if (token) {
        localStorage.removeItem('project-preview');
        this.router.navigateByUrl('/dashboard');
      }
    });
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
