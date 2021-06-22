import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clientes } from '../models/Clientes';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  API_URI = 'api/client';
  constructor(private http: HttpClient) { }

  getClientes() {
    return this.http.get(`${this.API_URI}`);
  }

  getCliente(id: number) {
    return this.http.get(`${this.API_URI}/${id}`);

  }

  saveCliente(client: Clientes): Observable<Clientes> {
    return this.http.post(`${this.API_URI}`, client);
  }

  updateCliente(id: number, client: Clientes): Observable<Clientes> {
    return this.http.put(`${this.API_URI}/${id}`, client)
  }

  deleteCliente(id: number) {
    return this.http.delete(`${this.API_URI}/${id}`)
  }
  getClienteByCedula(cedulaClient: string) {
    return this.http.get(`${this.API_URI}/findcedula/${cedulaClient}`);
  }

}
