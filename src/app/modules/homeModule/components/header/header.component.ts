import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { sidenavLink } from 'src/app/core/environment';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  navBar:any=sidenavLink
  constructor(private authData:AuthenticationService ,private route:Router){
  }
logout() {
  this.authData.logout();
  this.route.navigateByUrl("/main/update")
}
  title = 'instagram';
}
