import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceLoginService } from 'src/app/services/service-login.service';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Forum } from 'src/app/models/modelForum';
import { DomainesActivitesComponent } from 'src/app/admin/domaines-activites/domaines-activites.component'
import Swal from 'sweetalert2';
import { DomaineActivite } from 'src/app/models/DomaineActivite';
import { ServiceDomainesService } from 'src/app/services/service-domaines.service';
import { ServiceForumService } from 'src/app/services/service-forum.service';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: [ './forum.component.css']
})
export class ForumComponent implements OnInit {

  forums: Forum[] = [];
  listeDomaines: DomaineActivite[];
  domaines: DomainesActivitesComponent;
  selectedForum: Forum;

  forum: FormGroup;
  userConnect: any;
  forumname: string;
  description: string;
  field_id: number;

  editedForum: Forum = { id: null, forumname: '', description: '', field_id: null, user_id: null, };

  constructor(
    private domaineService: ServiceDomainesService,
    private forumService: ServiceForumService,
     private formbuilder: FormBuilder) {
    this.forum = this.formbuilder.group({
      forumname: ["", [Validators.required, Validators.maxLength(200)]],
      description: ["", [Validators.required, Validators.maxLength(500)]],
      field_id: ["", Validators.required]
    })
  }

  newForum: Forum = { id: 0, forumname: '', description: '', field_id: null, user_id: null };

  ngOnInit() {
    this.userConnect = JSON.parse(localStorage.getItem("userConnect") || "");
    this.listForums();
    this.listerDomaine();

  }

  Alert(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }

  openEditModal(forum: Forum): void {
    this.selectedForum = forum;
    this.editedForum = { ...forum };
    // this.newForum =

    // Open the modal here
  }


  listForums(): void {
    this.forumService.getAllForums().subscribe(
      (forums: Forum[]) => {
        this.forums = forums;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  listerDomaine(): void {
    this.domaineService.listerDomaine().subscribe(
      (domaines: DomaineActivite[]) => {
        this.listeDomaines = domaines;
      },
      (error) => {
        console.log(error);
        // Traitez l'erreur ici
      }
    );
  }

  ajoutForum(): void {

    const formData = new FormData();

    formData.append('forumname', this.forum.value.forumname);
    formData.append('description', this.forum.value.description);
    formData.append('field_id', this.forum.value.field_id);
    formData.append('user_id', this.userConnect.user.id);

    this.forumService.createForum(formData).subscribe(
      createdForum => {
        //console.log('Forum ajouté avec succès :', createdForum);
        this.Alert("Succès", "Forum ajouté avec succès", "success");
        this.listForums(); // Refresh la liste aprés l'ajout de forum
      },
      error => {
        this.Alert("Erreur", error.error.message, "error");
        console.log('Erreur lors de l\'ajout du domaine :', error);
      }
    );
  }

  updateForum(forum: Forum): void {
    // const formData = new FormData();

    // formData.append('forumname', this.forum.value.forumname);
    // formData.append('description', this.forum.value.description);
    // formData.append('field_id', this.forum.value.field_id);
    // formData.append('user_id', this.userConnect.user.id);

    this.forumService.updateForum(forum.id, forum).subscribe(
      updatedForum => {
        console.log('Le forum a été mis à jour avec succès :', updatedForum);
        this.listForums(); // Actualiser la liste des forums après la mise à jour
      },
      error => {
        console.log('Une erreur s\'est produite lors de la modification du forum :', error);
      }
    );
  }


  deleteForum(id: number): void {
    Swal.fire({
      title: 'Confirmation',
      text: "Êtes vous sûr de vouloir supprimé!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.forumService.deleteForum(id).subscribe(
          () => {
            console.log('Le forum a été supprimé avec succès');
            this.Alert("Succès", "Le forum a été supprimé avec succès", "success");
            this.listForums(); // Actualiser la liste des forums après la suppression
          },
          error => {
            this.Alert("Erreur", "Une erreur s\'est produite lors de la suppression du forum", "error");
          }
        );
      }
    })

  }

}


