import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotComponent } from './components/forgort/forgot.component';
import { SignUpComponent } from './components/signup/signup.component';
import { MainComponent } from './components/main/main.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { environment } from 'src/app/core/environment';
import { AngularFireModule } from '@angular/fire/compat';

import { HttpClientModule } from '@angular/common/http';
import { FirestoreModule } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AuthenticationService } from 'src/app/core/services/authentication-services/authentication.service';
import { StoreService } from 'src/app/core/services/firestore-service/store.service';

@NgModule({
  declarations: [LoginComponent,ForgotComponent,SignUpComponent,MainComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    FirestoreModule,
    AngularFireModule,
    AngularFirestoreModule
  ],
  providers: [AuthenticationService],
  exports:[
   
  ]
  
})
export class AuthModule { }