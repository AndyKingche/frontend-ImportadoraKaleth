import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorias }from '../models/catCategoria';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  // API_URI='api/category';
  //URL:string='http://importadorakbackend-env.eba-37sxpzi3.us-east-2.elasticbeanstalk.com/api/category';
  //API_URI='api/category';
  URL:string = environment.url+'api/category';
  constructor(private http: HttpClient) { }

  getCategorias(){
     //return this.http.get(`${this.API_URI}`);
    // console.log("es la Url",this.URL)
     return this.http.get(`${this.URL}`);
  }
  
  getCategoria(id:number){
    //return this.http.get(`${this.API_URI}/${id}`);
     return this.http.get(`${this.URL}/${id}`);

  }



  saveCategoria(categoria:Categorias):Observable<Categorias>{
    //return this.http.post(`${this.API_URI}`,categoria);
    return this.http.post(`${this.URL}`,categoria);
  }

  updateCategoria(id:number, categoria:Categorias):Observable<Categorias>{
    //return this.http.put(`${this.API_URI}/${id}`,categoria)
    return this.http.put(`${this.URL}/${id}`,categoria)
  }

  deleteCategoria(id:number){
    //return this.http.delete(`${this.API_URI}/${id}`)
    return this.http.delete(`${this.URL}/${id}`)
  }
  findbynombre(nombre:string){
    //return this.http.get(`${this.API_URI}/find/${nombre}`);
    return this.http.get(`${this.URL}/find/${nombre}`);
  }
}
