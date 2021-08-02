import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidaFormComponent } from './medida-form.component';

describe('MedidaFormComponent', () => {
  let component: MedidaFormComponent;
  let fixture: ComponentFixture<MedidaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedidaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedidaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
