import { TestBed } from '@angular/core/testing';

import { RolesUsuariosService } from './roles-usuarios.service';

describe('RolesUsuariosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RolesUsuariosService = TestBed.get(RolesUsuariosService);
    expect(service).toBeTruthy();
  });
});
