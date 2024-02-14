import { Injectable } from '@angular/core';
import { baseUrl } from './url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http : HttpClient) { }

  getProfile() : Observable<any>{
    return this.http.get<any>(`${baseUrl}/profile`);
  }
  updateProfile (user : any) : Observable<any>{
    return this.http.put<any>(`${baseUrl}/updateprofile`,user)
  }

}
