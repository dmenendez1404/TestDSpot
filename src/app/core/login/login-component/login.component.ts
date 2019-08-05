import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(public fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      'user': ['', Validators.compose([Validators.required])],
      'pass': ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {

  }
  login(){
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    }
  }

}
