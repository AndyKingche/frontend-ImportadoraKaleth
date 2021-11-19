import { Component, OnInit, HostBinding } from '@angular/core';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { ParametrosService } from '../../../services/parametros.service';
@Component({
  selector: 'app-parametros-list',
  templateUrl: './parametros-list.component.html',
  styleUrls: ['./parametros-list.component.css']
})
export class ParametrosListComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  parametros: any = [];
  constructor(private parametroServicio: ParametrosService, private notifiacion: NotificacionService) { }
  isloading=false;
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

  conocenos='';
  mision='';
  vision='';


  ngOnInit() {
    this.getParametros();
  }


  getParametros() {
    this.isloading=true;
    this.parametroServicio.gerParametros().subscribe(
      res => {
        this.parametros = res;
        this.idParametros = res[0].idParametros;
        this.textoBanner = res[0].textoBanner;
        this.mensajePuntosVenta = res[0].mensajePuntosVenta;
        this.fraseFooter = res[0].fraseFooter;
        this.tituloServicios = res[0].tituloServicios;
        this.servicio1 = res[0].servicio1;
        this.servicio2 = res[0].servicio2;
        this.servicio3 = res[0].servicio3;
        this.servicio4 = res[0].servicio4;
        this.servicio5 = res[0].servicio5;
        this.tituloInformacion = res[0].tituloInformacion;
        this.telefono = res[0].telefono;
        this.celular = res[0].celular;
        this.correo1 = res[0].correo1;
        this.correo2 = res[0].correo2;
        this.direccion = res[0].direccion;
        this.urlFotoBanner1 = res[0].urlFotoBanner1;
        this.urlFotoBanner2 = res[0].urlFotoBanner2;
        this.urlFotoBanner3 = res[0].urlFotoBanner3;
        this.conocenos = res[0].conocenos;
        this.mision = res[0].mision;
        this.vision = res[0].vision;
        this.isloading=false;
      },
      err => console.error(err)
    );
  }

 

}
