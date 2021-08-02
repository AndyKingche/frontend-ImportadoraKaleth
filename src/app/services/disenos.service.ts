import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { Disenos } from '../models/catDiseno';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DisenosService {
  // API_URI = 'api/desing';
  URL=environment.url+'api/desing';
  private filePath: any;
  private downloadURL: Observable<string>;
  //storage:AngularFireStorage;
  afs: AngularFirestore;
  constructor(private http: HttpClient,private storage: AngularFireStorage) { }

  getDisenos(){
    // return this.http.get(`${this.API_URI}`);
    return this.http.get(`${this.URL}`);
  }

  getDiseno(id: number){
    // return this.http.get(`${this.API_URI}/${id}`);
    return this.http.get(`${this.URL}/${id}`);
  }

  saveDiseno(diseno: Disenos): Observable<Disenos>{
    // return this.http.post(`${this.API_URI}`,diseno)
    return this.http.post(`${this.URL}`,diseno)
  }

  updateDiseno(id: number, diseno: Disenos):Observable<Disenos>{
    // return this.http.put(`${this.API_URI}/${id}`, diseno);
    return this.http.put(`${this.URL}/${id}`, diseno);
  }

  deleteDiseno(id: number){
    // return this.http.delete(`${this.API_URI}/${id}`);
    return this.http.delete(`${this.URL}/${id}`);
  }
  findbynombre(nombre:string){
    // return this.http.get(`${this.API_URI}/find/${nombre}`);
    return this.http.get(`${this.URL}/find/${nombre}`);
  }

  async uploadImage(image: any,random:string) {
    let nombre = image.name.split('.');
    let nuevoNombre = nombre[0]+random+"."+nombre[1];
    console.log(nuevoNombre);
    this.filePath = `images/${nuevoNombre}`;
    const fileRef = this.storage.ref(this.filePath);
    const task =  this.storage.upload(this.filePath, image);
   
    const urlImagen =  new Promise(async(resolve,reject)=>{
    await task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(urlImage => {
         this.downloadURL = urlImage;
         resolve(urlImage);
        });
      })
    ).subscribe();
  });

  return Promise.resolve(urlImagen);
  }

  async borrarImagen(url:string){

     this.storage.refFromURL(url).delete();
  }
}
