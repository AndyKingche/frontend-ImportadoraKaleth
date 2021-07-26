import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clientes } from '../models/Clientes';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  // API_URI = 'api/client';
  URL= environment.url+'api/client';
  constructor(private http: HttpClient) { }

  getClientes() {
    // return this.http.get(`${this.API_URI}`);
    return this.http.get(`${this.URL}`);
  }

  getCliente(id: number) {
    // return this.http.get(`${this.API_URI}/${id}`);
    return this.http.get(`${this.URL}/${id}`);

  }

  saveCliente(client: Clientes): Observable<Clientes> {
    // return this.http.post(`${this.API_URI}`, client);
    return this.http.post(`${this.URL}`, client);
  }

  updateCliente(id: number, client: Clientes): Observable<Clientes> {
    // return this.http.put(`${this.API_URI}/${id}`, client)
    return this.http.put(`${this.URL}/${id}`, client)
  }

  deleteCliente(id: number) {
    // return this.http.delete(`${this.API_URI}/${id}`)
    return this.http.delete(`${this.URL}/${id}`)
  }
  getClienteByCedula(cedulaClient: string) {
    // return this.http.get(`${this.API_URI}/findcedula/${cedulaClient}`);
    return this.http.get(`${this.URL}/findcedula/${cedulaClient}`);
  }
  generatePDFCliente(){

    // return this.http.get(`${this.API_URI}/pdfCliente`)
    return this.http.get(`${this.URL}/pdfCliente`)
  }
  verPDF(){
    // return this.http.get(`${this.API_URI}/viewPDF`);
    return this.http.get(`${this.URL}/viewPDF`);
  }

}
