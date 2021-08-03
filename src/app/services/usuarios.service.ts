import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuarios } from '../models/Usuarios';
//import { login } from '../models/login';
import { environment } from '../../environments/environment.prod';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  // API_URI = 'api/user';
  URL=environment.url+'api/user';
  UrlLogin = environment.url;
  
  constructor(private http: HttpClient,private cookies: CookieService) { }

  getUsuarios(){
   
    return this.http.get(`${this.URL}`);
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
  setToken(tokensito: any) {
    console.log(tokensito)
    this.cookies.set('token',tokensito);     
  }
  getToken() {
   // return this.cookies.get("token");
   return this.cookies.get("token")
  }

  getUserLogged(){
    let token = this.getToken();
console.log(token);
try {
  return this.http.get(`${this.URL}/finduserlogged/${token}`);
  
} catch (error) {
  console.log("Usuario logeado no encontrado")
}

  }

  getUserByEmail(email:string){
    
    return this.http.get(`${this.URL}/findemail/${email}`);
    
  }

  updateUserLogged(token:string,id_usuario:number){
    return this.http.get(`${this.URL}/updateuserlogged/${token}/${id_usuario}`);
  }
  

}
