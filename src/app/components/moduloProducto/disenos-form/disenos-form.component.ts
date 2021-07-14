import { Component, HostBinding, OnInit } from '@angular/core';
import { Disenos } from '../../../models/catDiseno';
import { DisenosService } from '../../../services/disenos.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionService } from '../../../services/notificacion.service';
import { DomSanitizer } from '@angular/platform-browser';
declare let $ : any;
@Component({
  selector: 'app-disenos-form',
  templateUrl: './disenos-form.component.html',
  styleUrls: ['./disenos-form.component.css']
})
export class DisenosFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  disenos : Disenos = {
    nombre:''
  }
  imagenObtenidaMostrar:any;
  imagenObtenidaAnteriorUrl:any;
  imagenObtenidaIngresar:any;
  edit : boolean = false;
  constructor(private disenoservice: DisenosService, 
    private router: Router,
    private activedrouter: ActivatedRoute,
    private notificacion: NotificacionService,private sanitizer:DomSanitizer) { }

  ngOnInit() {
    const params = this.activedrouter.snapshot.params;
    console.log(params)
    if(params.id){
      this.disenoservice.getDiseno(params.id).subscribe(
        res=>{
          console.log(res)
          if(res!= null){
            this.disenos = res; 
            this.imagenObtenidaMostrar = this.disenos.urlFoto;
            console.log(this.disenos.urlFoto)
            this.imagenObtenidaAnteriorUrl = this.disenos.urlFoto;
            this.edit = true;

          }else{
            this.router.navigate(['/design']);
          }
          
        },
        err => console.log("hay error "+ err)
      )
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

  async saveDisenos(){
    //let nombre = this.quitarespacios('#nombre');
    let x = Math.floor(Math.random() * (1000-1)) + 1;
    if(this.disenos.nombre.length>0){

      const urlNueva=new Promise(async (resolve,reject)=>{
        await this.disenoservice.uploadImage(this.imagenObtenidaIngresar,x.toString()).then(res=>{
            resolve(res);
            
          },err=>console.log("hola pe"))
        });
        await urlNueva.then(res=>this.disenos.urlFoto = String(res));
      this.disenoservice.saveDiseno(this.disenos).subscribe(
        res=>{

          setTimeout(()=>{
            this.notificacion.showSuccess('El diseno se ha agregado correctamente','Diseno agregado');
          },100)
          this.router.navigate(['/design']);
        },error => console.error(error)
      );
    }else{
      this.notificacion.showError('Revise si todos los campo esten llenos','**Error al agergar Disenos')
    }
  }
  

  async updateDisenos(){
   
    //cuando en el ingreso la imagen no tiene crgado no me muetsra nada, 
//por el contrario me toca subir una imagen

let x = Math.floor(Math.random() * (1000-1)) + 1;
if(!this.imagenObtenidaIngresar){
          
  
        }else{
          const urlNueva=new Promise(async (resolve,reject)=>{
            await this.disenoservice.uploadImage(this.imagenObtenidaIngresar,x.toString()).then(res=>{
                resolve(res);
                
              },err=>console.log("hola pe"))
            });
      
            await urlNueva.then(res=>this.disenos.urlFoto = String(res));
        }
    if(this.disenos.nombre.length > 0){
      
      this.disenoservice.borrarImagen(this.imagenObtenidaAnteriorUrl).then(res=>console.log(res));
      this.disenoservice.updateDiseno(this.disenos.idDisenos, this.disenos).subscribe(
        res => {
          this.disenos.nombre = '';
         
          setTimeout(()=>{
            this.notificacion.showSuccess('El diseno se ha actualizado correctamente','Diseno se ha actualizado');
          },100)

          this.router.navigate(['/design'])
        },
        err => console.error(err)
      );
    }else{
      this.notificacion.showError('Revise si estan llenos los campos','**Error al actuclizar el Diseno')
    }
  }

  quitarespacios(atributoHTML: string){
    let obtenerletras = $(atributoHTML).val();

    return obtenerletras.trim();
  }
}
