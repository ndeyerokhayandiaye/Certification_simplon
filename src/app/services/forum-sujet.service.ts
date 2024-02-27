import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl} from './url';
import { Observable } from 'rxjs/internal/Observable';
import { Sujet } from '../models/Sujet';

@Injectable({
  providedIn: 'root'
})
export class ForumSujetService {


  constructor(private http: HttpClient) { }

  getAllSujets() {
    return this.http.get(`${baseUrl}/displaytopic`);
  }

  getSujetByID(id: number): Observable<Sujet> {
    return this.http.get<Sujet>(`${baseUrl}/displayspecifictopic/${id}`);
  }

  getMessageByID(id: number): Observable<Sujet> {
    return this.http.get<Sujet>(`${baseUrl}/displayrepliesformessage/${id}`);
  }

  getSujetByDomain(id: number): Observable<Sujet> {
    return this.http.get<Sujet>(`${baseUrl}/displaytopicbydomain/${id}`);
  }

  // getSujetByDomain(id: number): Observable<Sujet> {
  //   return this.http.get<Sujet>(`${baseUrl}/displayspecifictopic/${id}`);
  // }
 
  createSujet(data: any){
    return this.http.post(`${baseUrl}/addtopic`, data);
  }

  updateSujet(id: number, Sujet: Sujet): Observable<Sujet> {
    return this.http.put<Sujet>(`${baseUrl}/topic/${id}`, Sujet);
  }

  deleteSujet(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/deletespecifictopic/${id}`);
  }

  getResponse(id: number): Observable<Sujet> {
    return this.http.get<Sujet>(`${baseUrl}/displayreply/${id}`);
  }

  listerReponse(){
    return this.http.get(`${baseUrl}/displayreply`);
  }
 

  // editerSujet(sujet: any) {
  //   const url = `${baseUrl}/${sujet.id}`;
  //   return this.http.put<any>(`${baseUrl}/updatespecifictopic`, sujet); // 
  // }

  // supprimerSujet(sujet: any) {
  //   const url = `${baseUrl}/${sujet.id}`;
  //   return this.http.delete<any>(`${baseUrl}/deletespecifictopic`); // Effectuer une requête DELETE pour supprimer un sujet
  // }

}
