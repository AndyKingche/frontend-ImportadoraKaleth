import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesUsuariosFormComponent } from './roles-usuarios-form.component';

describe('RolesUsuariosFormComponent', () => {
  let component: RolesUsuariosFormComponent;
  let fixture: ComponentFixture<RolesUsuariosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesUsuariosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesUsuariosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
