import { Component, OnInit } from '@angular/core';
import { ForumSujetService } from '../services/forum-sujet.service';
import { ServiceDomainesService } from 'src/app/services/service-domaines.service';
import { DomaineActivite } from '../models/DomaineActivite';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Sujet } from '../models/Sujet';
import { ServiceForumService } from '../services/service-forum.service';
import { ServiceLoginService } from '../services/service-login.service';

@Component({
  selector: 'app-forum-sujet',
  templateUrl: './forum-sujet.component.html',
  styleUrls:  ['./forum-sujet.component.css']
})
export class ForumSujetComponent implements OnInit {

  constructor(private forumSujetService: ForumSujetService,
    private domaineService: ServiceDomainesService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private loginService: ServiceLoginService,
    ) {}

  listeDomaines: DomaineActivite[];
  listSujets: Sujet[] = [];
  newForum: Sujet = { id: 0, content: '', forum_id: null, forum:null, user_id: null , message_received: null, created_at: null};
  content = "";


  ngOnInit(): void {
      this.listerDomaine();
      this.loadForums();

   }



loadForums(): void {
  this.forumSujetService.getAllSujets().subscribe(
    (forums: Sujet[])=> {
      console.log("bonjour forum",forums)
      this.listSujets = forums;
    },
    error => {
      console.log('Une erreur s\'est produite lors du chargement des forums :', error);
    }
  );
}


createForum(forum: Sujet): void {
  let forum1=
  this.forumSujetService.createSujet(forum).subscribe(
    createdForum => {
      console.log("Sujet")
      console.log("BonSOIRRRRR",createdForum)
      // this.verifierChamps('Forum creé', 'Le forum a été créé avec succès : ' + createdForum.id, 'success');
      this.verifierChamps("Forum creé","Le forum a été créé avec succès","success")

      console.log('Le forum a été créé avec succès :', createdForum);
      this.loadForums(); // Actualiser la liste des forums après la création
    },
    error => {
      this.verifierChamps("Erreur","Une erreur s'est produite lors de la création du forum","error")
      console.log('Une erreur s\'est produite lors de la création du forum :', error);
    }
  );
}

updateForum(forum: Sujet): void {
  this.forumSujetService.updateSujet(forum.id, forum).subscribe(
    updatedForum => {
      console.log('Le forum a été mis à jour avec succès :', updatedForum);
      this.loadForums(); // Actualiser la liste des forums après la mise à jour
    },
    error => {
      console.log('Une erreur s\'est produite lors de la mise à jour du forum :', error);
    }
  );
}

deleteForum(id: number): void {
  this.forumSujetService.deleteSujet(id).subscribe(
    () => {
      console.log('Le forum a été supprimé avec succès');
      this.loadForums(); // Actualiser la liste des forums après la suppression
    },
    error => {
      console.log('Une erreur s\'est produite lors de la suppression du forum :', error);
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

  verifierChamps(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
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

}
