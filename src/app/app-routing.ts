import {ModuleWithProviders, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {AuthGuard} from './shared/auth-guard.service';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import {ExpensesListComponent} from './features/expenses-list/expenses-list.component';
import {ExpensesPerWeekComponent} from './features/expenses-perweek/expenses-per-week.component';


export const routes: Routes = [
  { path: 'login', loadChildren: './core/login/login.module#LoginModule' },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'expensesList',
        component: ExpensesListComponent,
      },{
        path: 'expensesPerWeek',
        component: ExpensesPerWeekComponent,
      },{
        path: 'profile',
        component: HomeComponent,
      },
    ]
  }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: true,
});
