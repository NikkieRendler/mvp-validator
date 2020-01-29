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

export const STAGES = [
  '/theme',
  // '/design',
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
          transform: 'translateX(0)'
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(100px)'
        }),
        animate(200)
      ]),
      transition('* => void', [
        animate(
          200,
          style({
            opacity: 0,
            transform: 'translateX(-100px)'
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
  selectedFeatures: string[] = null;
  projectTitle: string = null;

  firstColorScheme = 'hsla(209, 100%, 55%, 1)';
  secondColorScheme = 'hsla(40, 96%, 53%, 1)';
  thirdColorScheme = 'hsla(321, 90%, 25%, 1)';
  customColorScheme: string;

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.getDesignSelection();
    this.getThemeSelection();
    this.handleStageChange();
  }

  handleStageChange() {
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
    if (this.currentRoute === '/theme') {
      this.servise.customerProjectTheme.subscribe(res => {
        res === '' ? shouldDisable = true : null;
      });
    }
    if (this.currentRoute === '/name') {
      this.servise.customerProjectExistance.subscribe(status => {
        shouldDisable = status;
      });
    }
    if (this.currentRoute === '/title') {
      this.servise.customerProjectTitle.subscribe(res => {
        res === '' ? shouldDisable = true : null;
      });
    }
    if (this.currentRoute === '/description') {
      this.servise.customerProjectDescription.subscribe(res => {
        res === '' ? shouldDisable = true : null;
      })
    }
    if (this.currentRoute === '/features') {
      this.getFeaturesSelection();
      const checkFeaturesEmpty = () => {
        if (this.selectedFeatures.some(value => value === '' ? true : false) || this.selectedFeatures.length === 0) {
          return true;
        }
      };
      shouldDisable = checkFeaturesEmpty();
    }
    return shouldDisable;
  }
}
