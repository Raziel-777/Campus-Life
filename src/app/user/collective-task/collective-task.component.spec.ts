import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectiveTaskComponent } from './collective-task.component';

describe('CollectiveTaskComponent', () => {
  let component: CollectiveTaskComponent;
  let fixture: ComponentFixture<CollectiveTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectiveTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectiveTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
