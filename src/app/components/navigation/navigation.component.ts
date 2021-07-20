import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { PuntosVentasService } from '../../services/puntos-ventas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  items: MenuItem[];
  puntoVenta: any = [];
  displayPuntoVenta: boolean = false;
  constructor(private puntosServices: PuntosVentasService,private router: Router,
    private activedrouter: ActivatedRoute ) { 
      
    }

  ngOnInit() {
  this.getPuntosVenta();
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
  }
}
