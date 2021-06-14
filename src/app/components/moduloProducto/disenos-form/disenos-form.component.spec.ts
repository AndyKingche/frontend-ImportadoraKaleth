import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisenosFormComponent } from './disenos-form.component';

describe('DisenosFormComponent', () => {
  let component: DisenosFormComponent;
  let fixture: ComponentFixture<DisenosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisenosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisenosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
