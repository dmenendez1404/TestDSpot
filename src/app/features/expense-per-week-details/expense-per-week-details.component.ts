import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Expense} from '../expenses-list/expenses-list.component';

@Component({
  selector: 'app-expense-per-week-details',
  templateUrl: './expense-per-week-details.component.html',
  styleUrls: ['./expense-per-week-details.component.scss']
})
export class ExpensePerWeekDetailsComponent implements OnInit {

  @Input() expensesWeek: any[];
  @Input() isActive;
  average = 0;
  total = 0;

  displayedColumns: string[] = ['name', 'value', 'date'];
  dataSource;
  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Expense>(this.expensesWeek);
    this.expensesWeek.forEach((expense)=> this.total+=expense.value)
    this.average = this.total/this.expensesWeek.length
  }

}
