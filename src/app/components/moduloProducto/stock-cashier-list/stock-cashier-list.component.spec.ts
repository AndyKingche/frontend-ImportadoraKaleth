import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCashierListComponent } from './stock-cashier-list.component';

describe('StockCashierListComponent', () => {
  let component: StockCashierListComponent;
  let fixture: ComponentFixture<StockCashierListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockCashierListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockCashierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
