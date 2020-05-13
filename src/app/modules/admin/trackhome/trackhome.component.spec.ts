import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackhomeComponent } from './trackhome.component';

describe('TrackhomeComponent', () => {
  let component: TrackhomeComponent;
  let fixture: ComponentFixture<TrackhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
