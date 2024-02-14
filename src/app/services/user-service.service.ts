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
}
