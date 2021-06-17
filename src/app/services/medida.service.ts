import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { Tallas } from '../models/catTalla';

@Injectable({
  providedIn: 'root'
})
export class MedidaService {

  API_URI = 'api/size';
  constructor(private http: HttpClient) { }

  getTallas(){
    return this.http.get(`${this.API_URI}`);
  }

  getTalla(id: number){
    return this.http.get(`${this.API_URI}/${id}`);
  }

  saveTalla(talla: Tallas): Observable<Tallas>{
    return this.http.post(`${this.API_URI}`,talla)
  }

  updateTalla(id: number, talla: Tallas):Observable<Tallas>{
    return this.http.put(`${this.API_URI}/${id}`, talla);
  }

  deleteTalla(id: number){
    return this.http.delete(`${this.API_URI}/${id}`);
  }
}
