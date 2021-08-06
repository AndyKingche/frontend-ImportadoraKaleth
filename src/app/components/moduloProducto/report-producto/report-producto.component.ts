import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { CatStockService } from '../../../services/cat-stock.service';
import { cat_stock } from '../../../models/cat_stock';
import { PuntosVentas } from '../../../models/catPuntosVenta';
import { PuntosVentasService } from '../../../services/puntos-ventas.service';
import { environment } from '../../../../environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-report-producto',
  templateUrl: './report-producto.component.html',
  styleUrls: ['./report-producto.component.css']
})
export class ReportProductoComponent implements OnInit {

  stock: any = [];
  selectedStock: cat_stock;
  items: any = [];
  itemsaux: any = [];
  selectedItems1: any;
  selectedItems2: any;
  selectedItems3: any;
  parametros: string = "";
  idInventarioTotal: number = 0;
  idInevntarioMin: number = 0;
  isloading = false;
  pdf: string = "data:application/pdf;base64,";
  constructor(private stockService: CatStockService, private puntoventaservice: PuntosVentasService,
    private activedrouter: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.puntoventaservice.getPuntosVentas().subscribe(res => {
      this.itemsaux = res;
      console.log(this.items)
      for (let i in this.itemsaux) {

        this.items[i] =
        {
          name: this.itemsaux[i].nombreLocal,

        }

      }
      console.log(this.items)
    })
    this.getFindInventario();
  }

  holi(x: any) {
    console.log(x)
  }

  getFindInventario() {
    this.isloading=true;
    this.stockService.findStockInventario().subscribe(res => {
      this.stock = res;
      this.isloading=false;
    }, err => console.log(err))

    
  }

  getFindInventarioPuntoVenta(id: number) {
    this.idInventarioTotal = id;
    this.isloading=true;
    this.stockService.findStockInventarioPuntoVenta(id).subscribe(res => {
      this.stock = res;
      this.isloading=false;
    }, err => console.log(err))
  }
  getFindMin() {
    this.isloading=true;
    this.stockService.findStockbyMin().subscribe(res => {
      this.stock = res;
      this.isloading=false;
    }, err => console.log(err))
  }
  getFindMinPuntoVenta(id: number) {
    this.isloading=true;
    this.idInevntarioMin = id;
    this.stockService.findStockbyMinPuntoVenta(id).subscribe(res => {
      this.stock = res;
      this.isloading=false;
    }, err => console.log(err))
  }
  findStockbyParameters(parametros: string) {
    this.isloading=true;
    this.stockService.findStockbyParameters(parametros).subscribe(res => {
      this.stock = res;
      this.isloading=false;
    })
  }
  findParametros(event: any) {
    
    this.parametros = event;
    console.log(this.parametros);
    if (this.parametros.length != 0) {
      this.stockService.findStockbyParameters(this.parametros).subscribe(res => {
        this.stock = res;
      }, err => console.log(err))
    } else {
      this.stock = [];

      this.getFindInventario();

    }

  }

  imprimirInventarioTo() {

    this.isloading=true;
    this.stockService.reporteStockTotal().subscribe(
      res => {
        let pdfWindow = window.open("")
        pdfWindow.document.write(
          "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
          encodeURI(res[0]) + "'></iframe>"
        )
        this.isloading= false;
      },
      err => console.log(err));
      
   

  

  }

  downloadPdf(base64String, fileName) {
    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`
    link.click();
  }

  imprimirInventarioToPuntoVenta() {
   
    if (this.idInventarioTotal != 0) {
      this.isloading=true;
      this.stockService.reporteStockTotalLocal(this.idInventarioTotal).subscribe(
        res => {
          let pdfWindow = window.open("")
          pdfWindow.document.write(
            "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
            encodeURI(res[0]) + "'></iframe>"
          )
          this.isloading=false;
        },
        err => console.log(err));
      //window.open(`api/stock/report/${this.idInventarioTotal}`,"_blank");

    } else {
      alert('Debes esocger un Punto de Venta')
    }

  }
  imprimirInventarioMin() {
    //window.open(`/api/bill/ticket/${idfacturaPDF}`,"_blank");
    this.isloading=true;
    this.stockService.reporteStockMinTotal().subscribe(
      res => {
        console.log(res)
        let pdfWindow = window.open("")
        pdfWindow.document.write(
          "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
          encodeURI(res[0]) + "'></iframe>"
        )
        this.isloading=false;
      },
      err => console.log(err));
    //window.open(`api/stock/report/minTotal`,"_blank");

  }

  imprimirInventarioMinPuntoVenta() {
    
    if (this.idInevntarioMin != 0) {

      //window.open(`api/stock/report/minTotalPoints/${this.idInevntarioMin}`,"_blank");
      this.isloading=true;
      this.stockService.reporteStockMinTotalLocal(this.idInevntarioMin).subscribe(
        res => {
          let pdfWindow = window.open("")
          pdfWindow.document.write(
            "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
            encodeURI(res[0]) + "'></iframe>"
          )
          this.isloading=false;
        },
        err => console.log(err));
    } else {
      alert('Debes escoger un Punto de Venta')
    }
  }

  imprimircodigoBarra() {
    this.isloading=true;
    //window.open(`api/stock/codigoBarra`,"_blank");
    this.stockService.reporteCodigoBarra().subscribe(
      res => {
        let pdfWindow = window.open("")
        pdfWindow.document.write(
          "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
          encodeURI(res[0]) + "'></iframe>"
        )
        this.isloading=false;
      },
      err => console.log(err));
  }

}
