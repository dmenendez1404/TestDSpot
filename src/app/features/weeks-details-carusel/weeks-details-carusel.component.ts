import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SettingsService} from '../../shared/settings.service';
import {skip, takeUntil} from 'rxjs/operators';
import {combineLatest, fromEvent} from 'rxjs';
import {until} from 'selenium-webdriver';

@Component({
  selector: 'app-weeks-details-carusel',
  templateUrl: './weeks-details-carusel.component.html',
  styleUrls: ['./weeks-details-carusel.component.scss'],
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
export class WeeksDetailsCaruselComponent implements OnInit {
  @Input() expensesByWeek: any[];
  @Input() activePoint = 0;
  @Output() moveTo: EventEmitter<any> = new EventEmitter<any>();
  animateStuff = {};
  currentPos = 0;
  widthCard = 0;

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit() {
    const widthScreen = window.innerWidth;
    if (widthScreen < 900) {
      this.widthCard = widthScreen * 0.55;
      this.currentPos = widthScreen / 2 - this.widthCard/2;
    }
    else {
      this.widthCard = (widthScreen - (widthScreen * 0.25)) * 0.55;
      this.currentPos = (widthScreen - (widthScreen * 0.25)) / 2 - this.widthCard/2;
    }
    this.animateStuff = {value: 'moveTo', params: {pos: this.currentPos}};

    this.settingsService.getSideNavState().pipe(skip(1))
      .subscribe(value => {
        if (value) {
          this.widthCard = (widthScreen - (widthScreen * 0.25)) * 0.55;
          this.currentPos = (widthScreen - (widthScreen * 0.25)) / 2 - this.widthCard/2;
        }
        else {
          this.widthCard = widthScreen * 0.55;
          this.currentPos = widthScreen / 2 - this.widthCard/2;
        }
        console.log(this.widthCard)
        const pos = this.activePoint;
        this.activePoint = 0;
        this.moveToPosition(pos);
      });
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    const widthScreen = window.innerWidth;
    if (widthScreen < 900) {

      this.currentPos = widthScreen / 2 - this.widthCard/2;
    }
    else {
      this.currentPos = (widthScreen - widthScreen * 0.25) / 2 - this.widthCard/2;
    }
    const pos = this.activePoint;
    this.activePoint = 0;
    this.moveToPosition(pos);
  }

  moveToPosition(pos: number) {
    if (pos > this.activePoint)
      this.currentPos = this.currentPos + (this.activePoint - pos) * (this.widthCard+48);
    else
      this.currentPos = this.currentPos + (this.activePoint - pos) * (this.widthCard+48);
    this.animateStuff = {value: 'moveTo', params: {pos: this.currentPos}};
    this.activePoint = pos;
    this.moveTo.emit(pos);


  }

  getMovesPX(event) {
    //  console.log(event);
    //  const initialPos = event.screenX;
    // fromEvent(document,'mousemove')
    //    .subscribe((e1)=>{
    //      this.currentPos = this.currentPos + e1['screenX'] - initialPos
    //      console.log(this.currentPos)
    //     this.animateStuff = {value: 'moveTo', params: {pos: this.currentPos}};
    //   })
  }

}
