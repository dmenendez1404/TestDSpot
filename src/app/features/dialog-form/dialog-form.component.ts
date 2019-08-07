import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DATE_FORMATS, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


const DSPOT_MODE_FORMATS = {
  parse: {
    dateInput: 'DD/DD/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    /* monthYearLabel: 'MMMM YYYY', */
    dateA11yLabel: 'DD/MM/YYYY',
    /* monthYearA11yLabel: 'MMMM YYYY', */
  },
};

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: DSPOT_MODE_FORMATS}
  ]
})
export class DialogFormComponent {
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    const forms = {};
    data.items.forEach((item) => {
      if (!!item.validators) {
        forms[item.name] = new FormControl(item.value, item.validators);
      } else {
        forms[item.name] = new FormControl(item.value);
      }
    });
    this.formGroup = new FormGroup(forms);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
