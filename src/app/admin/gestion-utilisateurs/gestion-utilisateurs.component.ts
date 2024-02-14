import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-gestion-utilisateurs',
  templateUrl: './gestion-utilisateurs.component.html',
  styleUrls: ['./gestion-utilisateurs.component.css']
})
export class GestionUtilisateursComponent implements OnInit {
  users: any[]; // Tableau pour stocker les utilisateurs

  constructor(private userService:UserServiceService) { }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }
}
