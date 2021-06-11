import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationCustomerComponent } from './navigation-customer.component';

describe('NavigationCustomerComponent', () => {
  let component: NavigationCustomerComponent;
  let fixture: ComponentFixture<NavigationCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
