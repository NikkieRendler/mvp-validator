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
  // customerProjectTitle: BehaviorSubject<string> = new BehaviorSubject<string>('We are the legion you despise');
  // customerProjectFeatures: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(['Until the world cames crushing down', 'So let us stand out battleground', 'Everything that I need']);
  // customerProjectDescription: BehaviorSubject<string> = new BehaviorSubject<string>("Sake expires from child to child in a silver screen portation. It's californication. Dream of californication");

  customerProjectDesign: BehaviorSubject<string> = new BehaviorSubject<string>('');
  customerProjectTheme: BehaviorSubject<string> = new BehaviorSubject<string>('hsl(321, 90%, 25%)');
  customerProjectName: BehaviorSubject<string> = new BehaviorSubject<string>('Анрюха, привет');
  customerProjectTitle: BehaviorSubject<string> = new BehaviorSubject<string>('Чё такой грустный?');
  customerProjectFeatures: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(['Давай за нас', "Давай за всю хурму", "Да так чтоб навек"]);
  customerProjectDescription: BehaviorSubject<string> = new BehaviorSubject<string>('И да прибудет с нами сила, во имя осла и мыла и святого пуха');
  constructor() { }
}
