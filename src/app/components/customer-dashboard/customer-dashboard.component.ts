import { Component, OnInit } from '@angular/core';
import { DashboardService, ProjectConfig } from 'src/app/services/dashboard.service';
import { Router } from '@angular/router';
import { ProjectSetupService } from 'src/app/services/project-setup.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {

  dashboard: ProjectConfig[];

  constructor(private dashboardService: DashboardService, private projectSetupService: ProjectSetupService, private router: Router) { }

  ngOnInit() {
    this.getDashboard();
  }

  getDashboard() {
    this.dashboardService.getDashboard().subscribe(res => {
      this.dashboard = res.projects.landingConfigs;
    });
  }

  showProjectPreview(project: ProjectConfig) {
    this.clearProjectConfig();
    this.router.navigateByUrl(`/dashboard/project/${project.url}`);
  }

  manageProject(project: ProjectConfig) {
    this.router.navigateByUrl(`/dashboard/project-management/${project.url}`);

  }

  deleteProject(id) {
    this.dashboardService.deleteProject(id).subscribe(res => {
      console.log(res);
      this.getDashboard();
    });
  }

  startCreationFlow() {
    this.clearProjectConfig();
    this.router.navigateByUrl('/theme');
  }

  clearProjectConfig() {
    this.projectSetupService.customerProjectDescription.next('');
    this.projectSetupService.customerProjectFeatures.next([]);
    this.projectSetupService.customerProjectName.next('');
    this.projectSetupService.customerProjectTheme.next('');
    this.projectSetupService.customerProjectTitle.next('');
  }

}
