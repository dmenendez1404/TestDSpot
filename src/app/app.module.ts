import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {appRouting} from './app-routing';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './features/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import {ExpensesListComponent} from './features/expenses-list/expenses-list.component';
import {ExpensesPerWeekComponent} from './features/expenses-perweek/expenses-per-week.component';
import {ProfileComponent} from './features/profile/profile.component';
import {RouterModule} from '@angular/router';
import {DialogChangePasswordComponent} from './features/dialog-changePassword/dialog-change-password.component';
import {DialogFormComponent} from './features/dialog-form/dialog-form.component';
import {NguCarouselModule} from '@ngu/carousel';
import { ExpensePerWeekDetailsComponent } from './features/expense-per-week-details/expense-per-week-details.component';
import { WeeksPeriodsCaruselComponent } from './features/weeks-periods-carusel/weeks-periods-carusel.component';
import { WeeksDetailsCaruselComponent } from './features/weeks-details-carusel/weeks-details-carusel.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    ExpensesListComponent,
    ExpensesPerWeekComponent,
    ProfileComponent,
    DialogChangePasswordComponent,
    DialogFormComponent,
    ExpensePerWeekDetailsComponent,
    WeeksPeriodsCaruselComponent,
    WeeksDetailsCaruselComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    appRouting,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    NguCarouselModule,
  ],
  providers: [],
  entryComponents: [DialogChangePasswordComponent,
    DialogFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
