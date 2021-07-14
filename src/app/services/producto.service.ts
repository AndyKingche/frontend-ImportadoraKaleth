import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Productos } from '../models/catProducto';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
// import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  API_URI ='api/products'
  private filePath: any;
  private downloadURL: Observable<string>;
  //storage:AngularFireStorage;
  afs: AngularFirestore;
  constructor(private http: HttpClient,
    private storage: AngularFireStorage ) { }

  getProductos(){
    return this.http.get(`${this.API_URI}`)
  }

  getProducto(id: number){
    return this.http.get(`${this.API_URI}/${id}`);
  }

  saveProducto(producto: Productos): Observable<Productos>{
    return this.http.post(`${this.API_URI}`,producto);

  }
  updateProducto(id:number, producto: Productos):Observable<Productos>{
    return this.http.put(`${this.API_URI}/${id}`,producto);
  }

  deleteProducto(id:number){
    return this.http.delete(`${this.API_URI}/${id}`);
  }

  findproductobycodigo(codigoproducto:string){
    return this.http.get(`${this.API_URI}/find/${codigoproducto}`);
  }
  findbyId(id:number){
    return this.http.get(`${this.API_URI}/findid/${id}`)
  }

  //  async uploadImage(image: any,random:string) {
  //   let nombre = image.name.split('.');
  //   let nuevoNombre = nombre[0]+random+"."+nombre[1];
  //   console.log(nuevoNombre);
  //   this.filePath = `images/${nuevoNombre}`;
  //   const fileRef = this.storage.ref(this.filePath);
  //   const task =  this.storage.upload(this.filePath, image);
   
  //   const urlImagen =  new Promise(async(resolve,reject)=>{
  //   await task.snapshotChanges().pipe(
  //     finalize(() => {
  //       fileRef.getDownloadURL().subscribe(urlImage => {
  //        this.downloadURL = urlImage;
  //        resolve(urlImage);
  //       });
  //     })
  //   ).subscribe();
  // });

  // return Promise.resolve(urlImagen);
  // }

  // async borrarImagen(url:string){

  //    this.storage.refFromURL(url).delete();
  // }
}

