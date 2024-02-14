import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { baseUrl } from './url';
// import { pipe, tap } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {
 
 
  errorMessage: any;
  router: any;

  constructor(private http: HttpClient) {}

  checkUserExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${baseUrl}/userExists/` + email);
    // return this.http.get<boolean>('http://127.0.0.1:8000/api/userExists/' + email);
  }



  login(info:any) {
    // Envoyer la requête de connexion à l'API et intercepte les message d'erreure s'ils exitent

    return this.http.post<any>(`${baseUrl}/login`, info)
    
    
  }


  register(prenom: string, nom: string, email: string, password: string, confirmPassword: string) {
    const infoInscription = {
      firstname: prenom,
      lastname: nom,
      email: email,
      password: password,
      password_confirmation: confirmPassword
    };
    console.log(infoInscription);

    // Envoyer la requête d'inscription à l'API

    return this.http.post<any>(`${baseUrl}/register`, infoInscription);
  }

  logout() {
  
    // Envoyer la requête de déconnexion à l'API
    return this.http.post<any>(`${baseUrl}/logout`, null);
  }

  

  isLoggedIn() {
    // Vérifier si l'utilisateur est connecté en vérifiant la présence du token dans le localStorage
    const token = localStorage.getItem('token');
    return !!token;
  }

  getCurrentUser() {
    // Récupérer les informations de l'utilisateur à partir du localStorage
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }



}




