import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaFechaComponent } from './factura-fecha.component';

describe('FacturaFechaComponent', () => {
  let component: FacturaFechaComponent;
  let fixture: ComponentFixture<FacturaFechaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaFechaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
