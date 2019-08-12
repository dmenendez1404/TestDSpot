import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../core/login/auth.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {filter, tap} from 'rxjs/operators';
import {DialogFormComponent} from '../dialog-form/dialog-form.component';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {Expense} from '../expenses-list/expenses-list.component';
import {ExpenseService} from '../expense.service';
import {SettingsService} from '../../shared/settings.service';

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
  sidenavIsOpened = true;
  sidenavIsPinned = true;
  isOverlay = false;

  constructor(private authService: AuthService,
              private router: Router,
              public dialog: MatDialog,
              private expenseService: ExpenseService,
              private settingsService: SettingsService) {
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    if (window.innerWidth <= 900) {
      this.settingsService.setSideNaveState(false);
      this.sidenavIsOpened = false;
      this.sidenavIsPinned = false;
    } else {
      this.settingsService.setSideNaveState(true);
      this.sidenavIsOpened = true;
      this.sidenavIsPinned = true;
    }
  }

  ngOnInit() {
    if (window.innerWidth <= 900) {
      this.settingsService.setSideNaveState(false);
      this.sidenavIsOpened = false;
      this.sidenavIsPinned = false;
    }
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

  newExpense() {
    this.isOverlay = true;
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '800px',
      data: {
        tittle: 'Edit Expense',
        buttonText: 'Ok',
        items: [
          {name: 'name', value: '', type: 'text'},
          {name: 'value', value: '', type: 'number', prefix: 'attach_money'}
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isOverlay = false;
      if (!!result) {
        this.expenseService.createExpense(result);
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  toggleSideNav(sideNav) {
    sideNav.toggle();
    this.sidenavIsOpened = !this.sidenavIsOpened;
    this.settingsService.setSideNaveState(this.sidenavIsOpened);
  }
}
