import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { ProjectSetupService } from 'src/app/services/project-setup.service';
import * as Trianglify from '../../../../../../node_modules/trianglify';
import { DashboardService, ProjectConfig, Feedback } from 'src/app/services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-app',
  templateUrl: './customer-app.component.html',
  styleUrls: ['./customer-app.component.scss']
})
export class CustomerAppComponent implements OnInit, OnDestroy {

  @ViewChild('customerWrapper', {static: true}) customerWrapper: ElementRef;

  selectedTheme: string;
  selectedDesign: string;
  composedProject: ProjectConfig;
  feedbackForm: FormGroup;

  constructor(
    private projectSetupService: ProjectSetupService,
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.feedbackForm = this.fb.group({
      name: [null],
      email: [null],
      text: [null]
    });
    if (this.router.url === '/project-preview') {
      this.composedProject = this.dashboardService.composeProjectConfig();
      console.log("TCL: CustomerAppComponent -> ngOnInit -> this.composedProject", this.composedProject)
      const trianglify = new Trianglify();
      const pattern = Trianglify({
        height: window.innerHeight,
        width: window.innerWidth,
        x_colors: this.formatColor(this.composedProject.theme),
        y_colors: this.formatColor(this.composedProject.theme),
        cell_size: 40
      });

      this.customerWrapper.nativeElement.style.background = `url(${pattern.png()})`;
      this.customerWrapper.nativeElement.style.backgroundSize = '100% 100%';
      this.customerWrapper.nativeElement.style.backgroundRepeat = 'no-repeat';
    } else {
      const projectUrl = this.route.snapshot.paramMap.get('url');
      this.dashboardService.getProjectConfig(projectUrl).subscribe(res => {
        this.composedProject = res.landingConfigs[0];
        this.projectSetupService.customerProjectName.next(this.composedProject.name);
        this.projectSetupService.customerProjectDescription.next(this.composedProject.description);
        this.projectSetupService.customerProjectTitle.next(this.composedProject.title);
        this.projectSetupService.customerProjectFeatures.next(this.composedProject.features);

        const trianglify = new Trianglify();
        const pattern = Trianglify({
          height: window.innerHeight,
          width: window.innerWidth,
          x_colors: this.formatColor(this.composedProject.theme),
          y_colors: this.formatColor(this.composedProject.theme),
          cell_size: 40
        });

        this.customerWrapper.nativeElement.style.background = `url(${pattern.png()})`;
        this.customerWrapper.nativeElement.style.backgroundSize = '100vw 100vh';
        this.customerWrapper.nativeElement.style.backgroundRepeat = 'no-repeat';
      });
    }
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

  getLightColor() {
    console.log('initial', this.composedProject.theme);
    let lightColor = this.composedProject.theme.replace(')', ', .3)');
    console.log('changed', lightColor);
    
    return lightColor;
  }

  onSubmit() {
    const projectUrl = this.route.snapshot.paramMap.get('url');
    const formData: Feedback = this.feedbackForm.value;
    console.log(this.feedbackForm.value);
    this.dashboardService.sumbitFeedback(projectUrl, formData).subscribe(res => {
      console.log(res);
    })
  }


}
