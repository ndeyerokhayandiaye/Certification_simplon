import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { DomainesActivitesComponent } from './domaines-activites/domaines-activites.component';
import { GestionUtilisateursComponent } from './gestion-utilisateurs/gestion-utilisateurs.component';
import { ForumComponent } from './forum/forum.component';
import { SujetsComponent } from './sujets/sujets.component';
import { MessagesComponent } from './messages/messages.component';
import { UtilisateursBloquesComponent } from './utilisateurs-bloques/utilisateurs-bloques.component';
import { allguardsGuard } from '../guards/allguards.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: '', component: MainComponent, children: [
    { path: '', redirectTo: 'dasboard-admin', pathMatch: 'full' },
    { path: 'statistique', component: StatistiqueComponent},
    { path: 'domaineActivite', component: DomainesActivitesComponent  },
    { path: 'utilisateurs', component: GestionUtilisateursComponent },
    { path: 'forum', component: ForumComponent },
    { path: 'sujets', component: SujetsComponent },
    { path: 'messages', component: MessagesComponent },
    { path: 'utilisateursbloques', component: UtilisateursBloquesComponent },
    { path: 'profileAdmin', component: ProfileComponent },

  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
