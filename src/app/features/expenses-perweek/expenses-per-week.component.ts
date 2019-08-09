import {Component, HostListener, OnInit} from '@angular/core';
import {ExpenseService} from '../expense.service';
import {NguCarousel, NguCarouselConfig} from '@ngu/carousel';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {DialogFormComponent} from '../dialog-form/dialog-form.component';
import {Validators} from '@angular/forms';
import {Expense} from '../expenses-list/expenses-list.component';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'app-expenses-perweek',
  templateUrl: './expenses-per-week.component.html',
  styleUrls: ['./expenses-per-week.component.scss'],
  animations: [
    trigger('simple', [
      state('moveTo', style({
          'transform': 'translate3d({{pos}}px, 0, 0)',
        }),
        {params: {pos: 0}}
      ),
      transition('*=>*', [
        animate('1s ease'),
      ]),
    ])
  ]
})
export class ExpensesPerWeekComponent implements OnInit {

  expensesByWeek: any[];
  public weeksCarruselConfig: NguCarouselConfig;
  public expensesPerWeeksCarruselConfig: NguCarouselConfig;
  isOverlay = false;
  animateStuff = {};
  activePoint = 0;
  currentPos = 0;
  halfWidthPosition=0;

  constructor(private expenseService: ExpenseService, public dialog: MatDialog) {
  }
  @HostListener('window:resize')
  public onWindowResize(): void {
    const widthScreen = window.innerWidth;
    if (widthScreen < 900)
      this.currentPos = widthScreen / 2 - 120;
    else
      this.currentPos = (widthScreen - widthScreen * 0.25) / 2 - 100;
    this.animateStuff = {value: 'moveTo', params: {pos: this.currentPos}};
  }
  ngOnInit() {

    const widthScreen = window.innerWidth;
    if (widthScreen < 900)
      this.currentPos = widthScreen / 2 - 120;
    else
      this.currentPos = (widthScreen - widthScreen * 0.25) / 2 - 100;
    this.animateStuff = {value: 'moveTo', params: {pos: this.currentPos}};

    this.weeksCarruselConfig = {
      grid: {xs: 1, sm: 2, md: 3, lg: 4, all: 0},
      slide: 10,
      speed: 500,
      animation: 'lazy',
      point: {
        visible: true,
      },
      load: 3,
      easing: 'ease',
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
      touch: true,
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


  moveToPosition(pos: number) {
    if (pos > this.activePoint)
      this.currentPos = this.currentPos + (this.activePoint - pos) * 242;
    else
      this.currentPos = this.currentPos + (this.activePoint - pos) * 242;
    this.animateStuff = {value: 'moveTo', params: {pos: this.currentPos}};
    this.activePoint = pos;
  }

  getMovesPX(event) {
    console.log(event);
    const initialPos = event.screenX;
    // fromEvent(document,'mousemove').subscribe((e)=>{
    //   this.animateStuff = {value: 'moveTo', params: {pos: event.screenX - initialPos}};
    // })
  }

}
