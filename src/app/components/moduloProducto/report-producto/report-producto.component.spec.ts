import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProductoComponent } from './report-producto.component';

describe('ReportProductoComponent', () => {
  let component: ReportProductoComponent;
  let fixture: ComponentFixture<ReportProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
