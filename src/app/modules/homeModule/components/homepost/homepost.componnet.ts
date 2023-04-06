import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home-post',
  templateUrl: './homepost.component.html',
})
export class HomePostComponent {
  title = 'instagram';

  constructor(private db: AngularFirestore) {
    this.getItems();
  }

 async getItems() {
  await   this.db.collection("Post").get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id)
        this.db.collection("Post").doc(doc.id).collection("post").get().subscribe((subcollectionSnapshot) => {
          subcollectionSnapshot.forEach((subdoc) => {
            console.log(subdoc.id, " => ", subdoc.data());
          });
        });
      });
    });
  }
}
