import { Component, OnInit } from '@angular/core';
import { RealsService } from './core/services/reals.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  text: any;
  videoPercentage:string=''
constructor(private reelServie:RealsService,private decimalPipe: DecimalPipe){
this.reelServie.getPerc().subscribe((res:any)=>{
  this.videoPercentage=this.decimalPipe.transform(res, '1.1-2') + '%';
  if(res==100){
    this.videoPercentage=' ';
  }
})
}
  title = 'instagram';
  hello:string='';

}
