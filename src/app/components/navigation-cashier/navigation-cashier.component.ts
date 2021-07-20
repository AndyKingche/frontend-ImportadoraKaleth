import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { PuntosVentasService } from '../../services/puntos-ventas.service';
@Component({
  selector: 'app-navigation-cashier',
  templateUrl: './navigation-cashier.component.html',
  styleUrls: ['./navigation-cashier.component.css']
})
export class NavigationCashierComponent implements OnInit {

  displayPuntoVenta:boolean=false;
  constructor(private puntosServices: PuntosVentasService) { }

  ngOnInit() {
    this.getPuntosVenta();
  }

  routerNav(){
   this.displayPuntoVenta = true;
  }
  getPuntosVenta(){
    this.puntosServices.getPuntosVentas()
    .subscribe(res=>{
     // this.puntoVenta = res;
    });
  }

}
