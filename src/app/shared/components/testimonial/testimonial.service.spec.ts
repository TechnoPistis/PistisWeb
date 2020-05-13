import { TestBed } from '@angular/core/testing';

import { TestimonialService } from './testimonial.service';

describe('TestimonialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestimonialService = TestBed.get(TestimonialService);
    expect(service).toBeTruthy();
  });
});
