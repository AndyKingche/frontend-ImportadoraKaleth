import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuarios } from '../models/Usuarios';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  // API_URI = 'api/user';
  URL=environment.url+'api/user';

  constructor(private http: HttpClient) { }

  getUsuarios(){
    // return this.http.get(`${this.API_URI}`);
    return this.http.get(`${this.URL}`);
  }

  getUsuario(id: number){
    // return this.http.get(`${this.API_URI}/${id}`);
    return this.http.get(`${this.URL}/${id}`);

  }

  saveUsuario(usuarios: Usuarios):Observable<Usuarios>{

    // return this.http.post(`${this.API_URI}`,usuarios);
    return this.http.post(`${this.URL}`,usuarios);
  }

  updateUsuario(id:number, usuarios: Usuarios):Observable<Usuarios>{
    // return this.http.put(`${this.API_URI}/${id}`,usuarios);
    return this.http.put(`${this.URL}/${id}`,usuarios);
  }

  deleteUsuario(id:number){
    // return this.http.delete(`${this.API_URI}/${id}`);
    return this.http.delete(`${this.URL}/${id}`);
  }


}
