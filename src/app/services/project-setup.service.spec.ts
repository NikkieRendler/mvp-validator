import { TestBed } from '@angular/core/testing';

import { ProjectSetupService } from './project-setup.service';

describe('ProjectSetupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectSetupService = TestBed.get(ProjectSetupService);
    expect(service).toBeTruthy();
  });
});
