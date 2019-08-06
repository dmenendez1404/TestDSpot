import {Component, OnInit, ViewChild} from '@angular/core';
import {MAT_DATE_FORMATS, MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {FormControl} from '@angular/forms';
import {DialogChangePasswordComponent} from '../dialog-changePassword/dialog-change-password.component';
import {DialogFormComponent} from '../dialog-form/dialog-form.component';

export interface Expense {
  name: string;
  value: number;
  date: Date;
}

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
  providers:[
    {provide: MAT_DATE_FORMATS, useValue: DSPOT_MODE_FORMATS}
  ]
})
export class ExpensesListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'value', 'date', 'actions'];
  dataSource = new MatTableDataSource<Expense>(GENERAL_EXPENSES);
  filterForm: FormControl = new FormControl();

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {

  }

  remove(element) {
    const list = GENERAL_EXPENSES;
    list.splice(GENERAL_EXPENSES.indexOf(element), 1);
    this.dataSource = new MatTableDataSource<Expense>(list);
  }

  filterByDate(){
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '800px',
      data: [
        {name: 'from', value: new Date(), type: 'Date'},
        {name: 'to', value: new Date(), type: 'Date'}
      ]
    });

    dialogRef.afterClosed().subscribe((result:{from:Date, to: Date}) => {
      if (!!result) {
        const filterList = GENERAL_EXPENSES.
        filter((val)=> val.date.getMilliseconds() >= result.from.getMilliseconds() &&
          val.date.getMilliseconds() < result.to.getMilliseconds())
        this.dataSource = new MatTableDataSource<Expense>(filterList);
      }
    });
  }

  filterByAmount(){
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '800px',
      data: [
        {name: 'amount', value: '', type: 'number', prefix: 'attach_money'}
      ]
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        console.log(result)
        const filterList = GENERAL_EXPENSES.filter((val)=>val.value === result.amount)
        this.dataSource = new MatTableDataSource<Expense>(filterList);
      }
    });
  }

  editExpense(element) {
    const index = GENERAL_EXPENSES.indexOf(element);
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '800px',
      data: [
        {name: 'name', value: element.name, type: 'text'},
        {name: 'value', value: element.value, type: 'number', prefix: 'attach_money'}
      ]
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        GENERAL_EXPENSES[index].name = result.name;
        GENERAL_EXPENSES[index].value = result.value;
        this.dataSource = new MatTableDataSource<Expense>(GENERAL_EXPENSES);
      }
    });
  }

  resetList(){
    this.dataSource = new MatTableDataSource<Expense>(GENERAL_EXPENSES);
  }
}
