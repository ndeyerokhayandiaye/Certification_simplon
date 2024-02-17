import { Component, OnInit } from '@angular/core';
import { ForumSujetService } from '../services/forum-sujet.service';
import { ServiceDomainesService } from 'src/app/services/service-domaines.service';
import { DomaineActivite } from '../models/DomaineActivite';
import { Sujet } from '../models/Sujet';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { Forum } from '../models/modelForum';
import { ServiceForumService } from '../services/service-forum.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ServiceLoginService } from '../services/service-login.service';


@Component({
  selector: 'app-forum-sujet-specific',
  templateUrl: './forum-sujet-specific.component.html',
  styleUrls: ['./forum-sujet-specific.component.css']
})
export class ForumSujetSpecificComponent {
sujets: any;
sujet: FormGroup;
domain_id: any;
// domain_id: number;

listforums: Forum[];
listSujets: Sujet[] = []; 
selectedSujet: Sujet;

userConnect: any;
content: string;
message_received: number;
forum_id: number;

  constructor(private forumSujetService: ForumSujetService,
    private formbuilder: FormBuilder,
    private forumService: ServiceForumService,
    private domaineService: ServiceDomainesService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: ServiceLoginService,  ) {
    this.sujet = this.formbuilder.group({
      content: ['', Validators.required],
      forum_id: ['', Validators.required] // Ajouter les validators requis pour domaine
              });
               }

  listeDomaines: DomaineActivite[];
  forums: Forum[] = [];
  domain_name: string;
  domain_description: string;
  filteredSujets: Sujet[] = [];



  ngOnInit() {

    // this.chargerSujets(); // Appel de la méthode pour charger les sujets existants au chargement de la page
    this.listForums();
    this.listSujet();
    this.listerDomaine();

    this.userConnect = JSON.parse(localStorage.getItem("userConnect") || "");

    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');

      // Vérifie si l'id est de type number
      const idNumber = Number(id);
      if (!isNaN(idNumber)) {
        // L'id est de type number, utilise-le
        this.filteredSujets = this.listSujetByDomain(idNumber);
        this.domain_id = idNumber
      } else {
        this.router.navigate(['/accueil']);
        // L'id n'est pas de type number, gère l'erreur ou redirige vers une autre page
        console.error('ID invalide');
      }

    });
  }

  listSujetByDomain(id: number): any {
    this.forumSujetService.getSujetByDomain(id).subscribe(
      (sujets: any) => {
        this.listSujets = sujets.sujet;
        this.domain_name = sujets.domain.fieldname;
        this.domain_description = sujets.domain.description;
      },
      (error) => {
        console.log(error);
      }
    );
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

  Alert(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      timer: 1500

    });
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

  logout() {
    this.loginService.logout().subscribe(
      () => {

          // Supprimer les informations de l'utilisateur du localStorage
        // localStorage.removeItem('token');
        this.Alert("Succès", "Déconnexion réussie", "success");

        localStorage.removeItem('userConnect');
         localStorage.removeItem('user');
        // Gérer la déconnexion réussie
        console.log('Déconnexion réussie');
        this.router.navigate(['accueil']);
        // Rediriger l'utilisateur vers une autre page si nécessaire
      },
      (error) => {
        // Gérer les erreurs de déconnexion
        console.log('Erreur lors de la déconnexion', error);
      }
    );
  }
}




