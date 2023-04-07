import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home-post',
  templateUrl: './homepost.component.html',
  styleUrls: ['./homepost.component.scss']
})
export class HomePostComponent {
  title = 'instagram';
allPost = new Subject
allpostData:any=[];
  constructor(private db: AngularFirestore) {
    this.getItems();
    this.allPost.subscribe((res:any)=>this.allpostData.push(res))
    console.log(this.allpostData)
  }
 async getItems() {
  await   this.db.collection("Post").get().subscribe((querySnapshot) => {
    console.log(querySnapshot)
      querySnapshot.forEach((doc) => {
        this.allpostData.push(doc.data())
      });
    });
  }
}
