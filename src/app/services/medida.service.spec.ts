import { TestBed } from '@angular/core/testing';

import { MedidaService } from './medida.service';

describe('MedidaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedidaService = TestBed.get(MedidaService);
    expect(service).toBeTruthy();
  });
});
