import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesPerWeekComponent } from './expenses-per-week.component';

describe('ExpensesPerWeekComponent', () => {
  let component: ExpensesPerWeekComponent;
  let fixture: ComponentFixture<ExpensesPerWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesPerWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesPerWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
