import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './url';
import { DomaineActivite } from 'src/app/models/DomaineActivite';

@Injectable({
  providedIn: 'root'
})
export class ServiceDomainesService {

  constructor(private http:HttpClient) { }

  ajoutDomaine(data:any){
    return this.http.post(`${baseUrl}/addfield`,data)
  }

  listerDomaine(){
    return this.http.get (`${baseUrl}/displayfield`);
  }


  updateDomaine(domaine: number, data: any) {
    const url = `${baseUrl}/updatespecificfield/${domaine}`;
    return this.http.put<DomaineActivite>(url, data);
  }

  
 

  sendMessage(data: any){
    return this.http.post(`${baseUrl}/sendmessage`, data);
  }

// REPONSE

sendReponse(data: any){
  return this.http.post(`${baseUrl}/sendreply`, data);
}


}





