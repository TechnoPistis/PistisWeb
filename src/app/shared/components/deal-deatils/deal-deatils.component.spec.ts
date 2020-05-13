import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealDeatilsComponent } from './deal-deatils.component';

describe('DealDeatilsComponent', () => {
  let component: DealDeatilsComponent;
  let fixture: ComponentFixture<DealDeatilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealDeatilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
