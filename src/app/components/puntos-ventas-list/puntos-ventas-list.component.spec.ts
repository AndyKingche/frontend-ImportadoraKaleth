import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosVentasListComponent } from './puntos-ventas-list.component';

describe('PuntosVentasListComponent', () => {
  let component: PuntosVentasListComponent;
  let fixture: ComponentFixture<PuntosVentasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntosVentasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntosVentasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
