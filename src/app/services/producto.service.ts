import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Productos } from '../models/Productos';
import { Productosnew } from '../models/Productosnew';
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

  getProducto(id: string){
    return this.http.get(`${this.API_URI}/${id}`);
  }

  saveProducto(producto: Productosnew): Observable<Productosnew>{
    return this.http.post(`${this.API_URI}`,producto);

  }
  updateProducto(id:string, producto: Productosnew):Observable<Productosnew>{
    return this.http.put(`${this.API_URI}/${id}`,producto);
  }

  deleteProducto(id:string){
    return this.http.delete(`${this.API_URI}/${id}`);
  }
}
