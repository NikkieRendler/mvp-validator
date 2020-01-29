import { Component, OnInit } from '@angular/core';
import { STAGES } from 'src/app/components/project-setup/project-setup.component';
import { ProjectSetupService } from 'src/app/services/project-setup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-app-title',
  templateUrl: './customer-app-title.component.html',
  styleUrls: ['./customer-app-title.component.scss']
})
export class CustomerAppTitleComponent implements OnInit {

  currentRoute: string;
  selectedTitle: String;

  constructor(private service: ProjectSetupService, private router: Router) { }

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.service.customerProjectTitle.subscribe(res => {
      this.selectedTitle = res;
    });

  }

  saveInputValue(event) {
    this.service.customerProjectTitle.next(event.target.value);
  }

  nextStage() {
    if (this.selectedTitle.trim().length > 0) {
      const stage = STAGES.indexOf(this.router.url);
      this.router.navigateByUrl(STAGES[stage + 1]);
    }
  }

}
