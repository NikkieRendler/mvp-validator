import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAppTitleComponent } from './customer-app-title.component';

describe('CustomerAppTitleComponent', () => {
  let component: CustomerAppTitleComponent;
  let fixture: ComponentFixture<CustomerAppTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAppTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAppTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
