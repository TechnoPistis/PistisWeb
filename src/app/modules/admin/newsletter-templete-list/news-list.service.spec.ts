import { TestBed } from '@angular/core/testing';

import { NewsListService } from './news-list.service';

describe('NewsListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewsListService = TestBed.get(NewsListService);
    expect(service).toBeTruthy();
  });
});
