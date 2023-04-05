import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { InstaPostComponent } from './components/instapost/instapost.component';


const routes: Routes = [
   
    {
        path: '',
        component: HomeComponent,
        children: [
          { path: 'home', component: HomeComponent },
          { path: 'about', component: AboutComponent },
          {path:'instapost',component:InstaPostComponent},
          {path: '', redirectTo: '/home/instapost', pathMatch: 'full'},
        ],
      },
    ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
