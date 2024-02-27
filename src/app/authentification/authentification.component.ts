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

  verifNom: string = '';
  verifPrenom: string = '';


  ngOnInit(): void {
    if(!localStorage.getItem("userConnect")){
      localStorage.setItem('userConnect', JSON.stringify(""));
    }
  }


// login(){
//   if(this.emailCon == "" || this.passwordCon == ""){
//     this.Alert("Champs vides","Veuillez remplir tous les champs","warning");
//   }else{
//     const user={
//       email: this.emailCon,
//       password: this.passwordCon
//     }
//     this.loginService.login(user).subscribe(
//       response => {
//         this.Alert("Connexion établie","Vous êtes bien connecté","success");
//         console.log('Connexion spécifiée', response);
//         // localStorage.setItem('token', response.authorization.token);
//         localStorage.setItem('userConnect', JSON.stringify(response));
//         if(response.user.is_admin==1){
      
//           this.route.navigate(['/admin/statistique']);
          
//         }
//         else if(response.user.is_admin==0){
//           this.route.navigate(['/forumSujet']);
          
//         }
//         else{

//           this.Alert( "Connexion desétablie","Ce compte n'existe pas","error");
//         }

// })
//   }}

// pour pouvoir griser le bouton de connexion tant que les champs ne sont pas bien remplis...
isFieldsEmpty: boolean = true; 
 ngDoCheck() {
  this.isFieldsEmpty = this.emailCon === '' || this.passwordCon === '' || !this.exactEmailCon || !this.exactPasswordCon;
}

login() {
  if (this.isFieldsEmpty) {
    this.Alert("Champs vides ou validations échouées", "Veuillez remplir tous les champs correctement", "warning");
  } else {
    const user = {
      email: this.emailCon,
      password: this.passwordCon
    };
    this.loginService.login(user).subscribe(
      response => {
        this.Alert("Connexion établie", "Vous êtes bien connecté", "success");
        console.log('Connexion spécifiée', response);
        // localStorage.setItem('token', response.authorization.token);
        localStorage.setItem('userConnect', JSON.stringify(response));
        if (response.user.is_admin === 1) {
          this.route.navigate(['/admin/statistique']);
        } else if (response.user.is_admin === 0) {
          this.route.navigate(['/forumSujet']);
        } else {
          this.Alert("Connexion désétablie", "Ce compte n'existe pas", "error");
        }
        // Sauvegarde des informations de connexion dans le localStorage
      }
    );
  }
}

  validateNom() {
    
    if (this.nom.length < 2 || !this.nom.match(/^[a-zA-Z\s]*$/)) {
      this.verifNom = 'Le nom doit contenir uniquement des lettres et avoir une longueur supérieure ou égale à 2';
    } else {
      this.verifNom = ''; // Le nom est valide, efface le message d'erreur
    }
  }

  validatePrenom() {
    if (this.prenom.length < 2 || !this.prenom.match(/^[a-zA-Z\s]*$/)) {
      this.verifPrenom = 'Le prénom doit contenir uniquement des lettres et avoir une longueur supérieure ou égale à 2';
    } else {
      this.verifPrenom = ''; // Le prénom est valide, efface le message d'erreur
    }
  }

  register() {
    // const nameRegex=/^[a-zA-Z][a-zA-Z -]{1,100}$/;
    this.verifEmailConFonction();
    this.verifPasswordConFonction();
   
     // Perform frontend validations
  if (this.nom === '' || this.prenom === '' || this.emailCon === '' || this.passwordCon === '' || this.confirmerpassword === '') {
    this.Alert('Champs vides', 'Veuillez remplir tous les champs', 'warning');
    return; 
  }

    // Validate nom
    if (this.nom.length < 2 || !this.nom.match(/^[a-zA-Z\s]*$/)) {
      this.verifNom = 'Le nom doit contenir uniquement des lettres et avoir une longueur supérieure ou égale à 2';
      return;
    }

      // Validate prenom
      if (this.prenom.length < 2 || !this.prenom.match(/^[a-zA-Z\s]*$/)) {
        this.verifPrenom = 'Le prénom doit contenir uniquement des lettres et avoir une longueur supérieure ou égale à 2';
        return;
      }

  if (this.passwordCon !== this.confirmerpassword) {
    this.Alert('Erreur', 'Les mots de passe ne correspondent pas', 'error');
    return; 
  }

  this.loginService.register(this.prenom, this.nom, this.emailCon, this.passwordCon, this.confirmerpassword).subscribe(
    response => {
      console.log('Inscription effectuée avec success👏🏽', response);

         // Réinitialiser les valeurs des champs
         this.nom = '';
         this.prenom = '';
         this.emailCon = '';
         this.passwordCon = '';
         this.confirmerpassword = '';
      
      // Sauvegarde des informations de connexion dans le localStorage
      localStorage.setItem('email', this.emailCon);
      localStorage.setItem('isLoggedIn', 'true');
      // Affiche une alerte de réussite
      Swal.fire({
        icon: 'success',
        title: 'Inscription réussie',
        text: 'Inscription effectuée avec success👏🏽',
        confirmButtonText: 'OK'
      }).then(() => {
        // Redirection vers la page d'accueil
        this.router.navigate(['/accueil']);
      });
    },
    error => {
      console.error('Erreur lors de l inscription', error);
      // Affiche une alerte d'erreur
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Erreur lors de l\'inscription',
      //   text: 'Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer.',
      //   confirmButtonText: 'OK',
      //   timer: 1500

      // });
    }
  );
  }

  // register() {
  //   if (
  //     this.nom === '' ||
  //     this.prenom === '' ||
  //     this.emailCon === '' ||
  //     this.passwordCon === '' ||
  //     this.confirmerpassword === ''
  //   ) {
  //     this.Alert('Champs vides', 'Veuillez remplir tous les champs', 'warning');
  //     return;
  //   }

  //   if (this.nom.length < 2 || !this.nom.match(/^[a-zA-Z\s]*$/)) {
  //     this.verifNom = 'Le nom doit contenir uniquement des lettres et avoir une longueur supérieure ou égale à 2';
  //     return;
  //   }

  //   if (this.prenom.length < 2 || !this.prenom.match(/^[a-zA-Z\s]*$/)) {
  //     this.verifPrenom = 'Le prénom doit contenir uniquement des lettres et avoir une longueur supérieure ou égale à 2';
  //     return;
  //   }

  //   if (this.passwordCon !== this.confirmerpassword) {
  //     this.Alert('Erreur', 'Les mots de passe ne correspondent pas', 'error');
  //     return;
  //   }

  //   const user = {
  //     nom: this.nom,
  //     prenom: this.prenom,
  //     email: this.emailCon,
  //     password: this.passwordCon,
  //     is_admin: this.is_admin ? 1 : 0
  //   };

  //   this.loginService.register(
  //     this.prenom,
  //     this.nom,
  //     this.emailCon,
  //     this.passwordCon,
  //     this.confirmerpassword
  //   ).subscribe(
  //     response => {
  //       this.Alert('Inscription réussie', 'Votre compte a été créé avec succès', 'success');
  //       console.log('Inscription réussie', response);
  //       this.changeForm = true;

  //          // Réinitialisation des champs du formulaire
  //     this.nom = '';
  //     this.prenom = '';
  //     this.emailCon = '';
  //     this.passwordCon = '';
  //     this.confirmerpassword = '';
  //   },
     
      
  //     error => {
  //       console.error('Erreur lors de l\'inscription', error);
  //     }
  //   );
  // }

  // isFormValid(): boolean {
  //   if (
  //     this.nom === '' ||
  //     this.prenom === '' ||
  //     this.emailCon === '' ||
  //     this.passwordCon === '' ||
  //     this.confirmerpassword === ''
  //   ) {
  //     return false;
  //   }


  //   if (
  //     this.nom.length < 2 ||
  //     !this.nom.match(/^[a-zA-Z\s]*$/)
  //   ) {
  //     return false;
  //   }

  //   if (
  //     this.prenom.length < 2 ||
  //     !this.prenom.match(/^[a-zA-Z\s]*$/)
  //   ) {
  //     return false;
  //   }

  //   if (this.passwordCon !== this.confirmerpassword) {
  //     return false;
  //   }

  //   return true;
  // }


 
  



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
    const passwordRegex=/^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,}$/;
    this.exactPasswordCon = false;
    if (this.passwordCon === "") {
      this.verifPasswordCon = "Veuillez renseigner votre mot de passe";
    } else if (this.passwordCon.length < 5) {
      this.verifPasswordCon = "Mot de passe doit être supérieur ou égal à 5";
    } 
    // else if (!this.passwordCon.match(passwordRegex)) {
    //   this.verifPasswordCon = "Mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractére spéciaux";
    // }
     else {
      this.verifPasswordCon = "";
      this.exactPasswordCon = true;
    }
  }

  Alert(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      timer: 1500

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


  showForm() {
    this.changeForm = !this.changeForm;
    this.nom = "";
    this.prenom = "";
    this.email = "";
    this.password = "";
  }

}
