import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication-services/authentication.service';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',

})
export class ForgotComponent {
  forgotForm:FormGroup
  constructor(private fb:FormBuilder ,private authData :AuthenticationService,private routes:Router){
    this.forgotForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],
    })
  }
forgotUser() {
  if (this.forgotForm.valid) {
    console.log(this.forgotForm.value)
    this.authData.resetPasswordInit(this.forgotForm.value.email).then((res: any) => {
        console.log(res, "signupreponse")
    })
}
else {
    Object.keys(this.forgotForm.controls).forEach(key => this.forgotForm.controls[key].markAsTouched({ onlySelf: true }))
}
}
loginBtn() {
  this.routes.navigateByUrl("/main/signup")
}
  title = 'instagram';
}
