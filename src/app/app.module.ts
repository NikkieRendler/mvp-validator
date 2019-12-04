import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { LandingComponent } from 'projects/customer-app/src/app/components/landing/landing.component';
import { ProjectSetupComponent } from './components/project-setup/project-setup.component';
import { MainComponent } from './components/main/main.component';
import { ProjectSetupService } from './services/project-setup.service';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ProjectSetupComponent,
    LandingComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, ProjectSetupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
