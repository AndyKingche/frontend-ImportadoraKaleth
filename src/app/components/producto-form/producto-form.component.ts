import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
//Productos
import { Productos } from '../../models/Productos';
import { Productosnew } from '../../models/Productosnew';
import { ProductoService } from '../../services/producto.service'; 
//Tallas
import { Tallas } from '../../models/Medida';
import { MedidaService } from '../../services/medida.service';
//Disenos
import { Disenos } from '../../models/Diseno';
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
    categoria:{id:""},
    medida:{id:""},
    disenos:{id:""}
  }
  productos_new:Productosnew={
    categoria:"",
    medida:"",
    disenos:""
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
            //console.log(res);
            this.productos = res;
            this.productos_new.categoria = this.productos.categoria.id;
            this.productos_new.disenos = this.productos.disenos.id;
            this.productos_new.medida = this.productos.medida.id;
            this.medidaservice.getTalla(this.productos.medida.id).subscribe(
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
            this.categoriaservices.getCategoria(this.productos.categoria.id).subscribe(
              res=>{
                this.categoriaEscogida = res;
                $('#categorias').select2({
                  placeholder:this.categoriaEscogida.nombre,
                  allowClear:true
                });
              },
              error => console.error(error)
              );

              this.diesnosservice.getDiseno(this.productos.disenos.id).subscribe(
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
      this.productoservices.saveProducto(this.productos_new).subscribe(
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
    try {
      if(this.productos.categoria.id &&
        this.productos.disenos.id &&
        this.productos.medida.id  ){
         
          if(this.testingreso()){
            this.productoservices.updateProducto(this.productos.id,this.productos_new).subscribe(
              res => {
                setTimeout(()=>{
                  this.notificacion.showSuccess('El producto se ha actualizado correctamente','Producto actualizado');
                  
                },200);
                this.router.navigate(['/product'])
              },error => {
                console.error("Error")
            }
            );
          }
  
       }
      
    } catch (error) {
      this.notificacion.showError('Revisar si seleccionaron los campos Categoria, Diseños, Medida','** Error al Actualizar los productos')
      
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
    let opcionTallas = $('#tallas').val();
    let opcionCategoria = $('#categorias').val();
    let opcionDisenos = $('#disenos').val();
    opcionTallas =  opcionTallas ? opcionTallas : null;
    opcionDisenos = opcionDisenos ? opcionDisenos : null ;
    opcionCategoria = opcionCategoria ? opcionCategoria : null;

        if(opcionTallas.length>0 &&
      opcionCategoria.length>0 &&
      opcionDisenos.length>0 ){
        this.productos_new.medida = opcionTallas;
        this.productos_new.categoria = opcionCategoria;
        this.productos_new.disenos = opcionDisenos;
        
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
