import { TestBed } from '@angular/core/testing';

import { SildersListService } from './silders-list.service';

describe('SildersListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SildersListService = TestBed.get(SildersListService);
    expect(service).toBeTruthy();
  });
});
