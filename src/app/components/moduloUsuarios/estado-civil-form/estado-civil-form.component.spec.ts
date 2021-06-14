import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCivilFormComponent } from './estado-civil-form.component';

describe('EstadoCivilFormComponent', () => {
  let component: EstadoCivilFormComponent;
  let fixture: ComponentFixture<EstadoCivilFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoCivilFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoCivilFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
