import {ModuleWithProviders, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './shared/auth-guard.service';


export const routes: Routes = [
  { path: '', loadChildren: './core/login/login.module#LoginModule' },
  {
    path: 'asd',
    component: HomeComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
   /* children: [
      {
        path: '',
        loadChildren: './erp/dashboard/dashboard.module#DashboardModule',
        data: {breadcrumb: 'Dashboard'}
      },
    ]*/
  }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: true,
});
