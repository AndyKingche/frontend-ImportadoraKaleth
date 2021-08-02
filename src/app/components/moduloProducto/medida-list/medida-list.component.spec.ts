import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidaListComponent } from './medida-list.component';

describe('MedidaListComponent', () => {
  let component: MedidaListComponent;
  let fixture: ComponentFixture<MedidaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedidaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedidaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
