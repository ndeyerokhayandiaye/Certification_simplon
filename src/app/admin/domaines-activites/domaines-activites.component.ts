import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomaineActivite } from 'src/app/models/DomaineActivite';
import { ServiceDomainesService } from 'src/app/services/service-domaines.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-domaines-activites',
  templateUrl: './domaines-activites.component.html',
  styleUrls: ['./domaines-activites.component.css']
})
export class DomainesActivitesComponent implements OnInit {

  listeDomaines: DomaineActivite[];
  selectedDomaine: DomaineActivite;

  domaineActivite: FormGroup;
  userConnect: any;
  picture: File;
  description: string;
  fieldname: string = "";

  editedDomaine: DomaineActivite = { id: null, fieldname: '', description: '', picture: null };
  // fieldname!: string;

  constructor(private domaineService: ServiceDomainesService, private formbuilder: FormBuilder) {
    this.domaineActivite = this.formbuilder.group({
      fieldname: ["", [Validators.required, Validators.maxLength(200)]],
      description: ["", [Validators.required, Validators.maxLength(500)]],
      picture: ["", Validators.required],
      user_id: [""],
    })
  }


  ngOnInit(): void {
    this.userConnect = JSON.parse(localStorage.getItem("userConnect") || "");
    this.listerDomaine();
  }

  Alert(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      timer: 1500

    });
  }

  ajoutDomaine(): void {
    const formData = new FormData();
    formData.append('fieldname', this.domaineActivite.value.fieldname);
    formData.append('description', this.domaineActivite.value.description);
    formData.append('picture', this.picture);

    this.domaineService.ajoutDomaine(formData).subscribe(
      createdDomaine => {
        //console.log('Domaine ajouté avec succès :', createdDomaine);
        this.Alert("Succès", "Domaine ajouté avec succès", "success");
        this.listerDomaine(); 
      },
      error => {
        this.Alert("Erreur", error.error.message, "error");
        console.log('Erreur lors de l\'ajout du domaine :', error);
      }
    );
  }

  openEditModal(domaine: DomaineActivite): void {
    this.selectedDomaine = domaine;

    this.editedDomaine = { ...domaine };

  }


  // openEditModal(domaine: DomaineActivite) {
  //   this.selectedDomaine = domaine;
  //   this.domaineActivite.patchValue({
  //     fieldname: domaine.fieldname,
  //     description: domaine.description,
  //     picture: domaine.picture
  //   });
  // }


  closeModal(): void {
    // Close the modal here
  }

  getFile(event: any) {
    //console.warn(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      this.picture = file;
    }
    //this.picture= event.target.files[0] as File;
  }

  listerDomaine(): void {   
    this.domaineService.listerDomaine().subscribe(
      (domaines: DomaineActivite[]) => {
        this.listeDomaines = domaines;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateDomaine(): void {
     if (!this.picture) {
      this.editedDomaine.picture = null
    }
   
    this.domaineService.updateDomaine(this.selectedDomaine.id, this.editedDomaine).subscribe(
      updatedDomaine => {
        //console.log('Domaine updated successfully:', updatedDomaine);
        this.Alert("Succès", "Domaine modifier avec succès", "success");
        this.listerDomaine();
        //this.closeModal();
      },
      error => {
        this.Alert("Erreur", error.error.message, "error");
        console.log('Error updating domaine:', error);
      }
    );
  }


}


