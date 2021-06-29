import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { peCabezaPedido } from '../models/peCabezaPedido';
@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  API_URI = 'api/order'; 
  constructor(private http: HttpClient) {   
  }

  saveOrder(pedido: peCabezaPedido): Observable<peCabezaPedido> {
    return this.http.post(`${this.API_URI}`, pedido);
  }
}
