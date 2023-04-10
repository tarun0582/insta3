import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { StoreService } from 'src/app/core/services/firestore-service/store.service';
import { parentId } from 'src/app/core/environment';
@Component({
  selector: 'app-home-post',
  templateUrl: './homepost.component.html',
  styleUrls: ['./homepost.component.scss']
})
export class HomePostComponent {
  parentId: string = parentId
  title = 'instagram';
  allPost = new Subject<any>();
  allpostData: any[] = [];
  commentForm: FormGroup;
  parentComment: any = [];
  childComment: any = [];
  level2Comment: any[] = [];
  constructor(private db: AngularFirestore, private fb: FormBuilder, private store: StoreService) {
    this.getItems();
    this.allPost.subscribe((res: any) => {
      const doc = res.payload.doc;
      this.allpostData.push({ postId: doc.id, ...doc.data() });
    });
    this.commentForm = this.fb.group({
      msg: ['']
    })
  }
  async getItems() {
    await this.db.collection('Post').snapshotChanges().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.allPost.next(doc);
      });
    });
  }
  viewComments(id: any, postData: any) {
    if (id == 0) {
      this.store.getComment(postData, parentId).then((res: any) => {
        this.parentComment = res;
        console.log(this.parentComment)

      })
    }
    else {
      this.store.getComment(postData, postData.id).then((res: any) => {
       this.childComment=res;
      })
    
    }
  }

  commentOnPost(id: any, postData: any) {
    if (id == 0) {
      this.store.addComment(this.commentForm.value, postData, parentId)
    }
    else {
      this.store.addComment(this.commentForm.value, postData, postData.id)
    }
    this.commentForm.reset()
  }



}
