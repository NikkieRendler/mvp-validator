import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { CustomerAppNameComponent } from './components/customer-app-name/customer-app-name.component';
import { CustomerAppTitleComponent } from './components/customer-app-title/customer-app-title.component';
import { CustomerAppComponent } from './components/customer-app/customer-app.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerAppNameComponent,
    CustomerAppTitleComponent,
    CustomerAppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
