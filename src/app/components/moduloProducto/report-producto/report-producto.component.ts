import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { CatStockService } from '../../../services/cat-stock.service';
import { cat_stock } from '../../../models/cat_stock';
import { PuntosVentas } from '../../../models/catPuntosVenta';
import { PuntosVentasService } from '../../../services/puntos-ventas.service';

@Component({
  selector: 'app-report-producto',
  templateUrl: './report-producto.component.html',
  styleUrls: ['./report-producto.component.css']
})
export class ReportProductoComponent implements OnInit {

  stock:any=[];
  selectedStock: cat_stock;
  items:any=[];
  itemsaux:any=[];
  selectedItems1:any;
  selectedItems2:any;
  selectedItems3:any;
  parametros:string="";
  idInventarioTotal:number=0;
  idInevntarioMin:number=0;
  constructor(private stockService: CatStockService, private puntoventaservice: PuntosVentasService) { }

  ngOnInit() {
    this.puntoventaservice.getPuntosVentas().subscribe(res=>{
      this.itemsaux = res;
    console.log(this.items)
    for( let i in this.itemsaux){
     
      this.items[i]=
        { name: this.itemsaux[i].nombreLocal,
          
          }
      
    }
    console.log(this.items)
    })   
  }

  holi(x:any){
    console.log(x)
  }
  getFindInventario(){
    this.stockService.findStockInventario().subscribe(res=>{
      this.stock = res;
      console.log(this.stock)
    },err=>console.log(err))
  }

  getFindInventarioPuntoVenta(id:number){
    this.idInventarioTotal=id;
    this.stockService.findStockInventarioPuntoVenta(id).subscribe(res=>{
      this.stock = res;
    },err=>console.log(err))
  }
  getFindMin(){
    this.stockService.findStockbyMin().subscribe(res=>{
      this.stock = res;
    },err=>console.log(err))
  }
  getFindMinPuntoVenta(id:number){
    this.idInevntarioMin = id;
    this.stockService.findStockbyMinPuntoVenta(id).subscribe(res=>{
      this.stock = res;
    },err=>console.log(err))
  }
  findStockbyParameters(parametros:string){
    this.stockService.findStockbyParameters(parametros).subscribe(res=>{
      this.stock = res
    },)
  }
  findParametros(event:any){
    this.parametros = event;
    console.log(this.parametros);
    if(this.parametros.length!=0){
      this.stockService.findStockbyParameters(this.parametros).subscribe(res=>{
        this.stock=res;
      },err=>console.log(err))
    }else{
      this.stock=[];
    }
   
  }

  imprimirInventarioTo(){
    window.open(`/api/stock/reportTotal`,"_blank");

  }

  imprimirInventarioToPuntoVenta(){
    if(this.idInventarioTotal!=0){
      window.open(`/api/stock/report/${this.idInventarioTotal}`,"_blank");

    }else{
      alert('Debes esocger un Punto de Venta')
    }

  }
  imprimirInventarioMin(){
    //window.open(`/api/bill/ticket/${idfacturaPDF}`,"_blank");
    window.open(`/api/stock/report/minTotal`,"_blank");

  }

  imprimirInventarioMinPuntoVenta(){
    if(this.idInevntarioMin!=0){
      //window.open(`/api/stock/report/${this.idInventarioTotal}`,"_blank");
      window.open(`/api/stock/report/minTotalPoints/${this.idInevntarioMin}`,"_blank");

    }else{
      alert('Debes escoger un Punto de Venta')
    }
  }
  
  imprimircodigoBarra(){
    window.open(`/api/stock/codigoBarra`,"_blank");
  }

}
