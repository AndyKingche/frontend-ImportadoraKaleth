import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisenosListComponent } from './disenos-list.component';

describe('DisenosListComponent', () => {
  let component: DisenosListComponent;
  let fixture: ComponentFixture<DisenosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisenosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisenosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
