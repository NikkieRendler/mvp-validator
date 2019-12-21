import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProjectSetupService } from 'src/app/services/project-setup.service';
import * as Trianglify from '../../../../../../node_modules/trianglify';
import { Router } from '@angular/router';
import { STAGES } from 'src/app/components/project-setup/project-setup.component';

@Component({
  selector: 'app-customer-app',
  templateUrl: './customer-app.component.html',
  styleUrls: ['./customer-app.component.scss']
})
export class CustomerAppComponent implements OnInit {
  @ViewChild('customerWrapper', null) customerWrapper: ElementRef;

  selectedTheme: string;
  selectedDesign: string;

  constructor(private service: ProjectSetupService) {

  }

  ngOnInit() {
    const trianglify = new Trianglify();

    const pattern = Trianglify({
      height: window.innerHeight,
      width: window.innerWidth,
      x_colors: this.getColorsFromSelection(),
      y_colors: this.getColorsFromSelection(),
      cell_size: 40
    });

    this.customerWrapper.nativeElement.style.background = `url(${pattern.png()})`
    this.customerWrapper.nativeElement.style.backgroundSize = '100% 550px';
    this.customerWrapper.nativeElement.style.backgroundRepeat = 'no-repeat';


    this.service.customerProjectTheme.subscribe(res => {
      this.selectedTheme = res;
    });
    this.service.customerProjectDesign.subscribe(res => {
      this.selectedDesign = res;
    });
  }

  getColorsFromSelection() {
    let colorScheme;
    this.service.customerProjectTheme.subscribe(res =>
      colorScheme = ['hsl(0, 0%, 100%)', res, res]
    );
    return colorScheme;
  }


}
