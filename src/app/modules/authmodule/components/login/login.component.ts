import { Component, NgZone } from '@angular/core';

import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { validator } from 'src/app/core/environment';
import { AuthenticationService } from 'src/app/core/services/authentication-services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})

export class LoginComponent {
  formValidator:any=validator
  userData: any
  loginForm: FormGroup
  constructor(private fb: FormBuilder, public authData: AuthenticationService, private routes: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.formValidator.email)])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(this.formValidator.password)])]
    })

  }
  loginUser() {
    if (this.loginForm.valid) {
      this.authData.SignIn(this.loginForm.value.email, this.loginForm.value.password).then((res: any) => {

        if (res?.user?.emailVerified == true) {
          this.authData.registerToken('userId',res?.user?.multiFactor?.user?.uid);
          this.authData.registerToken('token',res?.user?.multiFactor?.user?.accessToken);
          this.authData.registerToken('email',this.loginForm.value.email);
          this.routes.navigateByUrl("home/instapost")
      }
      })
    }
    else {
      Object.keys(this.loginForm.controls).forEach(key => this.loginForm.controls[key].markAsTouched({ onlySelf: true }))
    }
  }
  signupBtn() {
    this.routes.navigateByUrl("/main/signup")
  }
  forgotBtn() {
    this.routes.navigateByUrl("/main/forgot")
  }
}