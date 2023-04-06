import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication-services/authentication.service';
import { StoreService } from 'src/app/core/services/firestore-service/store.service';

@Component({
  selector: 'app-insta-post',
  templateUrl: './instapost.component.html',
})
export class InstaPostComponent  {
  imageurl:string=''
  postMessage: FormGroup
  constructor( private fb: FormBuilder ,private store:StoreService,private authData:AuthenticationService){
    this.postMessage = this.fb.group({
      postImage: [''],
      postDescription:['']
    })


  }
 async onFileSelected(event: any) {
const image = event.target.files[0];
  await  this.store
      .uploadImage(image)
      .then((url) => {
        this.postMessage=this.fb.group({
          postImage:[url],
          postDescription:[this.postMessage.value.postDescription]
        })
  })
      .catch((error) => {
        console.error(error);
      });
  }
  post(){
    const t =this.authData.getToken();
    this.store.addPost(this.postMessage.value,t);
    console.log(this.postMessage.value)
  }
}
