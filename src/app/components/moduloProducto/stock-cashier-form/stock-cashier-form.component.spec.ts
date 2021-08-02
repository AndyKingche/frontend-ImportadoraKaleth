import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCashierFormComponent } from './stock-cashier-form.component';

describe('StockCashierFormComponent', () => {
  let component: StockCashierFormComponent;
  let fixture: ComponentFixture<StockCashierFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockCashierFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockCashierFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
