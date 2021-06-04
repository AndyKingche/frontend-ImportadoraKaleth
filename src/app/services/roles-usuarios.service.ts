import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rolusuarios } from '../models/Rolusuarios';
import { Rolusuariosnew } from '../models/Rolusuariosnew';
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

  getRolusuario(id: string){
    return this.http.get(`${this.API_URI}/${id}`);
  }

  saveRolusuario(rolusuario: Rolusuariosnew): Observable<Rolusuariosnew>{
    return this.http.post(`${this.API_URI}`,rolusuario);

  }
  updateRolusaurio(id:string, rolusuario: Rolusuariosnew):Observable<Rolusuariosnew>{
    return this.http.put(`${this.API_URI}/${id}`,rolusuario);
  }

  deleteRolusuario(id:string){
    return this.http.delete(`${this.API_URI}/${id}`);
  }
}
