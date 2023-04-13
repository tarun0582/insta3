import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication-services/authentication.service';
import { RealsService } from 'src/app/core/services/reals.service';

@Component({
  selector: 'app-create-reals',
  templateUrl: './createReals.component.html',
})
export class CreateRealsComponent {
  title = 'instagram';
  realsMessage:FormGroup
  constructor( private fb: FormBuilder ,private realstore:RealsService,private authData:AuthenticationService){
    this.realsMessage = this.fb.group({
      reals: [''],
    })
  }
  reals(){
      const email =this.authData.getToken('email');
      const userId=this.authData.getToken('userId');
      this.realstore.addreals(this.realsMessage.value,email,userId);
      console.log(this.realsMessage.value)
    
  }
  async onFileSelected(event: any) {
    const image = event.target.files[0];
      await  this.realstore
          .uploadReals(image)
          .then((url) => {
            this.realsMessage=this.fb.group({
              reals:[url],
            })
      })
          .catch((error) => {
            console.error(error);
          });
      }
}
