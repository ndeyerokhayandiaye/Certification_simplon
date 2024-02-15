import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomaineActivite } from 'src/app/models/DomaineActivite';
import { ServiceDomainesService } from 'src/app/services/service-domaines.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor(private domaineService: ServiceDomainesService) {
    // this.domaineActivite = this.formbuilder.group({
    //   fieldname: ["", [Validators.required, Validators.maxLength(200)]],
    //   description: ["", [Validators.required, Validators.maxLength(500)]],
    //   picture: ["", Validators.required],
    //   user_id: [""],
    // })
  }

  listeDomaines: DomaineActivite[] = [];
  selectedDomaine: DomaineActivite;

  domaineActivite: FormGroup;
  userConnect: any;
  picture: File;
  description: string;
  fieldname: string = "";

   




  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = '../../../assets/js/main.js';
    document.body.appendChild(script);

    if(!localStorage.getItem("userConnect")){
      localStorage.setItem('userConnect', JSON.stringify(""));
    }

    // this.userConnect = JSON.parse(localStorage.getItem("userConnect") || "");
    //console.log(this.userConnect.authorization.token)
    this.listerDomaine();
  }

  Alert(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }

  listerDomaine(): void {
    this.domaineService.listerDomaine().subscribe(
      (domaines: DomaineActivite[]) => {
        this.listeDomaines = domaines;
        console.log(this.listeDomaines);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  searchTerm: string = '';

  performSearch() {
    // Filtrer les domaines d'activité en fonction du terme de recherche
    const filteredDomaines = this.listeDomaines.filter(domaine =>
      domaine.fieldname.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  
    // Utiliser les domaines d'activité filtrés pour afficher les résultats de la recherche
    // Vous pouvez les stocker dans une nouvelle variable si nécessaire
    console.log(filteredDomaines);
  }



   // Attribut pour la pagination
   articlesParPage = 6; // Nombre d'articles par page
   pageActuelle = 1; // Page actuelle



// pagination
  
getArticlesPage(): any[] {
  const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
  const indexFin = indexDebut + this.articlesParPage;
  return this.listeDomaines.slice(indexDebut, indexFin);
}
   // Méthode pour générer la liste des pages
   get pages(): number[] {
    const totalPages = Math.ceil(this.listeDomaines.length / this.articlesParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.listeDomaines.length / this.articlesParPage);
  }
  
  



}
