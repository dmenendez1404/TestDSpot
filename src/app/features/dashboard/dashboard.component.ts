import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/login/auth.service';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';
import {DialogChangePasswordComponent} from '../dialog-changePassword/dialog-change-password.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  authSubscription: Subscription;

  constructor(public fb: FormBuilder, private authService: AuthService, public dialog: MatDialog) {
    this.userForm = this.fb.group({
      'user': new FormControl('', Validators.compose([Validators.required])),
      'email': new FormControl('', Validators.compose([Validators.required, Validators.email])),
      'pass': new FormControl(''),
    });
  }

  ngOnInit(): void {
    console.log(this.authService.getMemberActive());
    this.authSubscription = this.authService.getMemberActive().subscribe((user) => {
      this.userForm.setValue(user);
    });

  }

  onSubmit() {
    if (this.userForm.valid)
      this.authService.updateUser(this.userForm.value);
  }

  changePass() {
    const dialogRef = this.dialog.open(DialogChangePasswordComponent, {
      width: '800px',
      data: {newPassword: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result && result !== '') {
        this.authService.changePass(result);
        this.userForm.controls.pass.setValue(result);
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }


}
