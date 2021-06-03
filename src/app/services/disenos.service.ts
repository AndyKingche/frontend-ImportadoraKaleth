import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { Disenos } from '../models/Diseno';

@Injectable({
  providedIn: 'root'
})
export class DisenosService {
  API_URI = 'api/design';
  constructor(private http: HttpClient) { }

  getDisenos(){
    return this.http.get(`${this.API_URI}`);
  }

  getDiseno(id: string){
    return this.http.get(`${this.API_URI}/${id}`);
  }

  saveDiseno(diseno: Disenos): Observable<Disenos>{
    return this.http.post(`${this.API_URI}`,diseno)
  }

  updateDiseno(id: string, diseno: Disenos):Observable<Disenos>{
    return this.http.put(`${this.API_URI}/${id}`, diseno);
  }

  deleteDiseno(id: string){
    return this.http.delete(`${this.API_URI}/${id}`);
  }
}
