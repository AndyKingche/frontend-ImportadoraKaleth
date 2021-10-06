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
  facturafechasLocales(fechainicio:string,fechafin:string,idPuntosVenta:number){
    // return this.http.get(`${this.API_URI}/dates/${fechainicio}/${fechafin}`);
    return this.http.get(`${this.URL}/datesLocal/${fechainicio}/${fechafin}/${idPuntosVenta}`);
  }
  reporteFacturaFechas(fechaDesde:string,fechaHasta:string,totalVentas:string){
    return this.http.get(`${this.URL}/reporteFecha/${fechaDesde}/${fechaHasta}/${totalVentas}`)
  }
  reporteFacturaFechasLocal(fechaDesde:string,fechaHasta:string,totalVentas:string,idPuntosVenta:number){
    return this.http.get(`${this.URL}/reporteFechaLocal/${fechaDesde}/${fechaHasta}/${totalVentas}/${idPuntosVenta}`)
  }
  ticket(idfactura:number){
    return this.http.get(`${this.URL}/ticket/${idfactura}`)
  }
  reporteFcturaFechasLocal(fechaDesde:string,fechaHasta:string,idPuntosVenta:number){
    return this.http.get(`${this.URL}/reporteFechaLocal/${fechaDesde}/${fechaHasta}/${idPuntosVenta}`);
  }

  facturaId(idfactura:number){
    return this.http.get(`${this.URL}/${idfactura}`)
  }

  updateFactura(idfactura:number, factura: VenCabezaFactura):Observable<VenCabezaFactura>{
    return this.http.put(`${this.URL}/${idfactura}`,factura)
  }

}
