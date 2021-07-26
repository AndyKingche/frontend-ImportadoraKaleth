import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { Genero } from '../models/Genero';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  // API_URI = 'api/gender'
  URL=environment.url+'api/gender';
  constructor(private http: HttpClient) { }

  getGeneros(){
    // return this.http.get(`${this.API_URI}`);
    return this.http.get(`${this.URL}`);
  }

  getGenero(id: number){
    // return this.http.get(`${this.API_URI}/${id}`);
    return this.http.get(`${this.URL}/${id}`);
  }

  saveGenero(genero: Genero): Observable<Genero>{
    // return this.http.post(`${this.API_URI}`,genero)
    return this.http.post(`${this.URL}`,genero)
  }

  updateGenero(id: number, genero: Genero):Observable<Genero>{
    // return this.http.put(`${this.API_URI}/${id}`, genero);
    return this.http.put(`${this.URL}/${id}`, genero);
  }

  deleteGenero(id: number){
    // return this.http.delete(`${this.API_URI}/${id}`);
    return this.http.delete(`${this.URL}/${id}`);
  }
}
