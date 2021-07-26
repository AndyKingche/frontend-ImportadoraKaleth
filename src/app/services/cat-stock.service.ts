import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cat_stock } from '../models/cat_stock';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class CatStockService {
  //API_URI = process.env.URL+'api/stock';
  //URL='http://importadorakbackend-env.eba-37sxpzi3.us-east-2.elasticbeanstalk.com/api/stock';
  ulnueva =environment.url+'api/stock';
  constructor(private http: HttpClient) { }

  getStocks() {
    // return this.http.get(`${this.API_URI}`)
    return this.http.get(`${this.ulnueva}`)
  }

  getStock(id: number) {
    // return this.http.get(`${this.API_URI}/${id}`);
    return this.http.get(`${this.ulnueva}/${id}`);
  }

  saveStock(stock: cat_stock): Observable<cat_stock> {
    return this.http.post(`${this.ulnueva}`, stock);

  }
  updateStock(id: number, stock: cat_stock): Observable<cat_stock> {
    // return this.http.put(`${this.API_URI}/${id}`, stock);
    return this.http.put(`${this.ulnueva}/${id}`, stock);
  }

  getEncontrarStock(idProducto: number, idPuntosVenta: number) {
    // return this.http.get(`${this.API_URI}/number/${idProducto}/${idPuntosVenta}`)
    return this.http.get(`${this.ulnueva}/number/${idProducto}/${idPuntosVenta}`)

  }

  updateStockCantidadRest(cantidad: number, idProducto: number, idPuntosVenta: number) {
    // return this.http.get(`${this.API_URI}/updateRest/${idProducto}/${idPuntosVenta}/${cantidad}`);
    return this.http.get(`${this.ulnueva}/updateRest/${idProducto}/${idPuntosVenta}/${cantidad}`);
  }

  findbyIdproductoIdpuntosVenta(id_producto: number, id_puntosventa: number) {
    // return this.http.get(`${this.API_URI}/find/${id_producto}/${id_puntosventa}`);
    return this.http.get(`${this.ulnueva}/find/${id_producto}/${id_puntosventa}`);

  }
  updateStocks(cantidad: number, precioUnit: number, precioMayor: number, precioDist: number, stockMax: number, id_producto: number, stockMin: number, existe:string,id_puntosventa: number) {
    // return this.http.get(`${this.API_URI}/updates/${id_producto}/${id_puntosventa}/${cantidad}/${precioUnit}/${precioMayor}/${precioDist}/${stockMax}/${stockMin}/${existe}`);
    return this.http.get(`${this.ulnueva}/updates/${id_producto}/${id_puntosventa}/${cantidad}/${precioUnit}/${precioMayor}/${precioDist}/${stockMax}/${stockMin}/${existe}`);
  }
  getStockProductbyCodProductoExite(codigoProducto: string, idPuntosVenta: number) {
    // return this.http.get(`${this.API_URI}/product/${codigoProducto}/${idPuntosVenta}`);
    return this.http.get(`${this.ulnueva}/product/${codigoProducto}/${idPuntosVenta}`);
  }

  getAllStockExistents(inicio: number, numeroFilas: number) {
    // return this.http.get(`${this.API_URI}/exist/${inicio}/${numeroFilas}`);
    return this.http.get(`${this.ulnueva}/exist/${inicio}/${numeroFilas}`);
  }
  getStockAllExistPuntoVenta(id:number,inicio: number, numeroFilas: number){
    // return this.http.get(`${this.API_URI}/exist/${id}/${inicio}/${numeroFilas}`);
    return this.http.get(`${this.ulnueva}/exist/${id}/${inicio}/${numeroFilas}`);
  }
  getCantExistents() {
    // return this.http.get(`${this.API_URI}/cant`);
    return this.http.get(`${this.ulnueva}/cant`);
  }
  findStockInventario(){
    // return this.http.get(`${this.API_URI}/findInventario`);
    return this.http.get(`${this.ulnueva}/findInventario`);
  }
  findStockInventarioPuntoVenta(id:number){
    // return this.http.get(`${this.API_URI}/findInventario/${id}`);
    return this.http.get(`${this.ulnueva}/findInventario/${id}`);
  }
  findStockbyMin(){
    // return this.http.get(`${this.API_URI}/findMin`);
    return this.http.get(`${this.ulnueva}/findMin`);
  }
  findStockbyMinPuntoVenta(id:number){
    // return this.http.get(`${this.API_URI}/findMin/${id}`)
    return this.http.get(`${this.ulnueva}/findMin/${id}`)
  }
  findStockbyParameters(parametros:string){
    // return this.http.get(`${this.API_URI}/findparameteros/${parametros}`)
    return this.http.get(`${this.ulnueva}/findparameteros/${parametros}`)
  }
  findStockbyParametersPuntoVenta(id:number,parametros:string){
    // return this.http.get(`${this.API_URI}/findparameterospuntosventa/${parametros}/${id}`)
    return this.http.get(`${this.ulnueva}/findparameterospuntosventa/${parametros}/${id}`)
  }
}
