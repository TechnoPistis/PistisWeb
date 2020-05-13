import { TestBed } from '@angular/core/testing';

import { TestiService } from './testi.service';

describe('TestiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestiService = TestBed.get(TestiService);
    expect(service).toBeTruthy();
  });
});
