import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

import { VenCabezaFactura } from '../models/VenCabezaFactura'
import { VenDetalleFact } from '../models/VenDetalleFact'
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  constructor(private http: HttpClient) { }

  // API_URI = 'api/bill'; 
  URL= environment.url+'api/bill';

  saveFactura(factura: VenCabezaFactura): Observable<VenCabezaFactura> {
    // return this.http.post(`${this.API_URI}`, factura);
    return this.http.post(`${this.URL}`, factura);
  }
  facturafechas(fechainicio:string,fechafin:string){
    // return this.http.get(`${this.API_URI}/dates/${fechainicio}/${fechafin}`);
    return this.http.get(`${this.URL}/dates/${fechainicio}/${fechafin}`);
  }

}
