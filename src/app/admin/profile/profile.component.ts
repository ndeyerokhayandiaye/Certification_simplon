import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
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
