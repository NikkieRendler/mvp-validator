import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService, ProjectConfig } from 'src/app/services/dashboard.service';
import { ProjectSetupService } from 'src/app/services/project-setup.service';
import { forkJoin, concat, combineLatest } from 'rxjs';

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
    combineLatest(
      this.projectSetupService.customerProjectTheme,
      this.projectSetupService.customerProjectName,
      this.projectSetupService.customerProjectTitle,
      this.projectSetupService.customerProjectFeatures,
      this.projectSetupService.customerProjectDescription,
    ).subscribe(config => {
      const createdAppConfig: ProjectConfig = {
        theme: config[0],
        name: config[1],
        title: config[2],
        features: config[3],
        description: config[4],
      };
      this.dashboardService.createProject(createdAppConfig).subscribe(res => {
        console.log(res);
      });
    });
    if (token) {
      this.router.navigateByUrl('/dashboard');
    }
  }

}
