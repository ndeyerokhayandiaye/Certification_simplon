import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl} from './url';
import { Forum } from '../models/modelForum';

@Injectable({
  providedIn: 'root'
})
export class ServiceForumService {

  constructor(private http:HttpClient) { }

  getAllForums(): Observable<Forum[]> {
    return this.http.get<Forum[]>(`${baseUrl}/displayforum`);
  }

  createForum(data:any){
    return this.http.post(`${baseUrl}/addforum`,data)
  }


  updateForum(id: number, forum: Forum): Observable<Forum> {
    return this.http.put<Forum>(`${baseUrl}/updatespecificforum/${id}`, forum);
  }

  deleteForum(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/deleteforum/${id}`);
  }
  
}
