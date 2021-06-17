import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PuntosVentas} from '../models/catPuntosVenta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuntosVentasService {
  API_URI ='api/sales-points'


  constructor( private http: HttpClient) { }

  getPuntosVentas(){
    return this.http.get(`${this.API_URI}`)
  }
  
  getPuntosVenta(id: number){
    return this.http.get(`${this.API_URI}/${id}`);
  }

  savePuntosVentas(puntosventas: PuntosVentas): Observable<PuntosVentas>{
    return this.http.post(`${this.API_URI}`,puntosventas);

  }
  updatePuntosVentas(id:number, puntosventas: PuntosVentas):Observable<PuntosVentas>{
    return this.http.put(`${this.API_URI}/${id}`,puntosventas);
  }

  deletePuntosVentas(id:number){
    return this.http.delete(`${this.API_URI}/${id}`);
  }
}
