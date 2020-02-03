import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectSetupService } from 'src/app/services/project-setup.service';
import { DashboardService, ProjectConfig } from 'src/app/services/dashboard.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {
  @ViewChild('colorPickerInput', null) colorPickerInput: ElementRef;

  projectUrl: string;
  composedProject: ProjectConfig;
  isUserLogged: boolean;
  isEngagementListVisible: boolean = false;
  isEditingProject: boolean = false;
  editingFormGroup: FormGroup;
  colorControl: FormControl = new FormControl();

  testStr: string;
  modalView: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectSetupService: ProjectSetupService,
    private dashboardService: DashboardService,
    private fb: FormBuilder
  ) { }

  get featuresFormArray() {
    return this.editingFormGroup.get('features') as FormArray;
  }

  ngOnInit() {
    this.projectUrl = this.route.snapshot.paramMap.get('url');
    this.isUserLogged = localStorage.getItem('token') !== null;
    this.dashboardService.getProjectConfig(this.projectUrl).subscribe(res => {
      this.composedProject = res.landingConfigs[0];
      this.editingFormGroup = this.fb.group({
        theme: [null],
        title: [null],
        description: [null],
        features: this.fb.array([])
      });
      this.composedProject.features.map(i => {
        this.addFeatureControl();
      });
    });
    this.colorControl.valueChanges.pipe(
      debounceTime(200)
    ).subscribe(res => this.editProject());
  }

  addFeatureControl() {
    this.featuresFormArray.push(this.fb.control(''));
  }

  showProjectPreview(project: ProjectConfig) {
    this.clearProjectConfig();
    window.open(`/dashboard/project/${project.url}`);
  }

  clearProjectConfig() {
    this.projectSetupService.customerProjectDescription.next('');
    this.projectSetupService.customerProjectFeatures.next([]);
    this.projectSetupService.customerProjectName.next('');
    this.projectSetupService.customerProjectTheme.next('');
    this.projectSetupService.customerProjectTitle.next('');
  }

  showEngagementList() {
    this.isEngagementListVisible = !this.isEngagementListVisible;
  }

  assignNewFeature(index, changedValue) {
    this.composedProject.features[index] = changedValue;
    this.editProject();
  }

  editProject() {
    this.dashboardService.editProject(this.composedProject).subscribe(res => {
      console.log(res);
    });
  }

  deleteProject(id) {
    this.dashboardService.deleteProject(id).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('/dashboard');
    });
  }

  toggleDeleteModal() {
    this.modalView = !this.modalView;
  }

  handleCancel(): void {
    this.modalView = false;
  }

  openColorPicker() {
    const inputElement: HTMLElement = this.colorPickerInput.nativeElement as HTMLElement;
    inputElement.click();
  }

  changeColor(event) {
    this.colorControl.setValue(event)
  }

}
