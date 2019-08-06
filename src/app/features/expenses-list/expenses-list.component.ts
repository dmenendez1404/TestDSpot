import {Component, OnInit, ViewChild} from '@angular/core';
import {MAT_DATE_FORMATS, MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {FormControl} from '@angular/forms';
import {DialogChangePasswordComponent} from '../dialog-changePassword/dialog-change-password.component';
import {DialogFormComponent} from '../dialog-form/dialog-form.component';
import {ExpenseService} from '../expense.service';

export interface Expense {
  name: string;
  value: number;
  date: Date;
}

const DSPOT_MODE_FORMATS = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'DDDD MMMM - YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DDDD MMMM YYYY',
  },
};

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: DSPOT_MODE_FORMATS}
  ]
})
export class ExpensesListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'value', 'date', 'actions'];
  dataSource;
  filterForm: FormControl = new FormControl();
  generalExpenses = [];
  filtering = false;

  constructor(public dialog: MatDialog, private expenseService: ExpenseService) {
  }

  ngOnInit() {
    this.expenseService.getGeneralExpenses().subscribe((expenses) => {
      this.generalExpenses = expenses;
      this.dataSource = new MatTableDataSource<Expense>(this.generalExpenses);
    });
  }

  remove(element) {
    const list = this.generalExpenses;
    list.splice(this.generalExpenses.indexOf(element), 1);
    this.dataSource = new MatTableDataSource<Expense>(list);
  }

  filterByDate() {

    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '800px',
      data: {
        tittle: 'Filter By Date',
        items: [
          {name: 'from', value: new Date(), type: 'Date'},
          {name: 'to', value: new Date(), type: 'Date'}
        ]
      }
    });

    dialogRef.afterClosed().subscribe((result: { from: Date, to: Date }) => {
      if (!!result) {
        this.filtering = true;
        const filterList = this.generalExpenses.filter((val) => val.date >= result.from && val.date <= result.to);
        this.dataSource = new MatTableDataSource<Expense>(filterList);
      }
    });
  }

  filterByAmount() {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '800px',
      data: {
        tittle: 'Filter By Amount',
        items: [
          {name: 'amount', value: '', type: 'number', prefix: 'attach_money'}
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.filtering = true;
        const filterList = this.generalExpenses.filter((val) => val.value === result.amount);
        this.dataSource = new MatTableDataSource<Expense>(filterList);
      }
    });
  }

  editExpense(element) {
    const index = this.generalExpenses.indexOf(element);
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '800px',
      data: {
        tittle: 'Edit Expense',
        items: [
          {name: 'name', value: element.name, type: 'text'},
          {name: 'value', value: element.value, type: 'number', prefix: 'attach_money'}
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.generalExpenses[index].name = result.name;
        this.generalExpenses[index].value = result.value;
        this.dataSource = new MatTableDataSource<Expense>(this.generalExpenses);
      }
    });
  }

  resetList() {
    this.filtering = false
    this.dataSource = new MatTableDataSource<Expense>(this.generalExpenses);
  }

  newExpense() {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '800px',
      data: {
        tittle:'Edit Expense',
        items: [
          {name: 'name', value: '', type: 'text'},
          {name: 'value', value: '', type: 'number', prefix: 'attach_money'}
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.expenseService.createExpense(result);
      }
    });
  }
}
