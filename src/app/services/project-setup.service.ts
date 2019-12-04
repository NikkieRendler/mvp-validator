import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectSetupService {

  customerProjectData = new BehaviorSubject(null);

  constructor() { }
}
