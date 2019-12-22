import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ProjectSetupComponent } from './components/project-setup/project-setup.component';
import { MainComponent } from './components/main/main.component';
import { ProjectSetupService } from './services/project-setup.service';
import { CustomerAppNameComponent } from 'projects/customer-app/src/app/components/customer-app-name/customer-app-name.component';
import { MatButtonModule } from '@angular/material/button';
import { ColorPickerModule } from 'ngx-color-picker';
import { CustomerAppTitleComponent } from 'projects/customer-app/src/app/components/customer-app-title/customer-app-title.component';
import { CustomerAppComponent } from 'projects/customer-app/src/app/components/customer-app/customer-app.component';
import { CustomerAppFeaturesComponent } from 'projects/customer-app/src/app/components/customer-app-features/customer-app-features.component';
import { CustomerAppDescriptionComponent } from 'projects/customer-app/src/app/components/customer-app-description/customer-app-description.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ProjectPreviewComponent } from './components/project-preview/project-preview.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ProjectSetupComponent,
    MainComponent,
    CustomerAppNameComponent,
    CustomerAppTitleComponent,
    CustomerAppFeaturesComponent,
    CustomerAppDescriptionComponent,
    CustomerAppComponent,
    ProjectPreviewComponent,
    CustomerDashboardComponent,
    LoginComponent
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    ColorPickerModule,
    MatInputModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, ProjectSetupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
