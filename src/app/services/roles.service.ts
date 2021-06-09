import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Roles } from '../models/Roles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  API_URI = 'api/roles'
  constructor(private http : HttpClient) { }

  getRoles(){
    return this.http.get(`${this.API_URI}`);
  }

  getRol(id:number){
    return this.http.get(`${this.API_URI}/${id}`)
  }

  saveRoles(roles: Roles): Observable<Roles>{
    return this.http.post(`${this.API_URI}`,roles);
  }

  updateRoles(id:number,roles:Roles):Observable<Roles>{
    return this.http.put(`${this.API_URI}/${id}`,roles);
  }

  deleteRoles(id:number){
    return this.http.delete(`${this.API_URI}/${id}`);
  }

}
