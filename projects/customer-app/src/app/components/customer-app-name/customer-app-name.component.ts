import { Component, OnInit, Input } from '@angular/core';
import { ProjectSetupService } from 'src/app/services/project-setup.service';
import { Router } from '@angular/router';
import { STAGES } from 'src/app/components/project-setup/project-setup.component';

@Component({
  selector: 'app-customer-app-name',
  templateUrl: './customer-app-name.component.html',
  styleUrls: ['./customer-app-name.component.scss']
})
export class CustomerAppNameComponent implements OnInit {

  currentRoute: string;
  selectedName: string = '';

  constructor(private service: ProjectSetupService, private router: Router) { }

  ngOnInit() {

    this.currentRoute = this.router.url;
    this.service.customerProjectName.subscribe(res => {
      this.selectedName = res;
    });
  }

  saveInputValue(event) {
    this.service.customerProjectName.next(event.target.value);
  }

  nextStage() {
    const stage = STAGES.indexOf(this.router.url);
    this.router.navigateByUrl(STAGES[stage + 1]);
  }

}
