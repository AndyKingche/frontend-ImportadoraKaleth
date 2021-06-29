import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomenuevoFormComponent } from './homenuevo-form.component';

describe('HomenuevoFormComponent', () => {
  let component: HomenuevoFormComponent;
  let fixture: ComponentFixture<HomenuevoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomenuevoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomenuevoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
