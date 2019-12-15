import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAppDescriptionComponent } from './customer-app-description.component';

describe('CustomerAppDescriptionComponent', () => {
  let component: CustomerAppDescriptionComponent;
  let fixture: ComponentFixture<CustomerAppDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAppDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAppDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
