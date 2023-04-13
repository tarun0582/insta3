import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { StoreService } from 'src/app/core/services/firestore-service/store.service';
import {validator} from 'src/app/core/environment'
import { AuthenticationService } from 'src/app/core/services/authentication-services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignUpComponent {
  userData: any
  signupForm: FormGroup
  formValidator:any=validator
  constructor(private fb: FormBuilder, public authData: AuthenticationService, private routes: Router,private http:HttpClient,private store: StoreService) {
    this.signupForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.formValidator.email)])],
      userName: ['', Validators.compose([Validators.required])],
      fullName: ['', Validators.compose([Validators.required,Validators.pattern(this.formValidator.text)])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(this.formValidator.password)])]
    })
  }
 async signupUser() {
    if(this.signupForm.valid){
       await this.authData.signUp(this.signupForm.value.email, this.signupForm.value.password).then((res:any)=>{
        console.log(res?.user?.multiFactor?.user?.uid)
        if(res.operationType=='signIn'){
            this.store.addUser(this.signupForm.value,res?.user?.multiFactor?.user?.uid)
        }
       })  
    }
    else{
        Object.keys(this.signupForm.controls).forEach(key => this.signupForm.controls[key].markAsTouched({ onlySelf: true }))
    }
  }
  loginBtn() {
    this.routes.navigateByUrl("/main/login")

}
}