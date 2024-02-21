import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ConditiondutilisationComponent } from './conditiondutilisation/conditiondutilisation.component';
import { PolitiqueComponent } from './politique/politique.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { ForumSujetComponent } from './forum-sujet/forum-sujet.component';
import { ForumMessageComponent } from './forum-message/forum-message.component';
import { ForumSujetSpecificComponent } from './forum-sujet-specific/forum-sujet-specific.component';
import { allguardsGuard } from './guards/allguards.guard';
import { ProfilUserComponent } from './profil-user/profil-user.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'login', component: AuthentificationComponent },
  { path: 'conditionUtilisation', component: ConditiondutilisationComponent },
  { path: 'politique', component: PolitiqueComponent },
  { path: 'forumSujet', component: ForumSujetComponent, canActivate:[allguardsGuard] },
  { path: 'profilUser', component: ProfilUserComponent, canActivate:[allguardsGuard] },
  { path: 'forumMessage/:id', component: ForumMessageComponent, canActivate:[allguardsGuard]},
  { path: 'forumSujetSpecific/:id', component: ForumSujetSpecificComponent , canActivate:[allguardsGuard] },

      // partie admin
  { path: 'admin', loadChildren: () => import ('./admin/admin.module').then(m => m.AdminModule), canActivate:[allguardsGuard] },
{ path: '**', component: MaintenanceComponent},

];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
