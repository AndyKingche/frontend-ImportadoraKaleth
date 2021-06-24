import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

import { VenCabezaFactura } from '../models/VenCabezaFactura'
import { VenDetalleFact } from '../models/VenDetalleFact'


@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  constructor(private http: HttpClient) { }

  API_URI = 'api/bill'; 

  saveFactura(factura: VenCabezaFactura): Observable<VenCabezaFactura> {
    return this.http.post(`${this.API_URI}`, factura);
  }

}
