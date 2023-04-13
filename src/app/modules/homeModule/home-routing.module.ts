import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InstaPostComponent } from './components/instapost/instapost.component';
import { HomePostComponent } from './components/homepost/homepost.componnet';
import { CreateRealsComponent } from './components/create-reals/createReals.component';
import { ViewRealsComponent } from './components/view-reals/viewReals.component';
import { ReportComponent } from './components/view-reported-post/report.component';
const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
          { path: 'home', component: HomeComponent },
          {path:'instapost',component:InstaPostComponent},
          {path:"homepost",component:HomePostComponent},
          {path:'viewreels',component:ViewRealsComponent},
          {path:"createreals",component:CreateRealsComponent},
          {path:'report',component:ReportComponent},
          {path: '', redirectTo: '/home/instapost', pathMatch: 'full'},
        ],
      },
    ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
