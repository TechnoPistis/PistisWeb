import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaginationComponent } from './admin-pagination.component';

describe('AdminPaginationComponent', () => {
  let component: AdminPaginationComponent;
  let fixture: ComponentFixture<AdminPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
