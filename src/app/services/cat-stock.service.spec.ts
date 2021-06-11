import { TestBed } from '@angular/core/testing';

import { CatStockService } from './cat-stock.service';

describe('CatStockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatStockService = TestBed.get(CatStockService);
    expect(service).toBeTruthy();
  });
});
