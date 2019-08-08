import {Injectable} from '@angular/core';
import {BehaviorSubject, from} from 'rxjs';
import {Expense} from './expenses-list/expenses-list.component';
import {groupBy, map, mergeMap, toArray} from 'rxjs/operators';

const GENERAL_EXPENSES: Expense[] = [
  {name: 'Hydrogen', value: 1.0079, date: new Date('08/1/2019')},
  {name: 'Helium', value: 4.0026, date: new Date('08/2/2019')},
  {name: 'Lithium', value: 6.941, date: new Date('08/7/2019')},
  {name: 'Beryllium', value: 9.0122, date: new Date('08/10/2019')},
  {name: 'Boron', value: 10.811, date: new Date('08/14/2019')},
  {name: 'Carbon', value: 12.0107, date: new Date('08/21/2019')},
  {name: 'Nitrogen', value: 14.0067, date: new Date('07/1/2019')},
  {name: 'Oxygen', value: 15.9994, date: new Date('07/10/2019')},
  {name: 'Fluorine', value: 18.9984, date: new Date('08/22/2019')},
  {name: 'Neon', value: 20.1797, date: new Date('08/23/2019')},
];

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  generalExpenses$ = new BehaviorSubject<any>(GENERAL_EXPENSES);

  constructor() {
  }

  getGeneralExpenses() {
    return this.generalExpenses$;
  }

  createExpense(expense) {
    GENERAL_EXPENSES.push({name: expense.name, value: expense.value, date: new Date()},);
    this.generalExpenses$.next(GENERAL_EXPENSES);
  }

  getExpensesByWeek(list = GENERAL_EXPENSES) {
    return from(list).pipe(
      groupBy(expense => {
        return this.getWeekOfYear(expense.date);
      }),
      // return each item in group as array
      mergeMap(group => group.pipe(toArray())),
      // return each group as an array
      toArray(),
      map((weekArray: any[]) => {
        return weekArray.map(weekExpenses => {
          return {
            weekNumber: this.getWeekOfYear(new Date(weekExpenses[0].date)),
            week: this.getWeeksLimits(weekExpenses[0].date),
            expensesPerWeek: weekExpenses
          };
        });
      }),
      map((weekArray: any[]) => weekArray.sort((a, b) => {
        if (a.weekNumber < b.weekNumber)
          return -1;
        if (a.weekNumber > b.weekNumber)
          return 1;
        return 0;
      }))
    );
  }

  getWeeksLimits(date: Date) {
    const dateOffset = (24*60*60*1000)
    const firstDayOfWeek = new Date(date);
    firstDayOfWeek.setTime(date.getTime() - ((date.getDay()-1)*dateOffset));
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setTime(date.getTime() + dateOffset*(6-(date.getDay()-1)));
    return {firstDayOfWeek: firstDayOfWeek, lastDayOfWeek: lastDayOfWeek};
  }

  getWeekOfYear(date: Date) {
    const today = new Date(Date.now());
    const firstDay: Date = new Date(today.getFullYear(), 0, 1);
    return Math.ceil((((date.valueOf() - firstDay.valueOf()) / 86400000) + firstDay.getDay() + 1) / 7);
  }

  filterAndGroupByWeek(result){
    const filterList = GENERAL_EXPENSES.filter((val) => val.date >= result.from && val.date <= result.to);
    return this.getExpensesByWeek(filterList)
  }
}
