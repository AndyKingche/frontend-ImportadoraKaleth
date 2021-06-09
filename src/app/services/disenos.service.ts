import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { Disenos } from '../models/Disenos';

@Injectable({
  providedIn: 'root'
})
export class DisenosService {
  API_URI = 'api/desing';
  constructor(private http: HttpClient) { }

  getDisenos(){
    return this.http.get(`${this.API_URI}`);
  }

  getDiseno(id: number){
    return this.http.get(`${this.API_URI}/${id}`);
  }

  saveDiseno(diseno: Disenos): Observable<Disenos>{
    return this.http.post(`${this.API_URI}`,diseno)
  }

  updateDiseno(id: number, diseno: Disenos):Observable<Disenos>{
    return this.http.put(`${this.API_URI}/${id}`, diseno);
  }

  deleteDiseno(id: number){
    return this.http.delete(`${this.API_URI}/${id}`);
  }
}
