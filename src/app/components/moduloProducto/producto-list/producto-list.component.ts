import { Component, HostBinding, OnInit } from '@angular/core';
import { Productos } from '../../../models/catProducto';
import { ProductoService } from '../../../services/producto.service';
import { NotificacionService } from '../../../services/notificacion.service';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  productos :any=[];
  selectedProductos: Productos;
    constructor(private productoservices : ProductoService,
      private notificacion: NotificacionService) { }

  ngOnInit() {
    this.getProductos();
  }

  getProductos(){
    this.productoservices.getProductos().subscribe(
      res =>{
        //console.log(res)
        this.productos = res;
      },err => console.error(err)
      
    );
  }
  // borrarImagen(){
  //   this.productoservices.borrarImagen().then(res=>console.log(res));
  // }

  deleteProductos(id:number){
    this.productoservices.deleteProducto(id).subscribe(
      res=>{
        setTimeout(()=>{
          this.notificacion.showInfo('El Producto se ha eliminado correctamente ','Producto eliminaro');
        },200)
        this.getProductos();
      },error => console.error(error)
    );
  }

}
