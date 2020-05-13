import { TestBed } from '@angular/core/testing';

import { OrderSService } from './order-s.service';

describe('OrderSService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderSService = TestBed.get(OrderSService);
    expect(service).toBeTruthy();
  });
});
