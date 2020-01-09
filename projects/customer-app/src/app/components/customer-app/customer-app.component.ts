import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { ProjectSetupService } from 'src/app/services/project-setup.service';
import * as Trianglify from '../../../../../../node_modules/trianglify';
import { DashboardService, ProjectConfig } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-customer-app',
  templateUrl: './customer-app.component.html',
  styleUrls: ['./customer-app.component.scss']
})
export class CustomerAppComponent implements OnInit, OnDestroy {

  @ViewChild('customerWrapper', null) customerWrapper: ElementRef;

  selectedTheme: string;
  selectedDesign: string;
  composedProject: ProjectConfig;
  previewProject: ProjectConfig;

  projectToDisplay: ProjectConfig;

  constructor(
    private projectSetupService: ProjectSetupService,
    private dashboardService: DashboardService
  ) {

  }

  ngOnInit() {
    this.composedProject = this.dashboardService.composeProjectConfig();
    const trianglify = new Trianglify();
    const pattern = Trianglify({
      height: window.innerHeight,
      width: window.innerWidth,
      x_colors: this.formatColor(this.composedProject.theme),
      y_colors: this.formatColor(this.composedProject.theme),
      cell_size: 40
    });

    this.customerWrapper.nativeElement.style.background = `url(${pattern.png()})`;
    this.customerWrapper.nativeElement.style.backgroundSize = '100% 600px';
    this.customerWrapper.nativeElement.style.backgroundRepeat = 'no-repeat';


    this.projectSetupService.customerProjectTheme.subscribe(res => {
      this.selectedTheme = res;
    });
    this.projectSetupService.customerProjectDesign.subscribe(res => {
      this.selectedDesign = res;
    });
  }

  ngOnDestroy() {
    // Clear preview data
  }

  getColorsFromSelection() {
    let colorScheme;
    this.projectSetupService.customerProjectTheme.subscribe(res =>
      colorScheme = ['hsl(0, 0%, 100%)', res, res]
    );
    return colorScheme;
  }

  formatColor(color) {
    return ['hsl(0, 0%, 100%)', color, color]
  }


}
