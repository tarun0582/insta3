import { Injectable, OnInit } from '@angular/core';
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
  addreals(value: any, email: string | null, userId: string | null) {
    throw new Error('Method not implemented.');
  }

  constructor(private storage: AngularFireStorage ,private ngxService :NgxUiLoaderService) { }

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

}
