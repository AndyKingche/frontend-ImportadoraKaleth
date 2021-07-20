import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cat_stock } from '../models/cat_stock';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class CatStockService {
  API_URI = 'api/stock'

  constructor(private http: HttpClient) { }

  getStocks() {
    return this.http.get(`${this.API_URI}`)
  }

  getStock(id: number) {
    return this.http.get(`${this.API_URI}/${id}`);
  }

  saveStock(stock: cat_stock): Observable<cat_stock> {
    return this.http.post(`${this.API_URI}`, stock);

  }
  updateStock(id: number, stock: cat_stock): Observable<cat_stock> {
    return this.http.put(`${this.API_URI}/${id}`, stock);
  }

  getEncontrarStock(idProducto: number, idPuntosVenta: number) {
    return this.http.get(`${this.API_URI}/number/${idProducto}/${idPuntosVenta}`)

  }

  updateStockCantidadRest(cantidad: number, idProducto: number, idPuntosVenta: number) {
    return this.http.get(`${this.API_URI}/updateRest/${idProducto}/${idPuntosVenta}/${cantidad}`);
  }

  findbyIdproductoIdpuntosVenta(id_producto: number, id_puntosventa: number) {
    return this.http.get(`${this.API_URI}/find/${id_producto}/${id_puntosventa}`);

  }
  updateStocks(cantidad: number, precioUnit: number, precioMayor: number, precioDist: number, stockMax: number, id_producto: number, stockMin: number, existe:string,id_puntosventa: number) {
    return this.http.get(`${this.API_URI}/updates/${id_producto}/${id_puntosventa}/${cantidad}/${precioUnit}/${precioMayor}/${precioDist}/${stockMax}/${stockMin}/${existe}`);
  }
  getStockProductbyCodProductoExite(codigoProducto: string, idPuntosVenta: number) {
    return this.http.get(`${this.API_URI}/product/${codigoProducto}/${idPuntosVenta}`);
  }

  getAllStockExistents(inicio: number, numeroFilas: number) {
    return this.http.get(`${this.API_URI}/exist/${inicio}/${numeroFilas}`);
  }
  getStockAllExistPuntoVenta(id:number,inicio: number, numeroFilas: number){
    return this.http.get(`${this.API_URI}/exist/${id}/${inicio}/${numeroFilas}`);
  }
  getCantExistents() {
    return this.http.get(`${this.API_URI}/cant`);
  }
  findStockInventario(){
    return this.http.get(`${this.API_URI}/findInventario`);
  }
  findStockInventarioPuntoVenta(id:number){
    return this.http.get(`${this.API_URI}/findInventario/${id}`);
  }
  findStockbyMin(){
    return this.http.get(`${this.API_URI}/findMin`);
  }
  findStockbyMinPuntoVenta(id:number){
    return this.http.get(`${this.API_URI}/findMin/${id}`)
  }
  findStockbyParameters(parametros:string){
    return this.http.get(`${this.API_URI}/findparameteros/${parametros}`)
  }
  findStockbyParametersPuntoVenta(id:number,parametros:string){
    return this.http.get(`${this.API_URI}/findparameterospuntosventa/${parametros}/${id}`)
  }
}
