import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rolusuarios } from '../models/Rolusuarios';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RolesUsuariosService {
  // API_URI ='api/rol-user'
  URL=environment.url+'api/rol-use';
  constructor(private http: HttpClient ) { }

  getRolusuarios(){
    // return this.http.get(`${this.API_URI}`)
    return this.http.get(`${this.URL}`)
  }

  getRolusuario(id: number){
    // return this.http.get(`${this.API_URI}/${id}`);
    return this.http.get(`${this.URL}/${id}`);
  }

  saveRolusuario(rolusuario: Rolusuarios): Observable<Rolusuarios>{
    // return this.http.post(`${this.API_URI}`,rolusuario);
    return this.http.post(`${this.URL}`,rolusuario);

  }
  updateRolusaurio(id:number, rolusuario: Rolusuarios):Observable<Rolusuarios>{
    // return this.http.put(`${this.API_URI}/${id}`,rolusuario);
    return this.http.put(`${this.URL}/${id}`,rolusuario);
  }

  deleteRolusuario(id:number){
    // return this.http.delete(`${this.API_URI}/${id}`);
    return this.http.delete(`${this.URL}/${id}`);
  }

  findusrol(idu:number,idr:number){
    // return this.http.get(`${this.API_URI}/find/${idu}/${idr}`)
    return this.http.get(`${this.URL}/find/${idu}/${idr}`)
  }
}
