import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent {
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    const forms = {}
    data.items.forEach((item)=>{
      forms[item.name]= new FormControl(item.value)
    })
    this.formGroup = new FormGroup(forms)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
