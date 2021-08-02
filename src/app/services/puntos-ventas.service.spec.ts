import { TestBed } from '@angular/core/testing';

import { PuntosVentasService } from './puntos-ventas.service';

describe('PuntosVentasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PuntosVentasService = TestBed.get(PuntosVentasService);
    expect(service).toBeTruthy();
  });
});
