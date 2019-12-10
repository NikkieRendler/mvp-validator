import { Component, OnInit } from '@angular/core';
import { ProjectSetupService } from 'src/app/services/project-setup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-app-name',
  templateUrl: './customer-app-name.component.html',
  styleUrls: ['./customer-app-name.component.scss']
})
export class CustomerAppNameComponent implements OnInit {
  currentRoute: string;
  selectedDesign: string;
  selectedTheme: string;
  selectedName: string = '';

  constructor(private service: ProjectSetupService, private router: Router) { }

  ngOnInit() {
    this.currentRoute = this.router.url;

    this.service.customerProjectDesign.subscribe(res => {
      this.selectedDesign = res;
    });
    this.service.customerProjectTheme.subscribe(res => {
      this.selectedTheme = res;
    });
    this.service.customerProjectName.subscribe(res => {
    console.log("TCL: CustomerAppNameComponent -> ngOnInit -> res", res)
      this.selectedName = res;
    })
  }

  saveInputValue(event) {
    this.service.customerProjectName.next(event.target.value);
  }

}
