import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Expense} from './expenses-list/expenses-list.component';

const GENERAL_EXPENSES: Expense[] = [
  {name: 'Hydrogen', value: 1.0079, date: new Date()},
  {name: 'Helium', value: 4.0026, date: new Date()},
  {name: 'Lithium', value: 6.941, date: new Date()},
  {name: 'Beryllium', value: 9.0122, date: new Date()},
  {name: 'Boron', value: 10.811, date: new Date()},
  {name: 'Carbon', value: 12.0107, date: new Date()},
  {name: 'Nitrogen', value: 14.0067, date: new Date()},
  {name: 'Oxygen', value: 15.9994, date: new Date()},
  {name: 'Fluorine', value: 18.9984, date: new Date()},
  {name: 'Neon', value: 20.1797, date: new Date()},
];

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  generalExpenses$ = new BehaviorSubject<any>(GENERAL_EXPENSES);

  constructor() { }

  getGeneralExpenses() {
    return this.generalExpenses$;
  }

  createExpense(expense){
    GENERAL_EXPENSES.push( {name: expense.name, value: expense.value, date: new Date()},)
    this.generalExpenses$.next(GENERAL_EXPENSES)
  }

}
