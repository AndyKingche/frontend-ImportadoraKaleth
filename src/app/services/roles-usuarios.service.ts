import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rolusuarios } from '../models/Rolusuarios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesUsuariosService {
  API_URI ='api/rol-user'
  constructor(private http: HttpClient ) { }

  getRolusuarios(){
    return this.http.get(`${this.API_URI}`)
  }

  getRolusuario(id: number){
    return this.http.get(`${this.API_URI}/${id}`);
  }

  saveRolusuario(rolusuario: Rolusuarios): Observable<Rolusuarios>{
    return this.http.post(`${this.API_URI}`,rolusuario);

  }
  updateRolusaurio(id:number, rolusuario: Rolusuarios):Observable<Rolusuarios>{
    return this.http.put(`${this.API_URI}/${id}`,rolusuario);
  }

  deleteRolusuario(id:number){
    return this.http.delete(`${this.API_URI}/${id}`);
  }
}
