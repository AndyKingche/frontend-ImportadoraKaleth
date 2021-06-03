import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuarios } from '../models/Usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  API_URI = 'api/user';

  constructor(private http: HttpClient) { }

  getUsuarios(){
    return this.http.get(`${this.API_URI}`);
  }

  getUsuario(id: string){
    return this.http.get(`${this.API_URI}/${id}`);

  }

  saveUsuario(usuarios: Usuarios):Observable<Usuarios>{

    return this.http.post(`${this.API_URI}`,usuarios);
  }

  updateUsuario(id:string, usuarios: Usuarios):Observable<Usuarios>{
    return this.http.put(`${this.API_URI}/${id}`,usuarios);
  }

  deleteUsuario(id:string){
    return this.http.delete(`${this.API_URI}/${id}`);
  }


}
