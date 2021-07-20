import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionCashierComponent } from './facturacion-cashier.component';

describe('FacturacionCashierComponent', () => {
  let component: FacturacionCashierComponent;
  let fixture: ComponentFixture<FacturacionCashierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturacionCashierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturacionCashierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
