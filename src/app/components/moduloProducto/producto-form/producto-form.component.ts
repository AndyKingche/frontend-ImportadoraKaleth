import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
//Productos
import { Productos } from '../../../models/catProducto';
import { ProductoService } from '../../../services/producto.service'; 
//Tallas
import { Tallas } from '../../../models/catTalla';
import { MedidaService } from '../../../services/medida.service';
//Disenos
import { Disenos } from '../../../models/catDiseno';
import { DisenosService } from '../../../services/disenos.service';
// categoria 
import { Categorias } from '../../../models/catCategoria';
import { CategoriaService } from '../../../services/categoria.service';

import { NotificacionService } from '../../../services/notificacion.service';

declare let $: any;

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  //categorias
  categoria: Categorias;
  categoriaEscogida: any = [];
//diesnos
disenos: Disenos;
disenosEscogida: any = [];
 //tallas
 tallas: Tallas;
 tallasEscogida: any = [];

  productos: Productos ={

    catCategoria:{idCategoria:0},
    catTalla:{idTallas:0},
    catDiseno:{idDisenos:0}
  }
  productosEscogidos: any [];
  edit: boolean = false;
  constructor(private productoservices: ProductoService, 
    private categoriaservices: CategoriaService,
    private diesnosservice: DisenosService,
    private medidaservice: MedidaService,
    private activedrouter: ActivatedRoute, private router : Router,
    private notificacion: NotificacionService) { }

  ngOnInit() {
    const params = this.activedrouter.snapshot.params;

    if(params.id){
      this.productoservices.getProducto(params.id).subscribe(
        res=>{
          if(res!= null){
            console.log(res);
            this.productos = res;
            this.medidaservice.getTalla(this.productos.catTalla.idTallas).subscribe(
              res=>{
                this.tallasEscogida = res;
                $('#tallas').select2(
                  {
                    placeholder:this.tallasEscogida.medida,
                    allowClear: true
    
                  }
                );
              },error => console.error(error)
            );
            this.categoriaservices.getCategoria(this.productos.catCategoria.idCategoria).subscribe(
              res=>{
                this.categoriaEscogida = res;
                $('#categorias').select2({
                  placeholder:this.categoriaEscogida.nombreCategoria,
                  allowClear:true
                });
              },
              error => console.error(error)
              );

              this.diesnosservice.getDiseno(this.productos.catDiseno.idDisenos).subscribe(
                res=>{
                  this.disenosEscogida = res;
                  $('#disenos').select2({
                    placeholder:this.disenosEscogida.nombre,
                    allowClear:true
                  });
                },
                error => console.error(error)
                );

            this.edit = true;

          }else{
            this.router.navigate(['/product']);
          }
          
        },
        err => console.log("hay error "+ err)
      )
    }
    this.getTallas();
    $('#tallas').select2(
      {
        placeholder:'Tallas...',
        allowClear: true

      }
    );
    this.getCategorias();
    $('#categorias').select2(
      {
        placeholder: 'Categorias...',
        allowClear: true

      }
    );

    this.getDisenos();
    $('#disenos').select2(
      {
        placeholder: 'Disenos...',
        allowClear: true

      }
    );
  }

  saveProductos(){
    if(this.testingreso()){
      console.log("los productos son",this.productos)
      this.productoservices.saveProducto(this.productos).subscribe(
        res=>{
          setTimeout(()=>{
            this.notificacion.showSuccess('El Producto se agrego correctamente','Producto agregado');
          },200);
          this.router.navigate(['/product'])
          
        },error => console.error(error)
      );

    }else{
      console.log("no se pudo")
    }
  }

  updateProductos(){
    
    if(this.productos.catCategoria.idCategoria &&
      this.productos.catDiseno.idDisenos &&
      this.productos.catTalla.idTallas ){
        this.productoservices.updateProducto(this.productos.idProductos,this.productos).subscribe(
          res => {
            setTimeout(()=>{
              this.notificacion.showSuccess('El producto se ha actualizado correctamente','Producto actualizado');
              
            },200);
            this.router.navigate(['/product'])
          },error => {console.error(error)}
        );

      }else{
        if(this.testingreso()){
          this.productoservices.updateProducto(this.productos.idProductos,this.productos).subscribe(
            res => {
              setTimeout(()=>{
                this.notificacion.showSuccess('El producto se ha actualizado correctamente','Producto actualizado');
                
              },200);
              this.router.navigate(['/product'])
            },error => {console.error(error)}
          );
        }else{
          this.notificacion.showError('Revisar si selecciono un Usuario o un Rol','** Error al Actualizar los Roles de Usuarios')
        }

      }
    }



  getTallas(){
    this.medidaservice.getTallas().subscribe(
      res=>{
        this.tallas = res;
      },error => console.error(error)
    );
  }

  getCategorias(){
    this.categoriaservices.getCategorias().subscribe(
      res=>{
        this.categoria = res;

      },error => console.error(error)
    );
  }

  getDisenos(){
    this.diesnosservice.getDisenos().subscribe(
      res=>{
        this.disenos = res;

      },error => console.error(error)
    );
  }

  testingreso(){
    let opcionTallas = this.quitarespacios('#tallas');
    let opcionCategoria = this.quitarespacios('#categorias');
    let opcionDisenos = this.quitarespacios('#disenos');
    if(opcionTallas.length>0 &&
      opcionCategoria.length>0 &&
      opcionDisenos.length>0 ){
        this.productos.catTalla.idTallas = opcionTallas;
        this.productos.catCategoria.idCategoria = opcionCategoria;
        this.productos.catDiseno.idDisenos = opcionDisenos;
        console.log(this.productos)
        return true;
      }else{
        return false;
      }
  }
  quitarespacios(atributoHTML:string){
    let obtenerletras = $(atributoHTML).val();
    return obtenerletras.trim();
  }
}
