import { Component, HostBinding, OnInit } from '@angular/core';
import { cat_stock } from '../../../models/cat_stock';
import { CatStockService } from '../../../services/cat-stock.service';
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
  constructor(private stockService: CatStockService,
    private notificacion: NotificacionService, private route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.ngOnInit();
    })
  }

  ngOnInit() {
    this.getStocks();
  }
  getStocks() {
    this.stockService.getStocks().subscribe(
      res => {
        console.log(res)
        this.stock = res;
      }, err => console.error(err)

    );
  }

}
