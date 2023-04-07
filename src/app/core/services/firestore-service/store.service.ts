import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User,post } from '../../interface';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private store: AngularFirestore,private storage: AngularFireStorage) { }
  addUser(data:any,id:string): Promise<AngularFirestoreDocument<User>> {
    const customId = data.email;
    const user: User = { name:data.fullName,userName:data.userName,email:data.email,userId:id };
    const userDoc: AngularFirestoreDocument<User> = this.store.doc(`usersData/${customId}`);
    return userDoc.set(user)
      .then(() => {
        console.log("Document written with ID: ", customId);
        return userDoc.get()
      })
      .then((doc) => {
        console.log("Document data:", doc);
        return userDoc;
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        throw error;
      });
  }
  addPost(postData: any,email:any, id: any) {
    const post: post = { imageUrl:postData.postImage,
      like:0,
      comments:'',
      description:postData.postDescription,
      userId:id,
      email:email,    
    };
    this.store.collection(`Post`).add(post)
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
  }
  uploadImage(image: File): Promise<string> {
    const filePath = `post/${Date.now()}_${image.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, image);
    return new Promise((resolve, reject) => {
      task
        .snapshotChanges()
        .toPromise()
        .then((res:any) => {
          console.log(res)
          fileRef.getDownloadURL().subscribe((url) => {
            resolve(url);
          });
        })
        .catch((error) => reject(error));
    });
  }
  addComment(){
    
  }
}
