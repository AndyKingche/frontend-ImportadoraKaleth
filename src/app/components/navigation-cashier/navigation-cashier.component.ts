import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { PuntosVentasService } from '../../services/puntos-ventas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from "ngx-cookie-service";
import { UsuariosService } from 'src/app/services/usuarios.service';
import { LocationStrategy } from '@angular/common'; 
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
  nombreUsuario:string="";
  apellidoUsuario:string="";
  constructor(private puntosServices: PuntosVentasService ,private router: Router,
    private activedrouter: ActivatedRoute,
    private cookies:CookieService,private userService:UsuariosService,private location: LocationStrategy) { 
      history.pushState(null, null, window.location.href);
this.location.onPopState(() => {  
history.pushState(null, null, window.location.href);
}); 
    }

  ngOnInit() {
    //this.getPuntosVenta();
    //this.getpuntoventaStock();
    this.userService.getUserLogged().subscribe(res=>{
      //console.log("el usuario logeado es "+res[0].nombre);
      this.nombreUsuario = `${res[0].nombre}`;
      this.apellidoUsuario = `${res[0].apellido}`;
    });
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
  logOut(){
    this.cookies.delete('token');
    this.router.navigate(['/login'])
  }




}
