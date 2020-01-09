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
      console.log("TCL: CustomerDashboardComponent -> ngOnInit -> this.dashboar", this.dashboard)
    })
  }

  showProjectPreview(project: ProjectConfig) {
    this.projectSetupService.customerProjectDescription.next(project.description);
    this.projectSetupService.customerProjectFeatures.next(project.features);
    this.projectSetupService.customerProjectName.next(project.name);
    this.projectSetupService.customerProjectTheme.next(project.theme);
    this.projectSetupService.customerProjectTitle.next(project.title);
    this.router.navigateByUrl('/project-preview');
  }

  deleteProject(id) {
    this.dashboardService.deleteProject(id).subscribe(res => {
      console.log(res);
      this.getDashboard();
    });
  }

}
