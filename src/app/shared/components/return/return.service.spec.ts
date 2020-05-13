import { TestBed } from '@angular/core/testing';

import { ReturnService } from './return.service';

describe('ReturnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReturnService = TestBed.get(ReturnService);
    expect(service).toBeTruthy();
  });
});
