import { TestBed } from '@angular/core/testing';

import { CatService } from './cat.service';

describe('CatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatService = TestBed.get(CatService);
    expect(service).toBeTruthy();
  });
});
