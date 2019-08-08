import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensePerWeekDetailsComponent } from './expense-per-week-details.component';

describe('ExpensePerWeekDetailsComponent', () => {
  let component: ExpensePerWeekDetailsComponent;
  let fixture: ComponentFixture<ExpensePerWeekDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensePerWeekDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensePerWeekDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
