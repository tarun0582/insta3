import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/gurds/auth.guard';
const routes: Routes = [
  {path: '', redirectTo: '/main/login', pathMatch: 'full' },
  {
    path:'main',
    loadChildren :() =>
    import('./modules/authmodule/auth.module').then((res)=>res.AuthModule),
  },
{
  path:'home',

  canActivate:[AuthGuard],
  loadChildren:()=>
  import('./modules/homeModule/home.module').then((res)=>res.HomeModule)
},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
