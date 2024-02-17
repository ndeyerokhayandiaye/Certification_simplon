import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomaineActivite } from '../models/DomaineActivite';
import { Forum } from '../models/modelForum';
import { Message } from '../models/Message';
import { Reponse } from '../models/Reponse';
import { ServiceDomainesService } from '../services/service-domaines.service';
import { ForumSujetService } from '../services/forum-sujet.service';
import { ServiceLoginService } from '../services/service-login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forum-message',
  templateUrl: './forum-message.component.html',
  styleUrls: ['./forum-message.component.css']
})
export class ForumMessageComponent implements OnInit {
  listeDomaines: DomaineActivite[] = [];
  reponses: Reponse[] = [];
  messages: Message[] = [];
  forums: Forum[] = [];
  domain_name: string = '';
  content: string = '';
  domain_id: any;
  date: Date = new Date();
  userConnect: any;
  messageForm: FormGroup;
  reponseForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private domaineService: ServiceDomainesService,
    private forumSujetService: ForumSujetService,
    private loginService: ServiceLoginService
  ) {}

  ngOnInit(): void {
    this.userConnect = JSON.parse(localStorage.getItem("userConnect") || "");
    this.likesCount = parseInt(localStorage.getItem('likesCount') || '0', 10);
    this.dislikesCount = parseInt(localStorage.getItem('dislikesCount') || '0', 10);
    this.listerDomaine();
  
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      const idNumber = Number(id);
      if (!isNaN(idNumber)) {
        this.listMessageBySujet(idNumber); // Appel à la méthode
        this.domain_id = idNumber;
      } else {
        this.router.navigate(['/accueil']);
        console.error('ID invalide');
      }
    });

    this.messageForm = this.formBuilder.group({
      message_content: ["", [Validators.required, Validators.maxLength(200)]],
      topic_id: ["", [Validators.required, Validators.maxLength(500)]],
      user_id: [""],
    });

    this.reponseForm = this.formBuilder.group({
      reply_content: ["", [Validators.required, Validators.maxLength(200)]],
      message_id: ["", [Validators.required, Validators.maxLength(500)]],
      user_id: [""],
    });
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

  listMessageBySujet(id: number): void {
    this.forumSujetService.getSujetByID(id).subscribe(
      (sujets: any) => {
        if (sujets && sujets.forum) {
          this.domain_name = sujets.forum.forumname || '';
        }
        this.content = sujets.content;
        this.date = sujets.created_at;
        this.messages = sujets.messages;
  
        // Pour chaque message, récupérez les réponses associées
        this.messages.forEach(message => {
          this.forumSujetService.getMessageByID(message.id).subscribe(
            (response: any) => {
              message.reponses = response;
            },
            (error) => {
              console.log(error);
              this.Alert("Erreur", "Erreur lors de la récupération des réponses", "error");
            }
          );
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  
  

  listReponseByMessage(id: number): void {
    this.forumSujetService.getMessageByID(id).subscribe(
      (message: any) => {
        if (message && message.reponses) {
          this.reponses = message.reponses;
        }
      },
      (error) => {
        console.log(error);
        this.Alert("Erreur", "Erreur lors de la récupération des réponses", "error");
      }
    );
  }
  

  ajoutMessage(): void {
    const formData = new FormData();
    formData.append('message_content', this.messageForm.value.message_content);
    formData.append('topic_id', this.domain_id);
    formData.append('user_id', this.userConnect.user.id);

    this.domaineService.sendMessage(formData).subscribe(
      () => {
        this.Alert("Succès", "Message envoyé avec succès", "success");
        this.listerDomaine();
        this.listMessageBySujet(this.domain_id);
      },
      (error) => {
        this.Alert("Erreur", error.error.message, "error");
        console.log('Erreur lors de l\'ajout du message :', error);
      }
    );
  }

  ajoutReponse(): void {
    const formData = new FormData();
    formData.append('reply_content', this.reponseForm.value.reply_content);
    formData.append('message_id', this.domain_id);
    formData.append('user_id', this.userConnect.user.id);

    this.domaineService.sendReponse(formData).subscribe(
      () => {
        this.Alert("Succès", "Réponse envoyée avec succès", "success");
        this.listerDomaine();
        this.listReponseByMessage(this.domain_id);
      },
      (error) => {
        this.Alert("Erreur", error.error.message, "error");
        console.log('Erreur lors de l\'envoi de la réponse :', error);
      }
    );
  }

  logout(): void {
    this.loginService.logout().subscribe(
      () => {
        this.Alert("Succès", "Déconnexion réussie", "success");
        localStorage.removeItem('userConnect');
        localStorage.removeItem('user');
        console.log('Déconnexion réussie');
        this.router.navigate(['accueil']);
      },
      (error) => {
        console.log('Erreur lors de la déconnexion', error);
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

  likesCount = 0;
  dislikesCount = 0;

   like() {
    this.likesCount++;
    localStorage.setItem('likesCount', this.likesCount.toString());
  }

  dislike() {
    this.dislikesCount++;
    localStorage.setItem('dislikesCount', this.dislikesCount.toString());
  }
}