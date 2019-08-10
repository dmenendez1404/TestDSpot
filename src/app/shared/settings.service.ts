import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  sidenavIsOpened = new BehaviorSubject(true)
  constructor() { }
  getSideNavState(){
    return this.sidenavIsOpened
  }
  setSideNaveState(newState: boolean){
    this.sidenavIsOpened.next(newState)
  }
}
