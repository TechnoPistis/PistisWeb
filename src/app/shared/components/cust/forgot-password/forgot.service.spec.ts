import { TestBed } from '@angular/core/testing';

import { ForgotService } from './forgot.service';

describe('ForgotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForgotService = TestBed.get(ForgotService);
    expect(service).toBeTruthy();
  });
});
