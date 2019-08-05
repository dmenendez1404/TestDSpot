import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { appRouting } from './app-routing';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './features/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ExpensesListComponent } from './features/expenses-list/expenses-list.component';
import { ExpensesPerWeekComponent } from './features/expenses-perweek/expenses-per-week.component';
import {ProfileComponent} from './features/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    ExpensesListComponent,
    ExpensesPerWeekComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    appRouting,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
