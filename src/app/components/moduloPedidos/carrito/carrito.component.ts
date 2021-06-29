

import { Component, Input,Output, OnInit, EventEmitter} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { peDetallePedidoAux } from '../../../models/peDetallePedidoAux';

//Stock
import { cat_stock } from '../../../models/cat_stock';
import { CatStockService } from '../../../services/cat-stock.service';
//Productos
import { Productos } from '../../../models/catProducto';
import { ProductoService } from '../../../services/producto.service';
//PuntosVenta
import { PuntosVentas } from '../../../models/catPuntosVenta';
import { PuntosVentasService } from '../../../services/puntos-ventas.service';
//Tallas
import { Tallas } from '../../../models/catTalla';
import { MedidaService } from '../../../services/medida.service';
//Disenos
import { Disenos } from '../../../models/catDiseno';
import { DisenosService } from '../../../services/disenos.service';
// categoria 
import { Categorias } from '../../../models/catCategoria';
import { CategoriaService } from '../../../services/categoria.service';
//stockAuxiliar
import { cat_stockAuxiliar } from '../../../models/cat_stockAuxiliar';
import { NotificacionService } from '../../../services/notificacion.service';
import { VirtualTimeScheduler } from 'rxjs';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  
  constructor( private stockService: CatStockService,
    private productServices: ProductoService,
    private puntosVentaServices: PuntosVentasService,
    private categoriaservices: CategoriaService,
    private diesnosservice: DisenosService,
    private medidaservice: MedidaService,
    private activedrouter: ActivatedRoute, private router: Router,
    private notificacion: NotificacionService) {

   }
   //CARRITO
listaCheckout:peDetallePedidoAux[];
auxPedidoDetalle: peDetallePedidoAux={
  idDetallePe: 0,
    descripcion: "",
    valorTotal: 0,
    valorUnit: 0,
    cantidadPe:0,
    catProducto: {idProductos:0},
    catPuntosVenta: {idPuntosVenta:0},
}
cantidadInput:number=0;

  @Input() dataentrante:any;
  ngOnInit() {
    this.listaCheckout = [];
   console.log(this.dataentrante);

    this.listanuevaCarrito();
  }

  mostrar(event){
    console.log(event)
  }

async listanuevaCarrito(){
  console.log(this.dataentrante)
  for (var x in this.dataentrante) {
    console.log(this.dataentrante[x])
  const productos=new  Promise(async (resolve,reject)=>{
    await this.productServices.getProducto(Number(this.dataentrante[x].catStock.id.idProductos)).subscribe(res=>{
      
      resolve(res);
    });
  })
  
  const puntoVenta=new  Promise(async (resolve,reject)=>{
    await this.puntosVentaServices.getPuntosVenta(Number(this.dataentrante[x].catStock.id.idPuntosVenta)).subscribe(res=>{
     resolve(res);
  }); })

  await productos.then(res=>{this.auxPedidoDetalle.catProducto = res;})
  await puntoVenta.then(res=>{this.auxPedidoDetalle.catPuntosVenta = res;})

  this.auxPedidoDetalle.cantidadPe = this.dataentrante[x].cantidad;
  this.auxPedidoDetalle.valorTotal = this.dataentrante[x].valorTotal;
  this.auxPedidoDetalle.valorUnit = this.dataentrante[x].valorUnit;
  this.auxPedidoDetalle.descripcion = this.dataentrante[x].descripcion;
  this.listaCheckout.push(this.auxPedidoDetalle);

  this.auxPedidoDetalle={
    idDetallePe: 0,
      descripcion: "",
      valorTotal: 0,
      valorUnit: 0,
      cantidadPe:0,
      catProducto: {idProductos:0},
      catPuntosVenta: {idPuntosVenta:0},
  }
  }
   this.dataentrante = null;
  console.log(this.listaCheckout);

}
obtenerCantidad(cantidad:number,lista:any){
  this.cantidadInput=cantidad;
  console.log(lista);
  console.log(this.cantidadInput)
}

quitardelista(idproduct:number,idpuntoventa:number){
 console.log("idproduct",idproduct,"puntoventa ",idpuntoventa)
 for(let x in this.listaCheckout){
   if(Number(this.listaCheckout[x].catProducto.idProductos) === idproduct && Number(this.listaCheckout[x].catPuntosVenta.idPuntosVenta) === idpuntoventa){
    console.log("entre",x) 
    this.listaCheckout.splice(Number(x),1);
    console.log(this.listaCheckout)
     break;
   }
 }
}

}
