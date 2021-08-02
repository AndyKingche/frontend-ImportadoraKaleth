import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PuntosVentas} from '../models/catPuntosVenta';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PuntosVentasService {
  // API_URI ='api/sales-points'
  URL=environment.url+'api/sales-points';

  constructor( private http: HttpClient) { }

  getPuntosVentas(){
    // return this.http.get(`${this.API_URI}`)
    return this.http.get(`${this.URL}`)
  }
  
  getPuntosVenta(id: number){
    // return this.http.get(`${this.API_URI}/${id}`);
    return this.http.get(`${this.URL}/${id}`);
  }

  savePuntosVentas(puntosventas: PuntosVentas): Observable<PuntosVentas>{
    // return this.http.post(`${this.API_URI}`,puntosventas);
    return this.http.post(`${this.URL}`,puntosventas);

  }
  updatePuntosVentas(id:number, puntosventas: PuntosVentas):Observable<PuntosVentas>{
    // return this.http.put(`${this.API_URI}/${id}`,puntosventas);
    return this.http.put(`${this.URL}/${id}`,puntosventas);
  }

  deletePuntosVentas(id:number){
    // return this.http.delete(`${this.API_URI}/${id}`);
    return this.http.delete(`${this.URL}/${id}`);
  }
}
