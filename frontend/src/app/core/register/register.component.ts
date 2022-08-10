import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from './custom.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  maritalStatus = ["single", "married", "divorced"]

  constructor( private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['', [Validators.required,Validators.minLength(6), Validators.email ]],
      telephoneNumber:['',[Validators.required]],
      password: ['',[Validators.required]],
      passwordConfirm: ['',[Validators.required]],
      age: ['',[Validators.required]],
      adress: ['',[Validators.required]],
      maritalStatus: [this.maritalStatus[0],[]],
      profession: ['',[Validators.required]],
      identificationNumber: ['',[Validators.required]],


    },{
      validator: ConfirmedValidator('password', 'passwordConfirm')


    }
    );



  }
  ngOnInit(): void {}

  isMobile(){
    return(
        (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i)) ||
        (navigator.userAgent.match(/BlackBerry/i))
        );}


  onSubmit() {
        const username = this.form.value.username;
        const password = this.form.value.password;
        const role = "reader";
        const country = this.form.value.country;
        const city = this.form.value.city;
        const userData = {
          username:username,
          password:password,
          role: role,
          country: country,
          city: city
          }

        }
}


