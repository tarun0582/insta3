import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signup/signup.component';
import { ForgotComponent } from './components/forgort/forgot.component';

const routes: Routes = [

    {
        path: '',
        component: MainComponent,
        children: [
          {path: 'login', component:LoginComponent },
          {path: 'signup', component:SignUpComponent},
          {path: 'forgot',component:ForgotComponent},
          {path: '', redirectTo: '/main/login', pathMatch: 'full' },
        ],
      },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }