import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {skip} from 'rxjs/operators';
import {SettingsService} from '../../shared/settings.service';
import {fromEvent} from 'rxjs';

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
      transition('*=>*',
        animate('1s ease-in')
      ),
    ])
  ]
})
export class WeeksPeriodsCaruselComponent implements OnInit {
  @Input() expensesByWeek: any[];
  @Output() moveTo: EventEmitter<any> = new EventEmitter<any>();
  animateStuff = {};
  activePoint = 0;
  currentPos = 0;

  constructor(private settingsService: SettingsService) {
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    const widthScreen = window.innerWidth;
    if (widthScreen < 900)
      this.currentPos = widthScreen / 2 - 120;
    else
      this.currentPos = (widthScreen - widthScreen * 0.25) / 2 - 100;
    const pos = this.activePoint;
    this.activePoint = 0;
    this.moveToPosition(pos);
  }

  ngOnInit() {
    const widthScreen = window.innerWidth;
    if (widthScreen < 900)
      this.currentPos = widthScreen / 2 - 120;
    else
      this.currentPos = (widthScreen - (widthScreen * 0.25)) / 2 - 100;
    this.animateStuff = {value: 'moveTo', params: {pos: this.currentPos}};

    this.settingsService.getSideNavState().pipe(skip(1))
      .subscribe(value => {
        if (value) {
          this.currentPos = (widthScreen - (widthScreen * 0.25)) / 2 - 100;
        }
        else {
          this.currentPos = widthScreen / 2 - 120;
        }
        const pos = this.activePoint;
        this.activePoint = 0;
        this.moveToPosition(pos);
      });
  }

  moveToPosition(pos: number) {
    if (pos > this.activePoint)
      this.currentPos = this.currentPos + (this.activePoint - pos) * (242);
    else
      this.currentPos = this.currentPos + (this.activePoint - pos) * (242);
    this.animateStuff = {value: 'moveTo', params: {pos: this.currentPos}};
    this.activePoint = pos;
    this.moveTo.emit(pos);
  }

  getMovesPX(event) {
    // console.log(event);
    // const initialPos = event.screenX;
    //  fromEvent(document,'mousemove').subscribe((e)=>{
    //    this.currentPos = this.currentPos + (initialPos - e['screenX'])
    //    this.animateStuff = {value: 'moveTo', params: {pos: this.currentPos}};
    //  })
  }
}
