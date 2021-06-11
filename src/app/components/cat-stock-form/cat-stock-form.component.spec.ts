import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatStockFormComponent } from './cat-stock-form.component';

describe('CatStockFormComponent', () => {
  let component: CatStockFormComponent;
  let fixture: ComponentFixture<CatStockFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatStockFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatStockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
