import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddUsersComponent } from './dialog-add-users.component';

describe('DialogAddUsersComponent', () => {
  let component: DialogAddUsersComponent;
  let fixture: ComponentFixture<DialogAddUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
