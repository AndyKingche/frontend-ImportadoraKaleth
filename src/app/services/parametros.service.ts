import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { CookieService } from "ngx-cookie-service";
import { Parametros } from '../models/cat_parametros';
import { auth } from 'firebase/app'

import { User } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class ParametrosService {
  URL=environment.url+'api/parameters';
  UrlLogin = environment.url;
  parametros:Parametros;
  constructor(private http: HttpClient,private cookies: CookieService,
    private afAuth:AngularFireAuth) { }

  gerParametros(){
   
    return this.http.get(`${this.URL}`);
  }

  updateParametro(id:number, parametro: Parametros):Observable<Parametros>{
    // return this.http.put(`${this.API_URI}/${id}`,usuarios);
    return this.http.put(`${this.URL}/${id}`,parametro);
  }

}
