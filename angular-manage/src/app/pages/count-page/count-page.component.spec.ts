import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountPageComponent } from './count-page.component';

describe('CountPageComponent', () => {
  let component: CountPageComponent;
  let fixture: ComponentFixture<CountPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
