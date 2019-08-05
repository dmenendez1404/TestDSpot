import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/login/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  authSubscription: Subscription;

  constructor(public fb: FormBuilder, private authService: AuthService) {
    this.userForm = this.fb.group({
      'user': new FormControl('', Validators.compose([Validators.required])),
      'email': new FormControl('', Validators.compose([Validators.required, Validators.email])),
      'pass': new FormControl('', Validators.compose([Validators.required])),
    });
  }

  ngOnInit(): void {
    console.log(this.authService.getMemberActive());
    this.authSubscription = this.authService.getMemberActive().subscribe((user) => {
      this.userForm.setValue(user);
    });

  }

  onSubmit(){
    if(this.userForm.valid)
      this.authService.updateUser(this.userForm.value)
  }

  changePass(){
    if(this.userForm.controls.pass.valid)
      this.authService.changePass(this.userForm.value.pass)
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe()
  }


}
