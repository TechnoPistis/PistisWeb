import { TestBed } from '@angular/core/testing';

import { VarientsService } from './varients.service';

describe('VarientsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VarientsService = TestBed.get(VarientsService);
    expect(service).toBeTruthy();
  });
});
