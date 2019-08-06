import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../core/login/auth.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {filter, tap} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  menu = [
    {name: 'Dashboard', active: false, url: '/dashboard'},
    {name: 'Expenses List', active: false, url: '/expensesList'},
    {name: 'Expenses per Week', active: false, url: '/expensesPerWeek'},
    {name: 'Profile', active: false, url: '/profile'},
  ];
  authSubscription: Subscription;
  memberActive: any;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authSubscription = this.authService.getMemberActive().subscribe((user) => {
      this.memberActive = user;
    });
    this.updateActiveUrl(this.router.url);
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart),
        tap((params: any) => {
          this.updateActiveUrl(params.url);
        })
      )
      .subscribe();
  }

  updateActiveUrl(url) {
    this.menu.map(item => {
      if (item.url === url)
        item.active = true;
      else
        item.active = false;
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
