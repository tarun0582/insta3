import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public afAuth: AngularFireAuth, private route: Router) { }
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result:any) => {
        if (result.user?.emailVerified !== true) {
          this.SendVerificationMail();
          window.alert(
            'Please validate your email address. Kindly check your inbox. and then login again'
          );
        }
        if (result.user?.emailVerified !== false) {
          return result;
      }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  signUp(email: any, password: any) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user?.emailVerified !== true) {
          this.SendVerificationMail();
          window.alert(
            'Please validate your email address. Kindly check your inbox. and then login again'
          );
         
        }   
        console.log(result) 
         return result;
        
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((user) => {
        console.log(user)
        return user?.sendEmailVerification();

      })
      .then(() => {
        ;
      });
  }
  resetPasswordInit(email: string) { 
    return this.afAuth.sendPasswordResetEmail(
      email, 
      { url: 'http://localhost:4200/main' }); 
    } 
    registerToken(value:string)
    {
        localStorage.setItem("token",value)
    }
    removeToken(){
      localStorage.clear();
    }
    getToken() {
      return localStorage.getItem('token');
    }  
    isLoggedIn() {
      return this.getToken() !== null;
    }
    logout() {
      localStorage.removeItem('token');
      localStorage.clear();
      this.route.navigate(['/main/login']);
    }
}
