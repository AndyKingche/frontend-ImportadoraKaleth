import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { peCabezaPedido } from '../models/peCabezaPedido';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  // API_URI = 'api/order'; 
  URL=environment.url+'api/order';
  constructor(private http: HttpClient) {   
  }

  saveOrder(pedido: peCabezaPedido): Observable<peCabezaPedido> {
    // return this.http.post(`${this.API_URI}`, pedido);
    return this.http.post(`${this.URL}`, pedido);
  }
}
