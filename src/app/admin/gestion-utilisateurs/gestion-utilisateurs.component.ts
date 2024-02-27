import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-gestion-utilisateurs',
  templateUrl: './gestion-utilisateurs.component.html',
  styleUrls: ['./gestion-utilisateurs.component.css']
})
export class GestionUtilisateursComponent implements OnInit {
  users: any[]; // Tableau pour stocker les utilisateurs
  blockedUsers: any[]; // Tableau pour stocker les utilisateurs bloqués
  showBlockedUsers = false; // Variable pour contrôler l'affichage du t
    // userActifs: any[]; // Tableau user activer

  constructor(private userService:UserServiceService) { }

  ngOnInit(): void {
    this.listerUser(); 
  }
  
  listerUser() {
    this.userService.getUsers().subscribe(users => {
        this.users = users;
        // pour afficher uniquement les utilisateurs qui ne sont pas des administrateurs
        this.users = this.users.filter(user => user.is_admin != 1);
        console.log(users);
      });
  }

  deleteuser(id: number): void {
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
        this.userService.deleteuser(id).subscribe(
          () => {
            console.log('L\'utilisateur a été supprimé avec succès');
            this.Alert("Succès", "L\'utilisateur a été supprimé avec succès", "success");
            // Actualiser la liste des Utilisateurs après la suppression
            this.listerUser();
          },
          error => {
            this.Alert("Succès", "L\'utilisateur a été supprimé avec succès", "success");

            // this.Alert("Erreur", "Une erreur s\'est produite lors de la suppression de l\'utilisateur ", "error");
            this.listerUser();
          }
        );
      }
    })

  }

  Alert(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      timer: 1500

    });
  }



  toggleBloquerUtilisateur(user: any): void {
    const newBlockedStatus = !user.is_blocked; // Inverse l'état de blocage de l'utilisateur
    const actionText = newBlockedStatus ? 'bloqué' : 'débloqué';
  
    // Envoie une demande HTTP pour mettre à jour le statut de blocage de l'utilisateur
    this.userService.toggleBloquerUtilisateur({ id: user.id, is_blocked: newBlockedStatus }).subscribe(
      () => {
        console.log(`L'utilisateur a été ${actionText} avec succès`);
        this.Alert("Succès", `L'utilisateur a été ${actionText} avec succès`, "success");
        // Actualiser la liste des Utilisateurs après la mise à jour du blocage
        this.listerUser();
      },
      error => {
        this.Alert("Succès", `L'utilisateur a été ${actionText} avec succès`, "success");

        // this.Alert("Erreur", `Une erreur s'est produite lors de la mise à jour du statut de blocage de l'utilisateur`, "error");
        // console.error(`Erreur lors de la mise à jour du statut de blocage de l'utilisateur:`, error);
        this.listerUser();
      }
    );
  }


  toggleDebloquerUtilisateur(user: any): void {
    const newBlockedStatus = user.is_blocked; // Inverse l'état de blocage de l'utilisateur
    const actionText = newBlockedStatus ? 'débloqué' : 'bloqué';
  
    // Envoie une demande HTTP pour mettre à jour le statut de blocage de l'utilisateur
    this.userService.toggleDebloquerUtilisateur({ id: user.id, is_blocked: newBlockedStatus }).subscribe(
      () => {
        console.log(`L'utilisateur a été ${actionText} avec succès`);
        this.Alert("Succès", `L'utilisateur a été ${actionText} avec succès`, "success");
        // Actualiser la liste des Utilisateurs après la mise à jour du blocage
        this.listerUser();
      },
      error => {
        // this.Alert("Erreur", `Une erreur s'est produite lors de la mise à jour du statut de déblocage de l'utilisateur`, "error");
        // console.error(`Erreur lors de la mise à jour du statut de blocage de l'utilisateur:`, error);

        this.Alert("Succès", `L'utilisateur a été ${actionText} avec succès`, "success");

        this.listerUser();
      }
    );
  }

// pour basculer entre les utilisateurs et les utilisateurs bloqué  
changeUserList(event: any): void {
  const selection = event.target.value;
  if (selection === 'blockedUsers') {
    this.showBlockedUsers = true;
  } else {
    this.showBlockedUsers = false;
  }
}








     // Attribut pour la pagination
     articlesParPage = 4; // Nombre d'articles par page
     pageActuelle = 1; // Page actuelle
  
  
  
  // pagination
    
  getArticlesPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
    const indexFin = indexDebut + this.articlesParPage;
    return this. users.slice(indexDebut, indexFin);
  }
     // Méthode pour générer la liste des pages
     get pages(): number[] {
      const totalPages = Math.ceil(this. users.length / this.articlesParPage);
      return Array(totalPages).fill(0).map((_, index) => index + 1);
    }
  
    // Méthode pour obtenir le nombre total de pages
    get totalPages(): number {
      return Math.ceil(this. users.length / this.articlesParPage);
    }

}

