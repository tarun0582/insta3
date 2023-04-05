import { Component } from '@angular/core';
import { StoreService } from 'src/app/core/services/firestore-service/store.service';

@Component({
  selector: 'app-insta-post',
  templateUrl: './instapost.component.html',
})
export class InstaPostComponent {
  constructor(private imageUploadService :StoreService){

  }
  onFileSelected(event: any) {
    const image = event.target.files[0];
    this.imageUploadService
      .uploadImage(image)
      .then((url) => {
        console.log(url);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
