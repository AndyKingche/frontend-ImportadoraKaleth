import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
//Productos
import { Productos } from '../../models/Productos';
import { ProductoService } from '../../services/producto.service'; 
//Tallas
import { Tallas } from '../../models/Tallas';
import { MedidaService } from '../../services/medida.service';
//Disenos
import { Disenos } from '../../models/Disenos';
import { DisenosService } from '../../services/disenos.service';
// categoria 
import { Categorias } from '../../models/Categorias';
import { CategoriaService } from '../../services/categoria.service';

import { NotificacionService } from '../../services/notificacion.service';

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
    categoria:{id_categoria:0},
    tallas:{id_tallas:0},
    disenos:{id_disenos:0}
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
            this.medidaservice.getTalla(this.productos.tallas.id_tallas).subscribe(
              res=>{
                this.tallasEscogida = res;
                $('#tallas').select2(
                  {
                    placeholder:this.tallasEscogida.nombre,
                    allowClear: true
    
                  }
                );
              },error => console.error(error)
            );
            this.categoriaservices.getCategoria(this.productos.categoria.id_categoria).subscribe(
              res=>{
                this.categoriaEscogida = res;
                $('#categorias').select2({
                  placeholder:this.categoriaEscogida.nombre,
                  allowClear:true
                });
              },
              error => console.error(error)
              );

              this.diesnosservice.getDiseno(this.productos.disenos.id_disenos).subscribe(
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
    
    if(this.productos.categoria.id_categoria &&
      this.productos.disenos.id_disenos &&
      this.productos.tallas.id_tallas ){
        this.productoservices.updateProducto(this.productos.id_productos,this.productos).subscribe(
          res => {
            setTimeout(()=>{
              this.notificacion.showSuccess('El producto se ha actualizado correctamente','Producto actualizado');
              
            },200);
            this.router.navigate(['/product'])
          },error => {console.error(error)}
        );

      }else{
        if(this.testingreso()){
          this.productoservices.updateProducto(this.productos.id_productos,this.productos).subscribe(
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
        this.productos.tallas.id_tallas = opcionTallas;
        this.productos.categoria.id_categoria = opcionCategoria;
        this.productos.disenos.id_disenos = opcionDisenos;
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
