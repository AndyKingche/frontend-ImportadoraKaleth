import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Productos } from '../models/Productos';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  API_URI ='api/products'
  constructor(private http: HttpClient ) { }

  getProductos(){
    return this.http.get(`${this.API_URI}`)
  }

  getProducto(id: number){
    return this.http.get(`${this.API_URI}/${id}`);
  }

  saveProducto(producto: Productos): Observable<Productos>{
    return this.http.post(`${this.API_URI}`,producto);

  }
  updateProducto(id:number, producto: Productos):Observable<Productos>{
    return this.http.put(`${this.API_URI}/${id}`,producto);
  }

  deleteProducto(id:number){
    return this.http.delete(`${this.API_URI}/${id}`);
  }
}
