import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstroageModuleComponent } from './instroage-module.component';

describe('InstroageModuleComponent', () => {
  let component: InstroageModuleComponent;
  let fixture: ComponentFixture<InstroageModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstroageModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstroageModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
