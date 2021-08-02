import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Roles } from '../models/Roles';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  // API_URI = 'api/roles'
  URL=environment.url+'api/roles';
  constructor(private http : HttpClient) { }

  getRoles(){
    // return this.http.get(`${this.API_URI}`);
    return this.http.get(`${this.URL}`);
  }

  getRol(id:number){
    // return this.http.get(`${this.API_URI}/${id}`)
    return this.http.get(`${this.URL}/${id}`)
  }

  saveRoles(roles: Roles): Observable<Roles>{
    // return this.http.post(`${this.API_URI}`,roles);
    return this.http.post(`${this.URL}`,roles);
  }

  updateRoles(id:number,roles:Roles):Observable<Roles>{
    // return this.http.put(`${this.API_URI}/${id}`,roles);
    return this.http.put(`${this.URL}/${id}`,roles);
  }

  deleteRoles(id:number){
    // return this.http.delete(`${this.API_URI}/${id}`);
    return this.http.delete(`${this.URL}/${id}`);
  }

}
