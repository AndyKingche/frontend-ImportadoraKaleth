import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  API_URI = 'api/order'; 
  constructor(private http: HttpClient) { 
    // saveOrder(factura: VenCabezaFactura): Observable<VenCabezaFactura> {
    //   return this.http.post(`${this.API_URI}`, factura);
    // }
  }
}
