import { Component } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent {
  constructor(private profileservice: ProfileService){}
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  password_confirmation: string;
  image: File;

formPata : {
    lastname : string,
    firstname : string,
    email : string,
    password : string,
    password_confirmation : string,
    image : string ,
  }





  getFile(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.image = inputElement.files[0];
    }
  }



  modifierProfil() : void{
let formData = new FormData();
formData.append('lastname', this.formPata.lastname);
formData.append('firstname', this.formPata.firstname);
formData.append('email', this.formPata.email);
formData.append('password', this.formPata.password),
formData.append('image', this.formPata.image),
formData.append('password_confirmation', this.formPata.password_confirmation),


console.log("info saisie", this.formPata);

    this.profileservice.updateProfile(formData).subscribe((respons)=>{
      console.log("info saisie", this.email);
      console.log("modifier nikel", respons);

    })
  }



}
