import { Component, HostBinding, OnInit } from '@angular/core';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { ParametrosService } from '../../../services/parametros.service';
import { DisenosService } from '../../../services/disenos.service';
import { Parametros } from 'src/app/models/cat_parametros';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-parametros-form',
  templateUrl: './parametros-form.component.html',
  styleUrls: ['./parametros-form.component.css']
})
export class ParametrosFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  parametros: any = [];
  imagenObtenidaMostrar: any;
  imagenObtenidaMostrar1: any;
  imagenObtenidaMostrar2: any;

  imagenObtenidaAnteriorUrl: any;
  imagenObtenidaAnteriorUrl1: any;
  imagenObtenidaAnteriorUrl2: any;

  imagenObtenidaIngresar: any;
  imagenObtenidaIngresar1: any;
  imagenObtenidaIngresar2: any;

  constructor( private router: Router,
    private activedrouter: ActivatedRoute,
    private sanitizer: DomSanitizer,private disenoservice: DisenosService, private parametroServicio: ParametrosService, private notificacion: NotificacionService) { }

  isloading = false;
  parametro: Parametros = {
    idParametros: 0,
    textoBanner: '',
    mensajePuntosVenta: '',
    fraseFooter: '',
    tituloServicios: '',
    servicio1: '',
    servicio2: '',
    servicio3: '',
    servicio4: '',
    servicio5: '',
    tituloInformacion: '',
    telefono: '',
    celular: '',
    correo1: '',
    correo2: '',
    direccion: '',
    urlFotoBanner1: '',
    urlFotoBanner2: '',
    urlFotoBanner3: '',
  }

  idParametros = 0;
  textoBanner = '';
  mensajePuntosVenta = '';
  fraseFooter = '';
  tituloServicios = '';
  servicio1 = '';
  servicio2 = '';
  servicio3 = '';
  servicio4 = '';
  servicio5 = '';
  tituloInformacion = '';
  telefono = '';
  celular = '';
  correo1 = '';
  correo2 = '';
  direccion = '';
  urlFotoBanner1 = '';
  urlFotoBanner2 = '';
  urlFotoBanner3 = '';

  ngOnInit() {
    this.getParametros();
  }

  getParametros() {
    this.parametroServicio.gerParametros().subscribe(
      res => {
        this.parametros = res;
        this.idParametros = res[0].idParametros;
        this.parametro.textoBanner = res[0].textoBanner;
        this.parametro.mensajePuntosVenta = res[0].mensajePuntosVenta;
        this.parametro.fraseFooter = res[0].fraseFooter;
        this.parametro.tituloServicios = res[0].tituloServicios;
        this.parametro.servicio1 = res[0].servicio1;
        this.parametro.servicio2 = res[0].servicio2;
        this.parametro.servicio3 = res[0].servicio3;
        this.parametro.servicio4 = res[0].servicio4;
        this.parametro.servicio5 = res[0].servicio5;
        this.parametro.tituloInformacion = res[0].tituloInformacion;
        this.parametro.telefono = res[0].telefono;
        this.parametro.celular = res[0].celular;
        this.parametro.correo1 = res[0].correo1;
        this.parametro.correo2 = res[0].correo2;
        this.parametro.direccion = res[0].direccion;
        this.parametro.urlFotoBanner1 = res[0].urlFotoBanner1;
        this.parametro.urlFotoBanner2 = res[0].urlFotoBanner2;
        this.parametro.urlFotoBanner3 = res[0].urlFotoBanner3;

        this.imagenObtenidaMostrar =  this.parametro.urlFotoBanner1;
        this.imagenObtenidaMostrar1 =  this.parametro.urlFotoBanner2;
        this.imagenObtenidaMostrar2 =  this.parametro.urlFotoBanner3;


        
        this.imagenObtenidaAnteriorUrl =  this.parametro.urlFotoBanner1;
        this.imagenObtenidaAnteriorUrl1 =  this.parametro.urlFotoBanner2;
        this.imagenObtenidaAnteriorUrl2 =  this.parametro.urlFotoBanner3;

      },
      err => console.error(err)
    );
  }

  onBasicUpload(file: any) {

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
  }
  )
  //capturar la segunda imagen de diseños
  onBasicUpload1(file: any) {

    //  this.productoservices.uploadImage(file.target.files[0],x.toString())
    // .then(res=>{this.imagenObtenida=res})
    this.blobFile1(file.target.files[0]).then((res: any) => {
      this.imagenObtenidaMostrar1 = res.base;
    })

    this.imagenObtenidaIngresar1 = file.target.files[0];
    console.log(this.imagenObtenidaIngresar1)
  }

  blobFile1 = async ($event: any) => new Promise((resolve, reject) => {
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
  }
  )

  //capturar tercera imagen 
  onBasicUpload2(file: any) {

    //  this.productoservices.uploadImage(file.target.files[0],x.toString())
    // .then(res=>{this.imagenObtenida=res})
    this.blobFile2(file.target.files[0]).then((res: any) => {
      this.imagenObtenidaMostrar2 = res.base;
    })

    this.imagenObtenidaIngresar2 = file.target.files[0];
    console.log(this.imagenObtenidaIngresar2)
  }

  blobFile2 = async ($event: any) => new Promise((resolve, reject) => {
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
  }
  )
  async updateParametro() {
    
    // cuando en el ingreso la imagen no tiene crgado no me muetsra nada, 
    // por el contrario me toca subir una imagen
      this.isloading=true;
      let x = Math.floor(Math.random() * (1000 - 1)) + 1;
      if (!this.imagenObtenidaIngresar) {


      } else {
        const urlNueva = new Promise(async (resolve, reject) => {
          await this.disenoservice.uploadImage(this.imagenObtenidaIngresar, x.toString()).then(res => {
            resolve(res);

          }, err => console.log("hola pe"))
        });

        await urlNueva.then(res => this.parametro.urlFotoBanner1 = String(res));


      }
      //si la imagen 2 esta vacia tenemos que ingresar una nueva imagen al firebase
      if (!this.imagenObtenidaIngresar1) {


      } else {
        const urlNueva1 = new Promise(async (resolve, reject) => {
          await this.disenoservice.uploadImage(this.imagenObtenidaIngresar1, x.toString()).then(res => {
            resolve(res);

          }, err => console.log("hola pe"))
        });

        await urlNueva1.then(res => this.parametro.urlFotoBanner2 = String(res));


      }
      //si la imagen 3 esta vacia tenemos que ingresar una nueva imagen al firebase
      if (!this.imagenObtenidaIngresar2) {


      } else {
        const urlNueva2 = new Promise(async (resolve, reject) => {
          await this.disenoservice.uploadImage(this.imagenObtenidaIngresar2, x.toString()).then(res => {
            resolve(res);

          }, err => console.log("hola pe"))
        });

        await urlNueva2.then(res => this.parametro.urlFotoBanner3 = String(res));


      }



      if (this.parametro.textoBanner.length > 0) {

        if (!this.imagenObtenidaAnteriorUrl) {

          this.disenoservice.borrarImagen(this.imagenObtenidaAnteriorUrl).then(res => console.log(res));

        } else {

        }

        if (!this.imagenObtenidaAnteriorUrl1) {

          this.disenoservice.borrarImagen(this.imagenObtenidaAnteriorUrl1).then(res => console.log(res));

        } else {
        }

        if (!this.imagenObtenidaAnteriorUrl2) {

          this.disenoservice.borrarImagen(this.imagenObtenidaAnteriorUrl2).then(res => console.log(res));

        } else {
        }




        this.parametroServicio.updateParametro(this.idParametros,this.parametro).subscribe(
          res=>{
            setTimeout(() => {
              this.notificacion.showSuccess('El Parametro se ha actualizado correctamente', 'Parametros se ha actualizado');
              this.isloading=false;
            }, 100)

            this.router.navigate(['/admin/parameters'])
          },
          err => console.error(err)
        );

        
      } else {
        this.notificacion.showError('Revise si estan llenos los campos', '**Error al actuclizar Parametros')
      }
  }

}
