import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatStockListComponent } from './cat-stock-list.component';

describe('CatStockListComponent', () => {
  let component: CatStockListComponent;
  let fixture: ComponentFixture<CatStockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatStockListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
