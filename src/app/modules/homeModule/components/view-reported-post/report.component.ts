import { Component } from '@angular/core';
import { StoreService } from 'src/app/core/services/firestore-service/store.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
unreport(id: any) {
    this.store.reportPost(id,false)
}
  title = 'instagram';
  allpostData: any[] = [];
  constructor(private store :StoreService){
 this.getRepotedPost()
  }
  getRepotedPost(){
    this.store.getPost(true).then((res:any)=>{
        this.allpostData=res
    })

  }

}
