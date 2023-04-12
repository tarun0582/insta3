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

  isLike:boolean=false;
  grandChildComment: any = [];
  level2Comment: any[] = [];
  postlike: number=0;
  postLike2: any=[];
  constructor(private db: AngularFirestore, private fb: FormBuilder, private store: StoreService) {
    this.getItems();
    console.log(this.allpostData)
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
  like(postId: any) {
   
    this.store.Getlike(postId).then((res: any) => {
      console.log(res)
      this.postLike2=res
    
      this.postlike = res.length
      console.log(this.postlike)
    })
  
  }
  postLike(postId: any) {
   
    this.store.checkUser(postId).then((res:any)=>{
      console.log(res)
      if(res.length>=1){
        this.postlike=this.postlike - 1
     
        this.store.deleteLike(postId);
      }
      else{
        this.store.addLike(postId)
        this.postlike=this.postlike + 1
      
      }
      
    }
    )
  }


}
