import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorias }from '../models/Categorias';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  API_URI='api/category';
  constructor(private http: HttpClient) { }

  getCategorias(){
    return this.http.get(`${this.API_URI}`);
  }
  
  getCategoria(id:string){
    return this.http.get(`${this.API_URI}/${id}`);

  }



  saveCategoria(categoria:Categorias):Observable<Categorias>{
    return this.http.post(`${this.API_URI}`,categoria);
  }

  updateCategoria(id:string, categoria:Categorias):Observable<Categorias>{
    return this.http.put(`${this.API_URI}/${id}`,categoria)
  }

  deleteCategoria(id:string){
    return this.http.delete(`${this.API_URI}/${id}`)
  }
}
