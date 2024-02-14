import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServiceLoginService } from '../services/service-login.service';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
  providers: [ServiceLoginService]
})
export class AuthentificationComponent implements OnInit{
serviceLoginService: any;
  router: any;
  constructor(private loginService: ServiceLoginService,
    private route: Router) { }


  confirmerpassword: any;
  defaultPassword: string = "passer";
  tabUtilisateurs: any;
  utilisateurTrouve: any;
  emailCon: string = "";
  passwordCon: string = "";
  verifEmailCon: string = "";
  verifPasswordCon: string = "";
  exactEmailCon: boolean = false;
  exactPasswordCon: boolean = false;
  email = "";
  password = "";
  nom = "";
  prenom = "";
  changeForm  : boolean = true;
  
  is_admin: boolean= false;


  ngOnInit(): void {
    if(!localStorage.getItem("userConnect")){
      localStorage.setItem('userConnect', JSON.stringify(""));
    }
  }



login(){
  if(this.emailCon == "" || this.passwordCon == ""){
    this.verifierChamps("Champs vides","Veuillez remplir tous les champs","warning");
  }else{
    const user={
      email: this.emailCon,
      password: this.passwordCon
    }
    this.loginService.login(user).subscribe(
      response => {
        this.verifierChamps("Connexion établie","Vous êtes bien connecté","success");
        console.log('Connexion spécifié', response);
        // localStorage.setItem('token', response.authorization.token);
        localStorage.setItem('userConnect', JSON.stringify(response));
        if(response.user.is_admin==1){
      
          this.route.navigate(['/admin/statistique']);
          
        }
        else if(response.user.is_admin==0){
          this.route.navigate(['/forumSujet']);
          
        }
        else{

          this.verifierChamps( "Connexion desétablie","Ce compte n'existe pas","error");
        }
        // Sauvegarde des informations de connexion dans le localStorage     

})
  }}



  register() {
    this.loginService.register(this.prenom, this.nom, this.emailCon, this.passwordCon, this.confirmerpassword).subscribe(
      response => {
        console.log('Inscription réussie', response);
        // Sauvegarde des informations de connexion dans le localStorage
        localStorage.setItem('email', this.emailCon);
        localStorage.setItem('isLoggedIn', 'true');
        // Affiche une alerte de réussite
        Swal.fire({
          icon: 'success',
          title: 'Inscription réussie',
          text: 'Votre inscription a été effectuée avec succès.',
          confirmButtonText: 'OK'
        }).then(() => {
          // Redirection vers la page d'accueil
          this.router.navigate(['/accueil']);
        });
      },
      error => {
        console.error('Erreur lors de l inscription', error);
        // Affiche une alerte d'erreur
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de l\'inscription',
          text: 'Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer.',
          confirmButtonText: 'OK'
        });
      }
    );
  }



  private handleError(error: any): void {
    if (error && error.message) {
      console.log(error.message);
      // Affichez le message d'erreur à l'utilisateur ou effectuez une autre action appropriée
    } else {
      console.log('Une erreur s\'est produite.');
      // Gérez le cas où error ou error.message est indéfini
    }
  }



  verifEmailConFonction() {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    this.exactEmailCon = false;

    if (this.emailCon === "") {
      this.verifEmailCon = "Veuillez renseigner votre email";
    } else if (!this.emailCon.match(emailPattern)) {
      this.verifEmailCon = "Veuillez donner un email valide";
    } else {
      this.verifEmailCon = "";
      this.exactEmailCon = true;
    }
  }

  verifPasswordConFonction() {
    this.exactPasswordCon = false;
    if (this.passwordCon === "") {
      this.verifPasswordCon = "Veuillez renseigner votre mot de passe";
    } else if (this.passwordCon.length < 5) {
      this.verifPasswordCon = "Mot de passe doit être supérieur ou égal à 5";
    } else {
      this.verifPasswordCon = "";
      this.exactPasswordCon = true;
    }
  }

  verifierChamps(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }

  viderChampsCon() {
    this.emailCon = "";
    this.passwordCon = "";
    this.verifEmailCon = "";
    this.verifPasswordCon = "";
    this.exactEmailCon = false;
    this.exactPasswordCon = false;
  }

  connexion() {
    this.verifEmailConFonction();
    this.verifPasswordConFonction();
    if (this.exactEmailCon && this.exactPasswordCon) {
      this.utilisateurTrouve = this.tabUtilisateurs.find((element: any) => element.email === this.emailCon && this.defaultPassword === this.passwordCon);
      if (this.utilisateurTrouve) {
        this.viderChampsCon();
        this.verifierChamps("Félicitation!", "Authentifié avec succès", "success");
        this.route.navigate(['gestionArticle', this.utilisateurTrouve.id]);
      } else {
        this.verifierChamps("Erreur!", "Le compte n'existe pas", "error");
      }
    }
  }



  showForm() {
    this.changeForm = !this.changeForm;
    this.nom = "";
    this.prenom = "";
    this.email = "";
    this.password = "";
  }

}
