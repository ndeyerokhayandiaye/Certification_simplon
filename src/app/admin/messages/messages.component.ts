import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router , ParamMap } from "@angular/router";
import { DomaineActivite } from "src/app/models/DomaineActivite";
import { Message } from "src/app/models/Message";
import { Forum } from "src/app/models/modelForum";
import { ForumSujetService } from "src/app/services/forum-sujet.service";
import { ServiceDomainesService } from "src/app/services/service-domaines.service";
import { ServiceLoginService } from "src/app/services/service-login.service";
import Swal from "sweetalert2";




@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  listeDomaines: DomaineActivite[];
  messages: Message[];
  forums: Forum[] = [];
  domain_name: string;
  content: string;
  domain_id: any;
  date: Date;
  userConnect: any;
  messageForm: FormGroup;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private formbuilder: FormBuilder,
    private domaineService: ServiceDomainesService,
    private forumSujetService: ForumSujetService,
    private loginService: ServiceLoginService,) {
      this.messageForm = this.formbuilder.group({
        message_content: ["", [Validators.required, Validators.maxLength(200)]],
        topic_id: ["", [Validators.required, Validators.maxLength(500)]],
        user_id: [""],
      })

    }

    ngOnInit() {
      this.userConnect = JSON.parse(localStorage.getItem("userConnect") || "");
      this.listerDomaine();
      this.route.paramMap.subscribe((params: ParamMap) => {
        const id = params.get('id');

        // Utilise la valeur de l'id comme tu le souhaites

        // Vérifie si l'id est de type number
        const idNumber = Number(id);
        if (!isNaN(idNumber)) {
          // L'id est de type number, utilise-le
          this.forums = this.listMessageBySujet(idNumber);
          this.domain_id = idNumber

        } else {
          this.router.navigate(['/accueil']);
          // L'id n'est pas de type number, gère l'erreur ou redirige vers une autre page
          console.error('ID invalide');
        }
      });
    }
    listerDomaine(): void {
      this.domaineService.listerDomaine().subscribe(
        (domaines: DomaineActivite[]) => {

          //console.log(domaines)
          this.listeDomaines = domaines;
        },
        (error) => {
          console.log(error);
          // Traitez l'erreur ici
        }
      );
    }

    listMessageBySujet(id: number): any {
      this.forumSujetService.getSujetByID(id).subscribe(
        (sujets: any) => {
          //this.listSujets = sujets.sujet;
          this.domain_name = sujets.forum.forumname;
          this.content = sujets.content;
          this.date = sujets.created_at;
          this.messages = sujets.messages;
          console.log(sujets);

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
        icon: icon
      });
    }


    

    ajoutMessage(): void {
      const formData = new FormData();
      formData.append('message_content', this.messageForm.value.message_content);
      formData.append('topic_id', this.domain_id);
      formData.append('user_id', this.userConnect.user.id);

      this.domaineService.sendMessage(formData).subscribe(
        createdDomaine => {
          //console.log('Domaine ajouté avec succès :', createdDomaine);
          this.Alert("Succès", "Message envoyé avec succès ", "success");
          this.listerDomaine();
          this.forums = this.listMessageBySujet(this.domain_id); // Refresh the list 
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
