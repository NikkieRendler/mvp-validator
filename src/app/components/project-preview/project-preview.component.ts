import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ProjectSetupService } from 'src/app/services/project-setup.service';
import { DashboardService, ProjectConfig } from 'src/app/services/dashboard.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html',
  styleUrls: ['./project-preview.component.scss']
})
export class ProjectPreviewComponent implements OnInit {
  modalView: boolean;
  isUserLogged: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private projectSetupService: ProjectSetupService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.isUserLogged = localStorage.getItem('token') !== null;
  }

  showModal(): void {
    this.modalView = true;
  }

  handleOk(): void {
    this.modalView = false;
  }

  handleCancel(): void {
    this.modalView = false;
  }

  signUp() {
    this.authService.signUp().subscribe(res => {
      console.log(res);
    })
  }

  createProject() {
    this.dashboardService.createProject(this.dashboardService.composeProjectConfig()).subscribe(res => {
      console.log("TCL: ProjectPreviewComponent -> createProject -> this.dashboardService.composeProjectConfig()", this.dashboardService.composeProjectConfig())
      console.log(res);
    });
  }
}

