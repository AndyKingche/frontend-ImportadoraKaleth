import { Component, HostBinding, OnInit } from '@angular/core';
import { cat_stock } from '../../../models/cat_stock';
import { CatStockService } from '../../../services/cat-stock.service';
import { PuntosVentasService } from '../../../services/puntos-ventas.service';
import { NotificacionService } from '../../../services/notificacion.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  stock: any = [];
  puntoVenta: any = [];
  displayPuntoVenta: boolean = false;
  constructor(private stockService: CatStockService,
    private puntoventaservice: PuntosVentasService,
    private notificacion: NotificacionService, private route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.ngOnInit();
    })
  }

  ngOnInit() {
    this.getStocks();
    this.getPuntosVenta();
  }
  getStocks() {
    this.stockService.getStocks().subscribe(
      res => {
        console.log(res)
        this.stock = res;
      }, err => console.error(err)

    );
  }

  getPuntosVenta(){
    this.puntoventaservice.getPuntosVentas()
    .subscribe(res=>{
      this.puntoVenta = res;
    });
  }

  showDialogPuntoVenta(){
    this.displayPuntoVenta = true
  }

}
