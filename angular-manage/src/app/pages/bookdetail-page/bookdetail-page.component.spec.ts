import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookdetailPageComponent } from './bookdetail-page.component';

describe('BookdetailPageComponent', () => {
  let component: BookdetailPageComponent;
  let fixture: ComponentFixture<BookdetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookdetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookdetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
