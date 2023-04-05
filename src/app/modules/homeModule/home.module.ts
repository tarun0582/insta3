import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { InstaPostComponent } from './components/instapost/instapost.component';
import { HeaderComponent } from './components/header/header.component';
import { environment } from 'src/app/core/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';


@NgModule({
  declarations: [HomeComponent,AboutComponent,InstaPostComponent,HeaderComponent],
  imports: [
  CommonModule,
  ReactiveFormsModule,
   HomeRoutingModule,
   AngularFireModule.initializeApp(environment.firebaseConfig),
   AngularFireStorageModule, 
  ],
  exports:[
   
  ]
  
})
export class HomeModule { }
