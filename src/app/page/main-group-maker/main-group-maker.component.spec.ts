import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGroupMakerComponent } from './main-group-maker.component';

describe('MainGroupMakerComponent', () => {
  let component: MainGroupMakerComponent;
  let fixture: ComponentFixture<MainGroupMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainGroupMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainGroupMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
