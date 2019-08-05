import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../core/login/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  menu = [
    {name: 'Dashboard', active: true, url: '/dashboard'},
    {name: 'Expenses List', active: false, url: '/expensesList'},
    {name: 'Expenses per Week', active: false, url: '/expensesPerWeek'},
    {name: 'Profile', active: false, url: '/profile'},
  ];
  authSubscription: Subscription;
  memberActive: any;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authSubscription = this.authService.getMemberActive().subscribe((user)=>{
      this.memberActive = user;
    });
  }

  logout() {
    this.authService.logout();
  }

  goTo(row) {
    this.menu.map(item => {
      if (item.name == row.name)
        item.active = true;
      else
        item.active = false;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe()
  }
}
