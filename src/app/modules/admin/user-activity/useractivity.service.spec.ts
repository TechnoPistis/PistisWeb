import { TestBed } from '@angular/core/testing';

import { UseractivityService } from './useractivity.service';

describe('UseractivityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UseractivityService = TestBed.get(UseractivityService);
    expect(service).toBeTruthy();
  });
});
