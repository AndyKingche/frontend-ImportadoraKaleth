import { TestBed } from '@angular/core/testing';

import { DisenosService } from './disenos.service';

describe('DisenosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisenosService = TestBed.get(DisenosService);
    expect(service).toBeTruthy();
  });
});
