import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado_Civl }from '../models/Estado_Civil';
@Injectable({
  providedIn: 'root'
})
export class EstadoCivilService {
  API_URI = 'api/civil-status'

  constructor( private http: HttpClient) { }

  getEstadociviles(){
    return this.http.get(`${this.API_URI}`);
  }
  
  getEstadocivil(id:number){
    return this.http.get(`${this.API_URI}/${id}`);

  }

  saveEstadocivil(estado_civil:Estado_Civl):Observable<Estado_Civl>{
    return this.http.post(`${this.API_URI}`,estado_civil);
  }

  updateEstadocivil(id:number, estado_civil:Estado_Civl):Observable<Estado_Civl>{
    return this.http.put(`${this.API_URI}/${id}`,estado_civil)
  }

  deleteEsatdocivil(id:number){
    return this.http.delete(`${this.API_URI}/${id}`)
  }
}
