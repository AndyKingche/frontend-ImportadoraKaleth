import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionFormComponent } from './facturacion-form.component';

describe('FacturacionFormComponent', () => {
  let component: FacturacionFormComponent;
  let fixture: ComponentFixture<FacturacionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturacionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
