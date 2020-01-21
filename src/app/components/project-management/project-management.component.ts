import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectSetupService } from 'src/app/services/project-setup.service';
import { DashboardService, ProjectConfig } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {
  projectUrl: string;
  composedProject: ProjectConfig;
  isUserLogged: boolean;
  isEngagementListVisible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectSetupService: ProjectSetupService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.isUserLogged = localStorage.getItem('token') !== null;
    this.projectUrl = this.route.snapshot.paramMap.get('url');
    this.dashboardService.getProjectConfig(this.projectUrl).subscribe(res => {
      this.composedProject = res.landingConfigs[0];
      console.log("TCL: ProjectManagementComponent -> ngOnInit -> this.composedProject", this.composedProject);
    });
  }

  showProjectPreview(project: ProjectConfig) {
    this.clearProjectConfig();
    window.open(`/dashboard/project/${project.url}`);
    // this.router.navigateByUrl(`/dashboard/project/${project.url}`);
  }

  clearProjectConfig() {
    this.projectSetupService.customerProjectDescription.next('');
    this.projectSetupService.customerProjectFeatures.next([]);
    this.projectSetupService.customerProjectName.next('');
    this.projectSetupService.customerProjectTheme.next('');
    this.projectSetupService.customerProjectTitle.next('');
  }

  showEngagementList() {
    this.isEngagementListVisible = !this.isEngagementListVisible;
  }

}
