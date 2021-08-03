import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuarios } from '../models/Usuarios';
//import { login } from '../models/login';
import { environment } from '../../environments/environment.prod';
//import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  // API_URI = 'api/user';
  URL=environment.url+'api/user';
  UrlLogin = environment.url;
  constructor(private http: HttpClient) { }

  getUsuarios(){
    // return this.http.get(`${this.API_URI}`);
    let x = sessionStorage.getItem("token");
    console.log(x)
    
    return this.http.get(`${this.URL}`,{headers:{
      Authorization:`Bearer ${x}`
          }});
  }
  getUsers(consulta:any){
    // return this.http.get(`${this.API_URI}`);
  //   new HttpHeaders()
  //  .set('Access-Control-Allow-Origin','*')
  //  .set('Authorization',  `Bearer ${consulta}`)
  //  .set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
  //  .set('Content-type','application/json')

  

  //sessionStorage.removeItem("token");
  // localStorage.removeItem("currentUser")
    return this.http.get(`${this.URL}`,{headers:{
Authorization:`Bearer ${consulta}`
    }});
    
  }


  getUsuario(id: number){
    // return this.http.get(`${this.API_URI}/${id}`);
    return this.http.get(`${this.URL}/${id}`);

  }

  saveUsuario(usuarios: Usuarios):Observable<Usuarios>{

    // return this.http.post(`${this.API_URI}`,usuarios);
    return this.http.post(`${this.URL}`,usuarios);
  }

  updateUsuario(id:number, usuarios: Usuarios):Observable<Usuarios>{
    // return this.http.put(`${this.API_URI}/${id}`,usuarios);
    return this.http.put(`${this.URL}/${id}`,usuarios);
  }

  deleteUsuario(id:number){
    // return this.http.delete(`${this.API_URI}/${id}`);
    return this.http.delete(`${this.URL}/${id}`);
  }

  loginUser(login:any):Observable<Usuarios>{

    return this.http.post(`${this.UrlLogin}authenticate`,login)
  }
  setToken(token: string) {
    //this.cookies.set("token", token);
  }
  getToken() {
   // return this.cookies.get("token");
   return localStorage.getItem("token")
  }

}
