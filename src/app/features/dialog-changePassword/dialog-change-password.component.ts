import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-change-password.component.html',
  styleUrls: ['./dialog-change-password.component.scss']
})
export class DialogChangePasswordComponent {
  changePassForm: FormGroup;
  canContinue = false;

  constructor(
    public dialogRef: MatDialogRef<DialogChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder) {
    this.changePassForm = this.fb.group({
      newPass: new FormControl('', Validators.compose([Validators.required])),
      confirmPass: new FormControl('', Validators.compose([Validators.required])),
    });
    this.changePassForm.valueChanges.subscribe(() => {
      if (this.changePassForm.controls.newPass.value === this.changePassForm.controls.confirmPass.value) {
        this.data.newPassword = this.changePassForm.controls.newPass.value;
        this.canContinue = true;
      }
      else this.canContinue = false;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
