import { TestBed } from '@angular/core/testing';

import { ReturnListService } from './return-list.service';

describe('ReturnListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReturnListService = TestBed.get(ReturnListService);
    expect(service).toBeTruthy();
  });
});
