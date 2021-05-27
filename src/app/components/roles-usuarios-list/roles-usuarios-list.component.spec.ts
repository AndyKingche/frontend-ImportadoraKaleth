import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesUsuariosListComponent } from './roles-usuarios-list.component';

describe('RolesUsuariosListComponent', () => {
  let component: RolesUsuariosListComponent;
  let fixture: ComponentFixture<RolesUsuariosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesUsuariosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesUsuariosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
