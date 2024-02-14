import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceLoginService } from 'src/app/services/service-login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})
export class SidebarAdminComponent implements OnInit {
  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private loginService: ServiceLoginService,
    private router: Router,
    
    ) { }

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = '../../../assets/js/script.js';
    document.body.appendChild(script);
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

  Alert(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }



}