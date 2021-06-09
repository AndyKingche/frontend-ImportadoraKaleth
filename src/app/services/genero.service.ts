import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { Genero } from '../models/Genero';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  API_URI = 'api/gender'
  constructor(private http: HttpClient) { }

  getGeneros(){
    return this.http.get(`${this.API_URI}`);
  }

  getGenero(id: number){
    return this.http.get(`${this.API_URI}/${id}`);
  }

  saveGenero(genero: Genero): Observable<Genero>{
    return this.http.post(`${this.API_URI}`,genero)
  }

  updateGenero(id: number, genero: Genero):Observable<Genero>{
    return this.http.put(`${this.API_URI}/${id}`, genero);
  }

  deleteGenero(id: number){
    return this.http.delete(`${this.API_URI}/${id}`);
  }
}
