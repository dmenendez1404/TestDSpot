import { Component, OnInit } from '@angular/core';
import {ExpenseService} from '../expense.service';

@Component({
  selector: 'app-expenses-perweek',
  templateUrl: './expenses-per-week.component.html',
  styleUrls: ['./expenses-per-week.component.scss']
})
export class ExpensesPerWeekComponent implements OnInit {

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.expenseService.getExpensesByWeek().subscribe((ePW)=>console.log('LLEGO ', ePW))
  }

}
