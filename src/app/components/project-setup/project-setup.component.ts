import { Component, OnInit } from '@angular/core';
import { ProjectSetupService } from 'src/app/services/project-setup.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';

export const STAGES = [
  '/theme',
  '/name',
  '/title',
  '/features',
  '/description',
  '/project-preview'
];

@Component({
  selector: 'app-project-setup',
  templateUrl: './project-setup.component.html',
  styleUrls: ['./project-setup.component.scss'],
  animations: [
    trigger('templateChange', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateY(0)'
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(50px)'
        }),
        animate(200)
      ]),
      transition('* => void', [
        animate(
          200,
          style({
            opacity: 0,
            transform: 'translateY(-50px)'
          })
        )
      ])
    ])
  ]
})
export class ProjectSetupComponent implements OnInit {
  constructor(private servise: ProjectSetupService, private router: Router) { }
  currentRoute: string = null;
  selectedDesign: string = null;
  stageTitle: string = null;
  stageDescr: string = null;
  selectedTheme: string = null;
  selectedFeatures: String[] = null;
  projectTitle: string = null;

  stepperPosition = 1000;

  firstColorScheme = 'hsl(209, 100%, 55%)';
  secondColorScheme = 'hsl(40, 96%, 53%)';
  thirdColorScheme = 'hsl(321, 90%, 25%)';
  customColorScheme: string;

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.getDesignSelection();
    this.getThemeSelection();
    this.setStageText();
  }

  onIndexChange(event: number): void {
    this.stepperPosition = event;
    this.router.navigateByUrl(STAGES[event]);
  }

  setStageText() {
    switch (this.router.url) {
      case '/design':
        this.stageTitle = 'Choose design that suits you best';
        this.stageDescr = 'Those are best design practices gathered for you';
        break;
      case '/name':
        this.stageTitle = 'Name your project';
        this.stageDescr =
          'That\'s what your customers will see first. Make it mean the right thing';
        break;
      case '/features':
        this.stageTitle = 'Expose the main strengths';
        this.stageDescr =
          'Tell what you do better, faster, more convenient (3-5 features)';
        break;
      case '/theme':
        this.stageTitle = 'Select color scheme';
        this.stageDescr =
          'Choose from ready-to-go schemes or customize your own if needed';
        break;
      case '/title':
        this.stageTitle = 'Tell them what you do';
        this.stageDescr = 'In one sentence';
        break;
      case '/description':
        this.stageTitle = 'Sum up who you are and what you do';
        this.stageDescr =
          'Short description of idea or project to complete the picture';
        break;
    }
  }

  checkStepperStage(stepIndex) {
    const stepToCheck = STAGES[stepIndex];
    if (stepToCheck === this.currentRoute) {
      return 'process';
    } else {
      let status;

      if (stepToCheck === '/theme') {
        this.servise.customerProjectTheme.subscribe(res => {
          res ? status = 'finish' : status = 'wait';
        });
        return status;
      }
      if (stepToCheck === '/name') {
        this.servise.customerProjectName.subscribe(res => {
          res ? status = 'finish' : status = 'wait';
        });
        return status;
      }
      if (stepToCheck === '/title') {
        this.servise.customerProjectTitle.subscribe(res => {
          res ? status = 'finish' : status = 'wait';
        });
        return status;
      }
      if (stepToCheck === '/features') {
        this.servise.customerProjectFeatures.subscribe(res => {
          console.log("TCL: ProjectSetupComponent -> checkStepperStage -> res", res);
          res.some(value => value.trim() === '' || value.trim().length === 0) || res.length === 0
            ? status = 'wait'
            : status = 'finish';
        });
        return status;
      }
      if (stepToCheck === '/description') {
        this.servise.customerProjectDescription.subscribe(res => {
          res ? status = 'finish' : status = 'wait';
        });
        return status;
      }
      if (stepToCheck === '/project-preview') {
        this.servise.customerProjectDescription.subscribe(res => {
          res ? status = 'finish' : status = 'wait';
        });
        return status;
      }
    }
  }

  shouldDisablePreview() {
    let fillStatus: boolean;
    combineLatest(
      this.servise.customerProjectTheme,
      this.servise.customerProjectName,
      this.servise.customerProjectTitle,
      this.servise.customerProjectDescription,
      this.servise.customerProjectFeatures
    ).subscribe(res => {
      console.log("TCL: ProjectSetupComponent -> shouldDisablePreview -> res", res)
      if (
        res.some(i => {
          i.length === 0 || i === "" || i === " "
        }) || res[4].some(i => i.trim() === "" || i.length === 0)
      ) {
        fillStatus = true;
      } else {
        fillStatus = false;
      }
    });
    return fillStatus;
  }

  prevStage() {
    const stage = STAGES.indexOf(this.router.url);
    this.router.navigateByUrl(STAGES[stage - 1]);
  }

  nextStage() {
    const stage = STAGES.indexOf(this.router.url);
    this.router.navigateByUrl(STAGES[stage + 1]);
  }

  getDesignSelection() {
    this.servise.customerProjectDesign.subscribe(res => {
      this.selectedDesign = res;
    });
  }

  getThemeSelection() {
    this.servise.customerProjectTheme.subscribe(res => {
      this.selectedTheme = res;
      res !== this.firstColorScheme && res !== this.secondColorScheme && res !== this.thirdColorScheme ?
        this.customColorScheme = res : null
    });
  }

  getFeaturesSelection() {
    this.servise.customerProjectFeatures.subscribe(res => {
      this.selectedFeatures = res;
    });
  }

  selectDesign(selectedDesign) {
    this.servise.customerProjectDesign.next(selectedDesign);
    this.getDesignSelection();
    setTimeout(() => {
      this.nextStage();
    }, 300);
  }

  selectTheme(theme) {
    this.servise.customerProjectTheme.next(theme);
    this.getThemeSelection();
    setTimeout(() => {
      this.nextStage();
    }, 300);
  }

  selectName(title) {
    this.servise.customerProjectName.next(title);
  }

  checkValidity() {
    let shouldDisable = false;
    this.servise.customerProjectTheme.subscribe(res => {
      res === '' ? shouldDisable = true : null;
    });
    this.servise.customerProjectExistance.subscribe(status => {
      shouldDisable = status;
    });
    this.servise.customerProjectTitle.subscribe(res => {
      res === '' ? shouldDisable = true : null;
    });
    this.servise.customerProjectDescription.subscribe(res => {
      res === '' ? shouldDisable = true : null;
    });
    this.getFeaturesSelection();
    const checkFeaturesEmpty = () => {
      if (this.selectedFeatures.some(value => value === '' ? true : false) || this.selectedFeatures.length === 0) {
        return true;
      }
    };
    shouldDisable = checkFeaturesEmpty();
    return shouldDisable;
  }
}
