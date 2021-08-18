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

  getOrder(){
    return this.http.get(`${this.URL}`);
  }
  getOrderbyId(id:number){
    return this.http.get(`${this.URL}/${id}`);
  }
  updateOrderByid(id:number,pedido: peCabezaPedido): Observable<peCabezaPedido>{
    return this.http.put(`${this.URL}/${id}`,pedido);
  }
  saveOrder(pedido: peCabezaPedido): Observable<peCabezaPedido> {
    // return this.http.post(`${this.API_URI}`, pedido);
    return this.http.post(`${this.URL}`, pedido);
  }

  orderreport(idCliente:number,idCabezaPedido:number){
    return this.http.get(`${this.URL}/report/${idCliente}/${idCabezaPedido}`)
  }
  deleteOrder(id:number){
    return this.http.delete(`${this.URL}/${id}`);
  }

  deleteOrder_Detalle(idCabezaPedido:number){
    return this.http.get(`${this.URL}/deletedetalle/${idCabezaPedido}`);
  }
}
