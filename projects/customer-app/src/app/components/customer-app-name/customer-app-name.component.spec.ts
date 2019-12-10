import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAppNameComponent } from './customer-app-name.component';

describe('CustomerAppNameComponent', () => {
  let component: CustomerAppNameComponent;
  let fixture: ComponentFixture<CustomerAppNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerAppNameComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAppNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
