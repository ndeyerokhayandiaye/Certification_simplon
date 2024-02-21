import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent implements OnInit {
  user: any = {}; 
  selectedFile: File | null = null; // Variable pour stocker le fichier sélectionné

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    this.profileService.getProfile().subscribe((data: any) => {
      this.user = data.user;
    });
  }

  // updateProfile(): void {
  //   if (this.selectedFile) {
  //     this.uploadProfilePicture();
  //   } else {
  //     this.saveProfile();
  //   }
  // }

  updateProfile(): void {
    this.profileService.updateProfile(this.user).subscribe((data: any) => {
      this.Alert("Succès", "Profile mise à jour avec succès", "success");

    });
  }

  Alert(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      timer: 1500

    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // uploadProfilePicture(): void {
  //   const formData = new FormData();
  //   formData.append('profilePicture', this.selectedFile!);

  //   this.profileService.uploadProfilePicture(formData).subscribe((data: any) => {
  //     this.user.profilePictureUrl = data.profilePictureUrl;
  //     this.saveProfile();
  //   });
  // }

  uploadProfilePicture(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profilePictureUrl = e.target.result;
        this.updateProfile();
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  saveProfile(): void {
    this.profileService.updateProfile(this.user).subscribe((data: any) => {
      // Faites quelque chose après la mise à jour du profil
    });
  }
}





// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-profil-user',
//   templateUrl: './profil-user.component.html',
//   styleUrls: ['./profil-user.component.css']
// })
// export class ProfilUserComponent implements OnInit {
//   user: any = {}; 

//   constructor(private http: HttpClient) { }

//   ngOnInit(): void {
    
//     this.http.get('/api/profile').subscribe((data: any) => {
//       this.user = data.user;
//     });
//   }
// }






// import { Component } from '@angular/core';
// import { ProfileService } from '../services/profile.service';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
// import { NgModule } from '@angular/core';

// @Component({
//   selector: 'app-profil-user',
//   templateUrl: './profil-user.component.html',
//   styleUrls: ['./profil-user.component.css']
// })
// export class ProfilUserComponent {
//   constructor(private profileservice: ProfileService){}
//   lastname: string;
//   firstname: string;
//   email: string;
//   password: string;
//   password_confirmation: string;
//   image: File;

// formPata : {
//     lastname : string,
//     firstname : string,
//     email : string,
//     password : string,
//     password_confirmation : string,
//     image : string ,
//   }





//   getFile(event: Event) {
//     const inputElement = event.target as HTMLInputElement;
//     if (inputElement.files && inputElement.files.length > 0) {
//       this.image = inputElement.files[0];
//     }
//   }



//   modifierProfil() : void{
// let formData = new FormData();
// formData.append('lastname', this.formPata.lastname);
// formData.append('firstname', this.formPata.firstname);
// formData.append('email', this.formPata.email);
// formData.append('password', this.formPata.password),
// formData.append('image', this.formPata.image),
// formData.append('password_confirmation', this.formPata.password_confirmation),


// console.log("info saisie", this.formPata);

//     this.profileservice.updateProfile(formData).subscribe((respons)=>{
//       console.log("info saisie", this.email);
//       console.log("modifier nikel", respons);

//     })
//   }



// }
