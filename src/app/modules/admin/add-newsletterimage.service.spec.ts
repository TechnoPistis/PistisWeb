import { TestBed } from '@angular/core/testing';

import { AddNewsletterimageService } from './add-newsletterimage.service';

describe('AddNewsletterimageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddNewsletterimageService = TestBed.get(AddNewsletterimageService);
    expect(service).toBeTruthy();
  });
});
