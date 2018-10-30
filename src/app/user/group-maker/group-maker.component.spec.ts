import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMakerComponent } from './group-maker.component';

describe('GroupMakerComponent', () => {
  let component: GroupMakerComponent;
  let fixture: ComponentFixture<GroupMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
