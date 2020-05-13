import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewsletterimageComponent } from './add-newsletterimage.component';

describe('AddNewsletterimageComponent', () => {
  let component: AddNewsletterimageComponent;
  let fixture: ComponentFixture<AddNewsletterimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewsletterimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewsletterimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
