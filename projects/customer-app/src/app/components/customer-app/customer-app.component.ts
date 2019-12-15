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
    var pattern = Trianglify({
      height: window.innerHeight,
      width: window.innerWidth,
      color_function: this.colorFunc,
      cell_size: 40
    });

    this.customerWrapper.nativeElement.style.background = `url(${pattern.png()})`
    this.customerWrapper.nativeElement.style.backgroundSize = 'cover';

    this.service.customerProjectTheme.subscribe(res => {
      this.selectedTheme = res;
    });
    this.service.customerProjectDesign.subscribe(res => {
      this.selectedDesign = res;
    });
  }

  colorFunc (x, y) {
    console.log("TCL: CustomerAppComponent -> colorFunc -> y", y)
    console.log("TCL: CustomerAppComponent -> colorFunc -> x", x)
    console.log("TCL: CustomerAppComponent -> colorFunc -> +Math.floor(Math.abs(x*y)*100)", +Math.floor(Math.abs(x*y)*100))
    return 'hsl('+Math.floor(Math.abs(x*y)*100)+',100%,50%)';
};


}
