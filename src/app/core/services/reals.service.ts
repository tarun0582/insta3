import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class RealsService  {

  videoUpload:any= new Subject();
  setPerc(data:any){
  this.videoUpload.next(data)
  }

  getPerc(){
   return this.videoUpload.asObservable();
  }


  constructor(private storage: AngularFireStorage ,private ngxService :NgxUiLoaderService,private store: AngularFirestore) { }

  uploadReals(video: File): Promise<string> {
    this.ngxService.start();
    const filePath = `reals/${Date.now()}_${video.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, video);
    task.percentageChanges().subscribe((res:any)=>{
      this.setPerc(res)
    })
    return new Promise((resolve, reject) => {
      task
        .snapshotChanges()
        .toPromise()
        .then((res: any) => {
   
          fileRef.getDownloadURL().subscribe((url) => {
            this.ngxService.stop();
            resolve(url);
            console.log(url)
          });
        })
        .catch((error) => reject(error));
    });
  }
  addreals(data: any, email: string | null, userId: string | null) {
    const reels= {
      reelsUrl:data.reals,
      email:email,
      userId:userId,
    };
    this.store.collection(`reels`).add(reels)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });

  }
report(){
  return new Promise((resolve, reject) => {
    this.store.collection('post', ref => ref.where('report', '==', true))
      .snapshotChanges()
      .subscribe((data) => {
        const comments = data.map((comment) => {
          const id = comment.payload.doc.id;
          const data = comment.payload.doc.data();
          return { id, ...data };
        });
        resolve(comments);
      }, (error) => {
        reject(error);
        console.log(error)
      });
  });


}

}
