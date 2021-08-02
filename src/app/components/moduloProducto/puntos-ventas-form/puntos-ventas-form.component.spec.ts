import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosVentasFormComponent } from './puntos-ventas-form.component';

describe('PuntosVentasFormComponent', () => {
  let component: PuntosVentasFormComponent;
  let fixture: ComponentFixture<PuntosVentasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntosVentasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntosVentasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
