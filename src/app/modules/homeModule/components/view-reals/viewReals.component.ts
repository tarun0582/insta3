import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { StoreService } from 'src/app/core/services/firestore-service/store.service';
import { parentId } from 'src/app/core/environment';
import { clearGlobalAppDefaultCred } from 'firebase-admin/lib/app/credential-factory';
@Component({
  selector: 'app-view-reals',
  templateUrl: './viewReals.component.html',
})
export class ViewRealsComponent {
  grandChildComment: any = [];
  level2Comment: any[] = [];
  commentForm: FormGroup;
  parentComment: any = [];
  childComment: any = [];
  data: any;
  postlike: number = 0;
  postLike2: any = [];
  title = 'instagram';
  allReels = new Subject<any>();
  allReelsData: any[] = [];
  constructor(private fb: FormBuilder,private db: AngularFirestore, private store: StoreService) {
    this.getItems();
    console.log(this.allReelsData, "hello")
    this.allReels.subscribe((res: any) => {
      const doc = res.payload.doc;
      this.allReelsData.push({ postId: doc.id, ...doc.data() });
    });
    this.commentForm = this.fb.group({
      msg: ['']
    })
  }
  async getItems() {
    await this.db.collection('reels').snapshotChanges().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.allReels.next(doc);
      });
    });
  }
  like(postId: any) {
    this.store.Getlike(postId, 'reelsLike').then((res: any) => {
      console.log(res)
      this.postLike2 = res
      this.postlike = res.length
      console.log(this.postlike)
    })
  }
  postLike(postId: any) {
    this.store.checkUser(postId, 'reelsLike').then((res: any) => {
      console.log(res)
      if (res.length >= 1) {
        this.like(postId);
        this.postlike = this.postlike - 1
        this.store.deleteLike(postId, 'reelsLike');
      }
      else {
        this.like(postId);
        this.store.addLike(postId, 'reelsLike')
        this.postlike = this.postlike + 1
      }
    }
    )
  }
  viewComments(id: any, postData: any) {
    console.log(id)
    if (id == 0) {
      this.store.getComment(postData, parentId).then((res: any) => {
        this.parentComment = res;
        console.log(this.parentComment)

      })
    }
    if (id == 1) {
      this.store.getComment(postData, postData.id).then((res: any) => {
        this.childComment = res;
        console.log(res)
      })

    }
    if (id == 2) {
      this.store.getComment(postData, postData.id).then((res: any) => {
        this.grandChildComment = res
        console.log(res)

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
