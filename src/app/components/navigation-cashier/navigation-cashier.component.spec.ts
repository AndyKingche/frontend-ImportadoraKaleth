import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationCashierComponent } from './navigation-cashier.component';

describe('NavigationCashierComponent', () => {
  let component: NavigationCashierComponent;
  let fixture: ComponentFixture<NavigationCashierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationCashierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationCashierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
