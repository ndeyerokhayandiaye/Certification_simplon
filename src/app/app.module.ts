import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConditiondutilisationComponent } from './conditiondutilisation/conditiondutilisation.component';
import { PolitiqueComponent } from './politique/politique.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { ContenuComponent } from './contenu/contenu.component';
import { SidebarAdminComponent } from './layout/sidebar-admin/sidebar-admin.component';
import { HeaderAdminComponent } from './layout/header-admin/header-admin.component';
import { ForumSujetComponent } from './forum-sujet/forum-sujet.component';
import { ForumMessageComponent } from './forum-message/forum-message.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServiceLoginService } from './services/service-login.service';
import { AuthInterceptor } from './intercepteur/intercepteur';
import { AdminModule } from './admin/admin.module';
import { ForumSujetSpecificComponent } from './forum-sujet-specific/forum-sujet-specific.component';
import { CommonModule } from '@angular/common';
import { ProfilUserComponent } from './profil-user/profil-user.component';
// import { DataTablesModule } from 'angular-datatables';
// import { DataTablesModule } from 'angular-datatables';
// import { DataTablesModule } from 'angular-datatables/src/angular-datatables.module';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    AuthentificationComponent,
    ConditiondutilisationComponent,
    PolitiqueComponent,
    SidebarComponent,
    HeaderComponent,
    ContenuComponent,
    SidebarAdminComponent,
    HeaderAdminComponent,
    ForumSujetComponent,
    ForumMessageComponent,
    ForumSujetSpecificComponent,
    ProfilUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminModule,
    CommonModule,
    // DataTablesModule,


  ],
  providers: [
    ServiceLoginService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
