import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import { RegisterUser } from 'src/app/shared/models/registerUser.interface';
import { CustomValidators } from './custom.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  maritalStatus = ['single', 'married', 'divorced'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
    private dialog: MatDialog
  ) {
    this.form = new FormGroup(
      {
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.email,
        ]),
        telephoneNumber: new FormControl(
          '',
          [Validators.required],
        ),
        password: new FormControl('', [Validators.required,Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required]),
        age: new FormControl('', [Validators.required]),
        adress: new FormControl('', [Validators.required]),
        maritalStatus: new FormControl(this.maritalStatus[0], []),
        profession: new FormControl('', [Validators.required]),
        identificationNumber: new FormControl('', [Validators.required]),
      },

      [CustomValidators.MatchValidator('password', 'confirmPassword')]
      );
  }
  ngOnInit(): void {}


  onSubmit() {
    const userData: RegisterUser = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      telephoneNumber: "+39"+this.form.value.telephoneNumber,
      password: this.form.value.password,
      age: parseInt(this.form.value.age),
      adress: this.form.value.adress,
      maritalStatus: this.form.value.maritalStatus,
      profession: this.form.value.profession,
      identificationNumber: this.form.value.identificationNumber,
    };
    console.log(userData)
    this.registerService.register(userData).subscribe({
      next: (v) => console.log(v),
      error: (e) => alert(e.error.message),
      complete: () => this.dialog.open(SuccessfullyModal),
    });
  }

  get passwordMatchError() {
    return (
      this.form.getError('mismatch') &&
      this.form.get('confirmPassword')?.touched
    );
  }
}

@Component({
  selector: 'successfully-modal-html',
  templateUrl: 'successfully.modal.html',
})
export class SuccessfullyModal {
  constructor(    private dialog: MatDialog
    ){}
  close(){
    this.dialog.closeAll()
  }
}
