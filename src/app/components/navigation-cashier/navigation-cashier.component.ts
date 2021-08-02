import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { PuntosVentasService } from '../../services/puntos-ventas.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-navigation-cashier',
  templateUrl: './navigation-cashier.component.html',
  styleUrls: ['./navigation-cashier.component.css']
})
export class NavigationCashierComponent implements OnInit {

  items: MenuItem[];
  puntoVenta: any = [];
  puntoventaStock: any = [];
  displayPuntoVenta: boolean = false;
  displayStock: boolean = false;
  city: string ;
  constructor(private puntosServices: PuntosVentasService ,private router: Router,
    private activedrouter: ActivatedRoute ) { 
      
    }

  ngOnInit() {
    //this.getPuntosVenta();
    //this.getpuntoventaStock();
  }

  getPuntosVenta(){
  this.puntosServices.getPuntosVentas()
    .subscribe(res=>{
      this.puntoVenta = res;
    });
  }
  getpuntoventaStock(){
    this.puntosServices.getPuntosVentas()
    .subscribe(res=>{
      this.puntoventaStock = res;
    });
  }

  showDialogPuntoVenta(){
    this.getPuntosVenta();
    this.displayPuntoVenta = true;
   
  }
  showDialogStock(){
    this.getpuntoventaStock();

    this.displayStock = true;
    
  }
 
  enviarPuntoVenta(id:number){
     
    this.router.navigate(['/cashier/bill/',id]);
    this.displayPuntoVenta = false;
    
    
  }

  enviaraStock(id:number){
   
    this.router.navigate(['/cashier/stock-add/',id]);
    this.displayStock = false;
    
  }





}
