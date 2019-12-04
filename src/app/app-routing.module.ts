import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectSetupComponent } from './components/project-setup/project-setup.component';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';


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
    path: 'project-setup'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
