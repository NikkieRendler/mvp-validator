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

@Component({
    selector: 'app-project-setup',
    templateUrl: './project-setup.component.html',
    styleUrls: ['./project-setup.component.scss'],
    animations: [
        // animation triggers go here
    ]
})


export class ProjectSetupComponent implements OnInit {

    constructor(private servise: ProjectSetupService, private router: Router) { }
    stageCounter = 0;
    stageTitle: string;
    stageDescr: string;
    projectFeatureOne: string;
    projectFeatureTwo: string;
    projectFeatureThree: string;
    projectTitle: string;

    ngOnInit() {
        this.handleStageChange();
    }

    handleStageChange() {
        switch (this.stageCounter) {
            case 0:
                this.stageTitle = 'Name your project';
                this.stageDescr = "That's what your customer will see first. Make it mean the right thing";
                break;
            case 1:
                this.stageTitle = 'Best sides of your idea';
                this.stageDescr = "Each customer looks for the best sides of your idea - give it to them";
                break;
            case 2: 
            this.stageTitle = "Now... Design";
            this.stageDescr = "Set the feel";
                break
        }
    }

    prevStage() {
        if (this.stageCounter === 0) {
            this.router.navigateByUrl('/main');
        }
        this.stageCounter -= 1;
        console.log(this.stageCounter);
        this.handleStageChange();

    }

    nextStage() {
        this.stageCounter += 1;
        console.log(this.stageCounter);
        this.servise.customerProjectData.next(this.projectTitle);
        this.handleStageChange();

    }
}


