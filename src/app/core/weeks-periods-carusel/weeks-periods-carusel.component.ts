import {Component, HostListener, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-weeks-periods-carusel',
  templateUrl: './weeks-periods-carusel.component.html',
  styleUrls: ['./weeks-periods-carusel.component.scss'],
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
export class WeeksPeriodsCaruselComponent implements OnInit {
  @Input() expensesByWeek: any[];
  animateStuff = {};
  activePoint = 0;
  currentPos = 0;

  constructor() {
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
