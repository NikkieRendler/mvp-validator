import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectSetupComponent } from './components/project-setup/project-setup.component';
import { MainComponent } from './components/main/main.component';
import { CustomerAppComponent } from 'projects/customer-app/src/app/components/customer-app/customer-app.component';
import { ProjectPreviewComponent } from './components/project-preview/project-preview.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectManagementComponent } from './components/project-management/project-management.component';
import { SuggestionsComponent } from './components/suggestions/suggestions.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    component: ProjectSetupComponent,
    path: 'design'
  },
  {
    component: ProjectSetupComponent,
    path: 'name'
  },
  {
    component: ProjectSetupComponent,
    path: 'title'
  },
  {
    component: ProjectSetupComponent,
    path: 'features'
  },
  {
    component: ProjectSetupComponent,
    path: 'theme'
  },
  {
    component: ProjectSetupComponent,
    path: 'description'
  },
  {
    path: 'project-preview',
    component: ProjectPreviewComponent
  },
  {
    path: 'project/:url',
    component: CustomerAppComponent
  },
  {
    path: 'dashboard/project-management/:url',
    component: ProjectManagementComponent
  },
  {
    component: CustomerDashboardComponent,
    path: 'dashboard'
  },
  {
    component: SuggestionsComponent,
    path: 'suggestions'
  },
  {
    path: 'login/success/:token',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
