import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { Tallas } from '../models/catTalla';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MedidaService {

  // API_URI = 'api/size';
  URL=environment.url+'api/size';
  constructor(private http: HttpClient) { }

  getTallas(){
    // return this.http.get(`${this.API_URI}`);
    return this.http.get(`${this.URL}`);
  }

  getTalla(id: number){
    // return this.http.get(`${this.API_URI}/${id}`);
    return this.http.get(`${this.URL}/${id}`);
  }

  saveTalla(talla: Tallas): Observable<Tallas>{
    // return this.http.post(`${this.API_URI}`,talla)
    return this.http.post(`${this.URL}`,talla)
  }

  updateTalla(id: number, talla: Tallas):Observable<Tallas>{
    // return this.http.put(`${this.API_URI}/${id}`, talla);
    return this.http.put(`${this.URL}/${id}`, talla);
  }

  deleteTalla(id: number){
    // return this.http.delete(`${this.API_URI}/${id}`);
    return this.http.delete(`${this.URL}/${id}`);
  }
  findbynombre(nombre:string){
    // return this.http.get(`${this.API_URI}/find/${nombre}`);
    return this.http.get(`${this.URL}/find/${nombre}`);
  }
}
