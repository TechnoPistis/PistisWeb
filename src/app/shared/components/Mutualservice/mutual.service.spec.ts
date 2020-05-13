import { TestBed } from '@angular/core/testing';

import { MutualService } from './mutual.service';

describe('MutualService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MutualService = TestBed.get(MutualService);
    expect(service).toBeTruthy();
  });
});
