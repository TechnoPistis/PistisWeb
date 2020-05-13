import { TestBed } from '@angular/core/testing';

import { EditListService } from './edit-list.service';

describe('EditListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditListService = TestBed.get(EditListService);
    expect(service).toBeTruthy();
  });
});
