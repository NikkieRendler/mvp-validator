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

  // TESTING
  // customerProjectDesign: BehaviorSubject<string> = new BehaviorSubject<string>('flat');
  // customerProjectTheme: BehaviorSubject<string> = new BehaviorSubject<string>('hsl(321, 90%, 25%)');
  // customerProjectName: BehaviorSubject<string> = new BehaviorSubject<string>('Project name');
  // customerProjectExistance: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  // customerProjectTitle: BehaviorSubject<string> = new BehaviorSubject<string>('We are the legion you despise');
  // customerProjectFeatures: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(['Until the world cames crushing down', 'So let us stand out battleground', 'Everything that I need']);
  // customerProjectDescription: BehaviorSubject<string> = new BehaviorSubject<string>("Sake expires from child to child in a silver screen portation. It's californication. Dream of californication");

  customerProjectDesign: BehaviorSubject<string> = new BehaviorSubject<string>('');
  customerProjectTheme: BehaviorSubject<string> = new BehaviorSubject<string>('');
  customerProjectName: BehaviorSubject<string> = new BehaviorSubject<string>('');
  customerProjectExistance: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  customerProjectTitle: BehaviorSubject<string> = new BehaviorSubject<string>('');
  customerProjectFeatures: BehaviorSubject<String[]> = new BehaviorSubject<String[]>(['', '', '']);
  customerProjectDescription: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor() { }
}
