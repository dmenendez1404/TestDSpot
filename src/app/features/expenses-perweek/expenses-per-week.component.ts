import {Component, OnInit} from '@angular/core';
import {ExpenseService} from '../expense.service';
import {NguCarousel, NguCarouselConfig} from '@ngu/carousel';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {DialogFormComponent} from '../dialog-form/dialog-form.component';
import {Validators} from '@angular/forms';
import {Expense} from '../expenses-list/expenses-list.component';

@Component({
  selector: 'app-expenses-perweek',
  templateUrl: './expenses-per-week.component.html',
  styleUrls: ['./expenses-per-week.component.scss']
})
export class ExpensesPerWeekComponent implements OnInit {

  expensesByWeek: any[];
  public weeksCarruselConfig: NguCarouselConfig;
  public expensesPerWeeksCarruselConfig: NguCarouselConfig;
  isOverlay = false;
  activePoint;

  constructor(private expenseService: ExpenseService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.weeksCarruselConfig = {
      grid: {xs: 1, sm: 2, md: 3, lg: 4, all: 0},
      slide: 10,
      speed: 500,
      animation: 'lazy',
      point: {
        visible: true,
      },
      load: 3,
      easing: 'ease-in',
      velocity: 0,
      loop: true,
      touch: true,
      custom: 'banner'
    };
    this.expensesPerWeeksCarruselConfig = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 500,
      animation: 'lazy',
      point: {
        visible: true
      },
      loop: true,
      touch: false,
      custom: 'banner'
    };
    this.expenseService.getExpensesByWeek().subscribe((ePW) => this.expensesByWeek = ePW);
  }

  filterByDate() {
    this.isOverlay = true;
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '800px',
      data: {
        tittle: 'Filter By Date',
        buttonText: 'Filter',
        items: [
          {name: 'from', value: new Date(), type: 'Date', validators: Validators.required},
          {name: 'to', value: new Date(), type: 'Date', validators: Validators.required}
        ]
      }
    });

    dialogRef.afterClosed().subscribe((result: { from: Date, to: Date }) => {
      this.isOverlay = false;
      if (!!result) {
        this.expenseService.filterAndGroupByWeek(result).subscribe((res) => {
          this.expensesByWeek = res;

        });
      }
    });
  }

}
