import { Component, HostBinding, OnInit } from '@angular/core';

import {PuntosVentas} from '../../../models/catPuntosVenta'
import {PuntosVentasService} from '../../../services/puntos-ventas.service'
import { NotificacionService } from '../../../services/notificacion.service';

@Component({
  selector: 'app-puntos-ventas-list',
  templateUrl: './puntos-ventas-list.component.html',
  styleUrls: ['./puntos-ventas-list.component.css']
})
export class PuntosVentasListComponent implements OnInit {

  @HostBinding('class') classes= 'row';
  puntosVentas : any=[];
  selectedpuntosVenta: PuntosVentas;

  constructor(private puntosventasservices:PuntosVentasService,
    private notification: NotificacionService) { }

  ngOnInit() {
    this.getPuntosVentas();
  }

  getPuntosVentas(){
    this.puntosventasservices.getPuntosVentas().subscribe(
      res =>{
        console.log(res)
        this.puntosVentas = res;
      },err => console.error(err)
      
    );
  }

  deletePuntosVentas(id:number){
    this.puntosventasservices.deletePuntosVentas(id).subscribe(
      res=>{
        setTimeout(()=>{
          this.notification.showInfo('El Producto se ha eliminado correctamente ','Producto eliminaro');
        },200)
        this.getPuntosVentas();
      },error => console.error(error)

    );
  }

}
