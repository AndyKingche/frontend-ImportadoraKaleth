import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuarios } from '../models/Usuarios';
//import { login } from '../models/login';
import { environment } from '../../environments/environment.prod';
import { CookieService } from "ngx-cookie-service";

import { auth } from 'firebase/app'

import { User } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { stringify } from '@angular/compiler/src/util';
@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  // API_URI = 'api/user';
  URL=environment.url+'api/user';
  UrlLogin = environment.url;
  user:User;
  constructor(private http: HttpClient,private cookies: CookieService,
    private afAuth:AngularFireAuth) { }

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
register(email:string,password:string){
  return firebase.auth().createUserWithEmailAndPassword(email,password).then(res=>res);
}
  logIn(){
   const result = firebase.auth().signInWithPopup(new auth.GoogleAuthProvider())
  
   return result;
    
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
  deleteToken(){
    return this.cookies.deleteAll();
  }

  getUserLogged(){
    let token = this.getToken();
console.log(token);
try {
  if(token){

    return this.http.get(`${this.URL}/finduserlogged/${token}`);
  }else{
    return null;
  }
  
} catch (error) {
  console.log("Usuario logeado no encontrado")
}

  }

  usuarioSINo(token:string){
    return this.http.get(`${this.URL}/finduserlogged/${token}`);
  }

  getUserByEmail(email:string){
    
    return this.http.get(`${this.URL}/findemail/${email}`);
    
  }

  updateUserLogged(token:string,id_usuario:number){
    return this.http.get(`${this.URL}/updateuserlogged/${token}/${id_usuario}`);
  }
  

  logOut(){
    firebase.auth().signOut()
  }

  registerUserClient(usuarios: Usuarios):Observable<Usuarios>{
    return this.http.post(`${this.URL}/client/register`,usuarios)
  }
  updateResetPassword(password:string,email:string){
  return this.http.get(`${this.URL}/resetuserpassword/${password}/${email}`);
  }
  

}
