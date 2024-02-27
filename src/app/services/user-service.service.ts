import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from './url';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http :HttpClient) { }



  
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/getAllUsers`);
  }


  deleteuser(id: number): Observable<any> {
    return this.http.delete<any>(`${baseUrl}/deleteuser/${id}`);
  
  }

  // toggleBloquerUtilisateur(user: { id: number, is_blocked: boolean }): Observable<any> {
  //   return this.http.put<any>(`${baseUrl}/blockuser/${id}`, { id });
  // }



  toggleBloquerUtilisateur(user: { id: number, is_blocked: boolean }): Observable<any> {
    return this.http.put<any>(`${baseUrl}/blockuser/${user.id}`, { is_blocked: user.is_blocked });
  }

  toggleDebloquerUtilisateur(user: { id: number, is_blocked: boolean }): Observable<any> {
    return this.http.put<any>(`${baseUrl}/unblockuser/${user.id}`, { is_blocked: user.is_blocked });
  }


}
