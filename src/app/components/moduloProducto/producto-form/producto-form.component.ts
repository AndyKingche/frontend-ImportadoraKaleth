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
import { DomSanitizer } from '@angular/platform-browser';



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
  uploadedFiles: any[] = [];
//diesnos
disenos: Disenos;
imagenObtenidaMostrar:any;
imagenObtenidaAnteriorUrl:any;
imagenObtenidaIngresar:any;
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
    private notificacion: NotificacionService,private sanitizer:DomSanitizer) { }

  ngOnInit() {
    const params = this.activedrouter.snapshot.params;

    if(params.id){
      this.productoservices.getProducto(params.id).subscribe(
        res=>{
          if(res!= null){
            console.log(res);
            this.productos = res;
            //this.imagenObtenidaMostrar = this.productos.urlFoto;
           // this.imagenObtenidaAnteriorUrl = this.productos.urlFoto;
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

  async saveProductos(){
    
    if(this.testingreso()){
      let x = Math.floor(Math.random() * (1000-1)) + 1;
      if(!this.imagenObtenidaIngresar){
        console.log("si entre")
        

      }else{
        // const urlNueva=new Promise(async (resolve,reject)=>{
        //   await this.productoservices.uploadImage(this.imagenObtenidaIngresar,x.toString()).then(res=>{
        //       resolve(res);
              
        //     },err=>console.log("hola pe"))
        //   });
    
          //await urlNueva.then(res=>this.productos.urlFoto = String(res));
      }
     
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

  async updateProductos(){
    
    
        console.log("esntre al else")
        let x = Math.floor(Math.random() * (1000-1)) + 1;
//cuando en el ingreso la imagen no tiene crgado no me muetsra nada, 
//por el contrario me toca subir una imagen
        // if(!this.imagenObtenidaIngresar){
          
  
        // }else{
        //   const urlNueva=new Promise(async (resolve,reject)=>{
        //     await this.productoservices.uploadImage(this.imagenObtenidaIngresar,x.toString()).then(res=>{
        //         resolve(res);
                
        //       },err=>console.log("hola pe"))
        //     });
      
        //     //await urlNueva.then(res=>this.productos.urlFoto = String(res));
        // }
       
        if(this.testingreso()){
          //console.log("",this.imagenObtenidaAnteriorUrl)
          
          //this.productoservices.borrarImagen(this.imagenObtenidaAnteriorUrl).then(res=>console.log(res));
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

  async testingreso(){
    
    
    
    if(this.tallasEscogida.length!=0 &&
      this.disenosEscogida.length !=0 &&
      this.categoriaEscogida.length !=0){

        this.productos.catTalla.idTallas = this.tallasEscogida.idTallas;
        this.productos.catCategoria.idCategoria = this.categoriaEscogida.idCategoria;
        this.productos.catDiseno.idDisenos = this.disenosEscogida.idDisenos;
        //this.productos.urlFoto = this.imagenObtenidaIngresar;
       
        return true;
      }else{
        
        return false;
      }
  }
 
  onBasicUpload(file:any){
     
    //  this.productoservices.uploadImage(file.target.files[0],x.toString())
    // .then(res=>{this.imagenObtenida=res})
    this.blobFile(file.target.files[0]).then((res: any) => {
      this.imagenObtenidaMostrar = res.base;
    })

    this.imagenObtenidaIngresar = file.target.files[0];
  console.log(this.imagenObtenidaIngresar)
  }

  blobFile = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          blob: $event,
          image,
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          blob: $event,
          image,
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

}
