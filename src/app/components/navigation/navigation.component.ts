import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { PuntosVentasService } from '../../services/puntos-ventas.service';
import { ActivatedRoute, Router } from '@angular/router';
import {UsuariosService } from '../../services/usuarios.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  items: MenuItem[];
  puntoVenta: any = [];
  displayPuntoVenta: boolean = false;
  constructor(private puntosServices: PuntosVentasService ,private router: Router,
    private activedrouter: ActivatedRoute, private userService:UsuariosService ) { 
      
    }

  ngOnInit() {
  this.getPuntosVenta();
  this.userService.getUserLogged().subscribe(res=>{
    console.log("el usuario logeado es "+res[0].nombre)
  })
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
}
