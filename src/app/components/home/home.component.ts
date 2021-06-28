import { Component, OnInit, HostBinding } from '@angular/core';


import { CatStockService } from '../../services/cat-stock.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  stock: any = [];
  constructor(private stockService: CatStockService) { }

  //varibales 
  inicio: number = 0;
  numeroFilas: number = 12;
  cantidadExistente: number = 0;

  ngOnInit() {
    this.getStocksExistents();
    this.getCantExistent();
  }
  paginate(event) {
    console.log(event)

    if (event.page == 0) {
      this.inicio = Number(event.page) * 12;
      this.numeroFilas = 12;
    } else {
      this.inicio = Number(event.page) * 12;
      this.inicio = this.inicio + 1;
      this.numeroFilas = 12;
    }
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    console.log(this.inicio, this.numeroFilas)
    this.getStocksExistents()
  }

  getStocksExistents() {
    this.stockService.getAllStockExistents(this.inicio, this.numeroFilas).subscribe(
      res => {
        console.log(res)
        this.stock = res;
      }, err => console.error(err)

    );
  }
  getCantExistent() {
    this.stockService.getCantExistents().subscribe(
      res => {
        console.log(res)
        this.cantidadExistente = Number(res);
        this.cantidadExistente=Math.ceil((this.cantidadExistente)/12);
      }, err => console.error(err)

    );
  }


}
