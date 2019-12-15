import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAppFeaturesComponent } from './customer-app-features.component';

describe('CustomerAppFeaturesComponent', () => {
  let component: CustomerAppFeaturesComponent;
  let fixture: ComponentFixture<CustomerAppFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAppFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAppFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
