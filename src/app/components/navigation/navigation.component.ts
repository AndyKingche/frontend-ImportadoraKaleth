import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { PuntosVentasService } from '../../services/puntos-ventas.service';
import { ActivatedRoute, Router } from '@angular/router';
import {UsuariosService } from '../../services/usuarios.service';
import { CookieService } from "ngx-cookie-service";
import { LocationStrategy } from '@angular/common'; 
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  items: MenuItem[];
  puntoVenta: any = [];
  nombreUsuario:string="";
  apellidoUsuario:string="";
  displayPuntoVenta: boolean = false;
  constructor(private puntosServices: PuntosVentasService ,private router: Router,
    private activedrouter: ActivatedRoute, private userService:UsuariosService,
    private cookies:CookieService,private location: LocationStrategy ) { 
      history.pushState(null, null, window.location.href);
this.location.onPopState(() => {  
history.pushState(null, null, window.location.href);
});  
    }

  ngOnInit() {
  this.getPuntosVenta();
  this.userService.getUserLogged().subscribe(res=>{
    //console.log("el usuario logeado es "+res[0].nombre);
    this.nombreUsuario = `${res[0].nombre}`;
    this.apellidoUsuario = `${res[0].apellido}`
  });
  
  }
  

  getPuntosVenta(){
    this.puntosServices.getPuntosVentas()
    .subscribe(res=>{
      this.puntoVenta = res;
    });
  }

  showDialogPuntoVenta(){
    this.displayPuntoVenta = true
  }
 
  enviarPuntoVenta(id:number){
    this.router.navigate(['/admin/bill/',id]);
    this.displayPuntoVenta = false;
  }
  logOut(){
    this.cookies.delete('token');
    this.router.navigate(['/login'])
  }
  gotoHome(){
    // this.router.navigate(['/home'])
    window.open("/home", '_blank');
  }
}
