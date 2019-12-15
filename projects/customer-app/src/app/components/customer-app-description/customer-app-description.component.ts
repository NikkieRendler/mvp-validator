import { Component, OnInit } from "@angular/core";
import { ProjectSetupService } from "src/app/services/project-setup.service";
import { STAGES } from "src/app/components/project-setup/project-setup.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-customer-app-description",
  templateUrl: "./customer-app-description.component.html",
  styleUrls: ["./customer-app-description.component.scss"]
})
export class CustomerAppDescriptionComponent implements OnInit {
  selectedDescription: string;
  currentRoute: string;

  constructor(private service: ProjectSetupService, private router: Router) {}

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.service.customerProjectDescription.subscribe(res => {
      this.selectedDescription = res;
    });
  }

  saveInputValue(event) {
    this.service.customerProjectDescription.next(event.target.value);
  }

  nextStage() {
    const stage = STAGES.indexOf(this.router.url);
    this.router.navigateByUrl(STAGES[stage + 1]);
  }
}
