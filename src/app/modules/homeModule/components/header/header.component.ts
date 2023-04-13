import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { sidenavLink } from 'src/app/core/environment';
import { AuthenticationService } from 'src/app/core/services/authentication-services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
ViewReels() {
  this.route.navigateByUrl("/home/viewreels")
}
CreateReals() {
  this.route.navigateByUrl("/home/createreals")
}
Home() {
  this.route.navigateByUrl("/home/homepost")

}
  navBar:any=sidenavLink
  constructor(private authData:AuthenticationService ,private route:Router){
  }
logOut() {
  this.authData.logout();
  this.route.navigateByUrl("/main/login")
}
  title = 'instagram';
}
