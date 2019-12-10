import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CustomerProjectData {
  design?: string;
  name?: string;
  strongSides?: StrongSides;
  theme?: number;
}

export interface StrongSides {
  first: string;
  second: string;
  third: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectSetupService {

  customerProjectDesign: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  customerProjectTheme: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  customerProjectName: BehaviorSubject<string> = new BehaviorSubject<string>(null);


  constructor() { }
}
