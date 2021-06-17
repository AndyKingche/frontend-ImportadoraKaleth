import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cat_stock } from '../models/cat_stock';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatStockService {
  API_URI='api/stock'

  constructor(private http:HttpClient) { }

  getStocks(){
    return this.http.get(`${this.API_URI}`)
  }

  getStock(id: number){
    return this.http.get(`${this.API_URI}/${id}`);
  }

  saveStock(stock: cat_stock): Observable<cat_stock>{
    return this.http.post(`${this.API_URI}`,stock);

  }
  updateStock(id:number, stock: cat_stock):Observable<cat_stock>{
    return this.http.put(`${this.API_URI}/${id}`,stock);
  }

  
}
