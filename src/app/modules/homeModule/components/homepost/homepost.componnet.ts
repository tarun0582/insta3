import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { StoreService } from 'src/app/core/services/firestore-service/store.service';
import { parentId } from 'src/app/core/environment';
import { AuthenticationService } from 'src/app/core/services/authentication-services/authentication.service';
@Component({
  selector: 'app-home-post',
  templateUrl: './homepost.component.html',
  styleUrls: ['./homepost.component.scss']
})
export class HomePostComponent {
report(id: string) {
  console.log(id)
  this.store.reportPost(id,true)
}

  parentId: string = parentId
  title = 'instagram';

  allpostData: any[] = [];
  commentForm: FormGroup;
  parentComment: any = [];
  childComment: any = [];

  isLike:boolean=false;
  grandChildComment: any = [];
  level2Comment: any[] = [];
  postlike: number=0;
  postLike2: any=[];
  constructor(private db: AngularFirestore, private fb: FormBuilder, private store: StoreService,private authData:AuthenticationService) {
    this.getItems();
    this.commentForm = this.fb.group({
      msg: ['']
    })
  }
  async getItems() {
   this.store.getPost(false).then((res:any)=>{
   this.allpostData=res
   })
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
    this.store.Getlike(postId,'postLike').then((res: any) => {
      console.log(res)
      this.postLike2=res
    
      this.postlike = res.length
      console.log(this.postlike)
    })
  
  }
  postLike(postId: any) {
   
    this.store.checkUser(postId,'postLike').then((res:any)=>{
      console.log(res)
      if(res.length>=1){
        this.postlike=this.postlike - 1
        this.store.deleteLike(postId,'postLike');
      }
      else{
        this.store.addLike(postId,'postLike')
        this.postlike=this.postlike + 1
      
      }
      
    }
    )
  }


}
