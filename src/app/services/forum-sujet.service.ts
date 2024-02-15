import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl} from './url';
import { Observable } from 'rxjs/internal/Observable';
import { Sujet } from '../models/Sujet';

@Injectable({
  providedIn: 'root'
})
export class ForumSujetService {


  constructor(private http:HttpClient) { }

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








  // getTopics(): Observable<Topic[]> {
  //   return this.http.get<Topic[]>(`${baseUrl}/displaytopic`);
  // }

  // createTopic(topicData: Topic): Observable<Topic> {
  //   return this.http.post<Topic>(this.apiUrl, topicData);
  // }

  // updateTopic(topicId: number, updatedContent: string): Observable<Topic> {
  //   const url = `${this.apiUrl}/${topicId}`;
  //   const data = { content: updatedContent };
  //   return this.http.put<Topic>(url, data);
  // }

  // deleteTopic(topicId: number): Observable<any> {
  //   const url = `${this.apiUrl}/${topicId}`;
  //   return this.http.delete(url);
  // }




  // getSujets() {
  //   return this.http.get<any[]>(`${baseUrl}/displaytopic`); // Effectuer une requête GET vers l'API pour obtenir les sujets
  // }

  // ajoutSujet(nouveauSujet: any) {
  //   return this.http.post<any>(`${baseUrl}/addtopic`, nouveauSujet); // Effectuer une requête POST pour ajouter un nouveau sujet
  // }

  // editerSujet(sujet: any) {
  //   const url = `${baseUrl}/${sujet.id}`;
  //   return this.http.put<any>(`${baseUrl}/updatespecifictopic`, sujet); // Effectuer une requête PUT pour mettre à jour un sujet existant
  // }

  // supprimerSujet(sujet: any) {
  //   const url = `${baseUrl}/${sujet.id}`;
  //   return this.http.delete<any>(`${baseUrl}/deletespecifictopic`); // Effectuer une requête DELETE pour supprimer un sujet
  // }

}
