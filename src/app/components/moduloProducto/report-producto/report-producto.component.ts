import { Component, OnInit } from '@angular/core';
import { CatStockService } from '../../../services/cat-stock.service';

@Component({
  selector: 'app-report-producto',
  templateUrl: './report-producto.component.html',
  styleUrls: ['./report-producto.component.css']
})
export class ReportProductoComponent implements OnInit {

  stock:any=[];
  parametros:string="";
  constructor(private stockService: CatStockService) { }

  ngOnInit() {
  }

  getFindInventario(){
    this.stockService.findStockInventario().subscribe(res=>{
      this.stock = res;
    },err=>console.log(err))
  }

  getFindInventarioPuntoVenta(){
    this.stockService.findStockInventarioPuntoVenta(14).subscribe(res=>{
      this.stock = res;
    },err=>console.log(err))
  }
  getFindMin(){
    this.stockService.findStockbyMin().subscribe(res=>{
      this.stock = res;
    },err=>console.log(err))
  }
  getFindMinPuntoVenta(){
    this.stockService.findStockbyMinPuntoVenta(14).subscribe(res=>{
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

  findParametrosPuntoVenta(event:any){
    this.parametros = event;
    console.log(this.parametros);
    if(this.parametros.length!=0){
      this.stockService.findStockbyParametersPuntoVenta(14,this.parametros).subscribe(res=>{
        this.stock=res;
      },err=>console.log(err))
    }else{
      this.stock=[];
    }
  }

}
