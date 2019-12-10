import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectSetupComponent } from './components/project-setup/project-setup.component';
import { MainComponent } from './components/main/main.component';
import { CustomerAppComponent } from 'projects/customer-app/src/app/components/customer-app/customer-app.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
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
    path: 'strong-sides'
  },
  {
    component: ProjectSetupComponent,
    path: 'theme'
  },
  {
    component: CustomerAppComponent,
    path: 'customer-app'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
