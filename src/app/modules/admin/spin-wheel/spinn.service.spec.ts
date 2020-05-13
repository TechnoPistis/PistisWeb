import { TestBed } from '@angular/core/testing';

import { SpinnService } from './spinn.service';

describe('SpinnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpinnService = TestBed.get(SpinnService);
    expect(service).toBeTruthy();
  });
});
