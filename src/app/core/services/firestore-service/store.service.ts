import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User, post } from '../../interface';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthenticationService } from '../authentication-services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
 
 email:string='';
 constructor(private store: AngularFirestore, private storage: AngularFireStorage ,private authData:AuthenticationService) { 
  this.email+=this.authData.getToken('email')
  console.log(this.email)
 }
  addUser(data: any, id: string): Promise<AngularFirestoreDocument<User>> {
    const customId = data.email;
    const user: User = { name: data.fullName, userName: data.userName, email: data.email, userId: id };
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
  uploadImage(image: File): Promise<string> {
    const filePath = `post/${Date.now()}_${image.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, image);
    return new Promise((resolve, reject) => {
      task
        .snapshotChanges()
        .toPromise()
        .then((res: any) => {
          console.log(res)
          fileRef.getDownloadURL().subscribe((url) => {
            resolve(url);
          });
        })
        .catch((error) => reject(error));
    });
  }
  addPost(postData: any, email: any, id: any) {
    const post: post = {
      imageUrl: postData.postImage,
      like: 0,
      comments: '',
      description: postData.postDescription,
      userId: id,
      email: email,
    };
    this.store.collection(`Post`).add(post)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
  addComment(commentData: any, postData: any, parentId: string) {
    const comment = {
      content: commentData.msg,
      postId: postData.postId,
      userId: postData.userId,
      parentId: parentId,
    }
    this.store.collection(`comment`).add(comment).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
  getComment(postData: any, parentId: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.store.collection('comment', ref => ref.where('postId', '==', postData.postId).where('parentId', '==', parentId))
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
  Getlike(postId:any) {
    return new Promise((resolve, reject) => {
      this.store.collection('like', ref => ref.where('postId', '==', postId))
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
  checkUser(postId: any) {


    
    return new Promise((resolve, reject) => {
      this.store.collection('like', ref => ref.where('email', '==', this.email).where('postId','==',postId))
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
  addLike(postId: any) {
    const like = {
      postId:postId,
      email:this.email
    }
    this.store.collection('like').add(like).then((docRef) => {
      console.log("Document written with ID: ", docRef.id,"hello");
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
  deleteLike(postId: any) {
    const email = this.authData.getToken('email')
    return new Promise((resolve, reject) => {
      this.store.collection('like', ref => ref.where('email', '==', email).where('postId', '==', postId))
        .snapshotChanges()
        .subscribe((data) => {
          data.forEach((doc: any) => {
            doc.payload.doc.ref.delete();
          });
          resolve(data);
        }, (error: any) => {
          reject(error);
          console.log(error);
        });
    });
  }
}




