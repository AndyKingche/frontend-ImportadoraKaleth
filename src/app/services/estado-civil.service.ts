import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estadocivil }from '../models/Estadocivil';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EstadoCivilService {
  // API_URI = 'api/civil-status'
  URL=environment.url+'api/civil-status';

  constructor( private http: HttpClient) { }

  getEstadociviles(){
    // return this.http.get(`${this.API_URI}`);
    return this.http.get(`${this.URL}`);
  }
  
  getEstadocivil(id:number){
    // return this.http.get(`${this.API_URI}/${id}`);
    return this.http.get(`${this.URL}/${id}`);

  }

  saveEstadocivil(estado_civil:Estadocivil):Observable<Estadocivil>{
    // return this.http.post(`${this.API_URI}`,estado_civil);
    return this.http.post(`${this.URL}`,estado_civil);
  }

  updateEstadocivil(id:number, estado_civil:Estadocivil):Observable<Estadocivil>{
    // return this.http.put(`${this.API_URI}/${id}`,estado_civil)
    return this.http.put(`${this.URL}/${id}`,estado_civil)
  }

  deleteEsatdocivil(id:number){
    // return this.http.delete(`${this.API_URI}/${id}`)
    return this.http.delete(`${this.URL}/${id}`)
  }
}
