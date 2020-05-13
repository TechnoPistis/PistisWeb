import { TestBed } from '@angular/core/testing';

import { RegistervenderService } from './registervender.service';

describe('RegistervenderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistervenderService = TestBed.get(RegistervenderService);
    expect(service).toBeTruthy();
  });
});
