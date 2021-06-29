import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomenuevoComponent } from './homenuevo.component';

describe('HomenuevoComponent', () => {
  let component: HomenuevoComponent;
  let fixture: ComponentFixture<HomenuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomenuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomenuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
