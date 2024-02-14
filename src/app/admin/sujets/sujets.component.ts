import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomaineActivite } from 'src/app/models/DomaineActivite';
import { Sujet } from 'src/app/models/Sujet';
import { Forum } from 'src/app/models/modelForum';
import { ForumSujetService } from 'src/app/services/forum-sujet.service';
import { ServiceForumService } from 'src/app/services/service-forum.service';
import Swal from 'sweetalert2';
import { ServiceDomainesService } from 'src/app/services/service-domaines.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { ServiceLoginService } from '../services/service-login.service';


@Component({
  selector: 'app-sujets',
  templateUrl: './sujets.component.html',
  styleUrls: ['./sujets.component.css']
})
export class SujetsComponent implements OnInit {

  
  listeDomaines: DomaineActivite[];

  listforums: Forum[];
  listSujets: Sujet[] = []; 
  selectedSujet: Sujet;

  sujet: FormGroup;
  userConnect: any;
  content: string;
  message_received: number;
  forum_id: number;

  // sujetsFiltres: Sujet[] = [];


  editedSujet: Sujet = { id: null, content: '', message_received: null, forum: null, forum_id: null, user_id: null, created_at: null };


  constructor(
    private forumService: ServiceForumService,
    private forumSujetService: ForumSujetService, 
    private formbuilder: FormBuilder,
    private route: Router,

    private domaineService: ServiceDomainesService,
    // private route: ActivatedRoute,
    private http: HttpClient,) {
      
      this.sujet = this.formbuilder.group({
        content: ['', Validators.required], // Add Validators.required for required field
        forum_id: ['', Validators.required] // Add Validators.required for required field
      });
    }

    

  ngOnInit() {
    this.userConnect = JSON.parse(localStorage.getItem("userConnect") || "");
    this.listSujet();
    this.listForums();
   this.listerDomaine();
  }

  listerDomaine(): void {
    this.domaineService.listerDomaine().subscribe(
      (domaines: DomaineActivite[]) => {

        console.log(domaines)
        this.listeDomaines = domaines;
      },
      (error) => {
        console.log(error);
        // Traitez l'erreur ici
      }
    );
  }




  Alert(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }



  openEditModal(sujet: Sujet): void {
    this.selectedSujet = sujet;
    this.editedSujet = { ...sujet };
    console.log(this.editedSujet);
    // Open the modal here
  }


  listSujet(): void {
    this.forumSujetService.getAllSujets().subscribe(
      (sujets: Sujet[]) => {
        this.listSujets = sujets;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  listForums(): void {
    this.forumService.getAllForums().subscribe(
      (forums: Forum[]) => {
        this.listforums = forums;
      },
      (error) => {
        console.log(error);
      }
    );
  }



  ajoutSujet(): void {
    const formData = new FormData();
    formData.append('content', this.sujet.value.content);
    formData.append('forum_id', this.sujet.value.forum_id);
    formData.append('user_id', this.userConnect.user.id);
    console.log(this.sujet.value.forum_id);

    this.forumSujetService.createSujet(formData).subscribe(
      createdSujet => {
        //console.log('Domaine ajouté avec succès :', createdSujet);
        this.listSujet(); // Refresh the list of domains after successful addition
        this.Alert("Succès", "Sujet ajouté avec succès", "success");
      },
      error => {
        this.Alert("Erreur", error.error.message, "error");
        console.log('Erreur lors de l\'ajout du domaine :', error);
      }
    );
  }

  deleteSujet(id: number): void {
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
        this.forumSujetService.deleteSujet(id).subscribe(
          () => {
            console.log('Le sujet a été supprimé avec succès');
            this.Alert("Succès", "Le sujet a été supprimé avec succès", "success");
            this.listSujet(); // Actualiser la liste des forums après la suppression
          },
          error => {
            this.Alert("Erreur", "Une erreur s\'est produite lors de la suppression du sujet", "error");
            console.log('Une erreur s\'est produite lors de la suppression du sujet :', error);
          }
        );
      }
    })

  }
}
