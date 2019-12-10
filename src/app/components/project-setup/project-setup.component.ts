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
import { map } from 'rxjs/operators';


@Component({
    selector: 'app-project-setup',
    templateUrl: './project-setup.component.html',
    styleUrls: ['./project-setup.component.scss'],
    animations: [
        trigger('templateChange', [
            state('in',
                style({
                    opacity: 1,
                    transform: 'translateX(0)'
                }
                )),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(100px)'
                }),
                animate(200)
            ]),
            transition('* => void', [
                animate(200,
                    style({
                        opacity: 0,
                        transform: 'translateX(-100px)'
                    })
                )])
        ])
    ]
})


export class ProjectSetupComponent implements OnInit {

    constructor(private servise: ProjectSetupService, private router: Router) { }
    customColor: string;
    currentRoute: string;
    stages = ['/theme', '/design', '/name', '/title', '/strong-sides', '/customer-app'];
    selectedDesign: string;
    stageTitle: string;
    stageDescr: string;
    projectFeatureOne: string;
    projectFeatureTwo: string;
    projectFeatureThree: string;
    selectedTheme: string;
    projectTitle: string;

    firstColorScheme = '#1d39c4';
    secondColorScheme = '#faad14';
    thirdColorScheme = '#7cb305';
    customColorScheme: string;

    ngOnInit() {
        this.getDesignSelection();
        this.getThemeSelection();
        this.currentRoute = this.router.url;
        this.handleStageChange();
    }

    handleStageChange() {
        switch (this.router.url) {
            case '/design':
                this.stageTitle = 'Choose design that suits you best';
                this.stageDescr = "Those are best design practices gathered for you";
                break;
            case '/name':
                this.stageTitle = 'Name your project';
                this.stageDescr = "That's what your customer will see first. Make it mean the right thing";
                break;
            case '/strong-sides':
                this.stageTitle = 'Best sides of your idea';
                this.stageDescr = "Each customer looks for the best sides of your idea - give it to them";
                break;
            case '/theme':
                this.stageTitle = "Select color scheme";
                this.stageDescr = "Choose from ready-to-go schemes or customize your own if needed";
                break;
        }
    }

    prevStage() {
        const stage = this.stages.indexOf(this.router.url);
        this.router.navigateByUrl(this.stages[stage - 1]);
    }

    nextStage() {
        const stage = this.stages.indexOf(this.router.url);
        this.router.navigateByUrl(this.stages[stage + 1]);
    }

    getDesignSelection() {
        this.servise.customerProjectDesign.subscribe(res => {
            this.selectedDesign = res;
        });
    }

    getThemeSelection() {
        this.servise.customerProjectTheme.subscribe(res => {
            this.selectedTheme = res;
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

}


