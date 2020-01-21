import { Component, OnInit, Input } from '@angular/core';
import { ProjectSetupService } from 'src/app/services/project-setup.service';
import { Router } from '@angular/router';
import { STAGES } from 'src/app/components/project-setup/project-setup.component';
import { fromEvent } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-customer-app-name',
  templateUrl: './customer-app-name.component.html',
  styleUrls: ['./customer-app-name.component.scss']
})
export class CustomerAppNameComponent implements OnInit {

  currentRoute: string;
  selectedName: string = '';
  nameControl: FormControl = new FormControl({});
  nameUnique: boolean;

  constructor(
    private service: ProjectSetupService,
    private router: Router,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.service.customerProjectName.subscribe(res => {
      this.selectedName = res;
    });
    if (this.currentRoute === '/name') {
      this.nameControl.valueChanges.pipe(
        debounceTime(250)
      ).subscribe(res => this.dashboardService.checkProjectExistance(res).subscribe(status => {
        this.setNameValidity(status);
        if (status) {
          this.nameUnique = false;
        } else {
          this.nameUnique = true;
        }
      }));
    }
  }

  saveInputValue(event) {
    this.service.customerProjectName.next(event.target.value);
  }

  setNameValidity(status) {
    this.service.customerProjectExistance.next(status)
  }

  nextStage() {
    const stage = STAGES.indexOf(this.router.url);
    this.router.navigateByUrl(STAGES[stage + 1]);
  }

}
