import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderAdminComponent } from './layout/header-admin/header-admin.component';
import { SidebarAdminComponent } from './layout/sidebar-admin/sidebar-admin.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { DomainesActivitesComponent } from './domaines-activites/domaines-activites.component';
import { GestionUtilisateursComponent } from './gestion-utilisateurs/gestion-utilisateurs.component';
import { ForumComponent } from './forum/forum.component';
import { SujetsComponent } from './sujets/sujets.component';
import { MessagesComponent } from './messages/messages.component';
import { UtilisateursBloquesComponent } from './utilisateurs-bloques/utilisateurs-bloques.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    MainComponent,
    HeaderAdminComponent,
    SidebarAdminComponent,
    StatistiqueComponent,
    DomainesActivitesComponent,
    GestionUtilisateursComponent,
    ForumComponent,
    SujetsComponent,
    MessagesComponent,
    UtilisateursBloquesComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  
  ]
})
export class AdminModule { }
