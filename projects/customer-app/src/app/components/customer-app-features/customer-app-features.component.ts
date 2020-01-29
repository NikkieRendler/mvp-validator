import { Component, OnInit } from '@angular/core';
import { ProjectSetupService } from 'src/app/services/project-setup.service';
import { Router } from '@angular/router';
import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { STAGES } from 'src/app/components/project-setup/project-setup.component';

@Component({
  selector: 'app-customer-app-features',
  templateUrl: './customer-app-features.component.html',
  styleUrls: ['./customer-app-features.component.scss']
})
export class CustomerAppFeaturesComponent implements OnInit {

  currentRoute: string;
  selectedTheme: string;
  selectedDesign: string;
  featuresForm: FormGroup;
  get featuresArray() {
    return this.featuresForm.get('featuresArray') as FormArray;
  }
  constructor(
    private service: ProjectSetupService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.featuresForm = this.fb.group({
      featuresArray: this.fb.array([])
    });
    this.currentRoute = this.router.url;
    this.service.customerProjectTheme.subscribe(res => {
      this.selectedTheme = res;
    });

    this.service.customerProjectFeatures.value.forEach(i => {
      this.addFeature();
    });

    this.service.customerProjectFeatures.subscribe(res => {
      this.featuresArray.setValue(res);
    });
  }

  addFeature() {
    this.featuresArray.push(this.fb.control(''));
  }

  removeFeature(i) {
    this.featuresArray.removeAt(i);
  }

  makeRemovable() {
    return this.featuresArray.length <= 5 && this.featuresArray.length > 3;
  }

  showAddButton() {
    return this.featuresArray.length >= 3 && this.featuresArray.length < 5;
  }

  saveFeaturesValue() {
    this.service.customerProjectFeatures.next(this.featuresArray.value);
  }

  nextStage() {
    if (!this.checkValidity()) {
      const stage = STAGES.indexOf(this.router.url);
      this.router.navigateByUrl(STAGES[stage + 1]);
    }
  }

  checkValidity() {
    return this.featuresArray.value.some((value: String) => value.trim().length === 0 ? true : false);
  }

}
