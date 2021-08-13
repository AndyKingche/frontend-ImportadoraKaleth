import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosListComponent } from './parametros-list.component';

describe('ParametrosListComponent', () => {
  let component: ParametrosListComponent;
  let fixture: ComponentFixture<ParametrosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametrosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
