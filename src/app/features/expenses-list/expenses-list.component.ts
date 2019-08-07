import {Component, OnInit, ViewChild} from '@angular/core';
import {MAT_DATE_FORMATS, MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {DialogChangePasswordComponent} from '../dialog-changePassword/dialog-change-password.component';
import {DialogFormComponent} from '../dialog-form/dialog-form.component';
import {ExpenseService} from '../expense.service';

export interface Expense {
  name: string;
  value: number;
  date: Date;
}

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'value', 'date', 'actions'];
  dataSource;
  filterForm: FormControl = new FormControl();
  generalExpenses = [];
  filtering = false;

  isOverlay = false;

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
    this.isOverlay = true;
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '800px',
      data: {
        tittle: 'Filter By Date',
        buttonText: 'Filter',
        items: [
          {name: 'from', value: new Date(), type: 'Date', validators:Validators.required},
          {name: 'to', value: new Date(), type: 'Date', validators:Validators.required}
        ]
      }
    });

    dialogRef.afterClosed().subscribe((result: { from: Date, to: Date }) => {
      this.isOverlay = false
      if (!!result) {
        this.filtering = true;
        const filterList = this.generalExpenses.filter((val) => val.date >= result.from && val.date <= result.to);
        this.dataSource = new MatTableDataSource<Expense>(filterList);
      }
    });
  }

  filterByAmount() {
    this.isOverlay = true
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '800px',
      data: {
        tittle: 'Filter By Amount',
        buttonText: 'Filter',
        items: [
          {name: 'amount', value: '', type: 'number',
            prefix: 'attach_money', validators:Validators.required}
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isOverlay = false
      if (!!result) {
        this.filtering = true;
        const filterList = this.generalExpenses.filter((val) => val.value === result.amount);
        this.dataSource = new MatTableDataSource<Expense>(filterList);
      }
    });
  }

  editExpense(element) {
    this.isOverlay = true
    const index = this.generalExpenses.indexOf(element);
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '800px',
      data: {
        tittle: 'Edit Expense',
        buttonText: 'Ok',
        items: [
          {name: 'name', value: element.name, type: 'text', validators:Validators.required},
          {name: 'value', value: element.value, type: 'number',
            prefix: 'attach_money', validators:Validators.required}
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isOverlay = false
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
        buttonText: 'Ok',
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
