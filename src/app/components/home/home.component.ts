import { Component, OnInit, HostBinding } from '@angular/core';

import { ActivatedRoute, Router } from "@angular/router";
import { CatStockService } from '../../services/cat-stock.service';
import { peDetallePedido } from '../../models/peDetallePedido';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  stock: any = [];
  constructor(private stockService: CatStockService,private activedrouter: ActivatedRoute, private router : Router,) { }

  //varibales 
  inicio: number = 0;
  numeroFilas: number = 12;
  cantidadExistente: number = 0;
  listaDetallePedido: peDetallePedido[];
  encuentraArray: boolean = false;


  //objetto tipo venDetallefactura
  peDetallePedido: peDetallePedido = {
    idDetallePe: 0,
    descripcion: "",
    valorTotal: 0,
    valorUnit: 0,
    canidadPe: 0,
    catStock: {
      id: {
        idPuntosVenta: 0,
        idProductos: 0
      }
    }
  }

  precioUnit: number = 0;
  cantidad: number = 1;
  ngOnInit() {
    this.getStocksExistents();
    this.getCantExistent();
    this.listaDetallePedido = [];


  }
  mostrarCarrito(){
    
  }
  enviarLista(){
    this.router.navigate(['/checkout/',this.listaDetallePedido])
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
        this.cantidadExistente = Math.ceil((this.cantidadExistente) / 12);
      }, err => console.error(err)

    );
  }
  async Agregar(objeto: any) {

    console.log("este es el objeto", objeto)
    this.peDetallePedido.canidadPe = 1;
    this.peDetallePedido.descripcion = objeto.catProducto.catCategoria.nombreCategoria + "-" + objeto.catProducto.catTalla.medida;
    this.peDetallePedido.valorUnit = objeto.precioUnit;
    this.peDetallePedido.valorTotal = Number(this.precioUnit * this.cantidad);
    this.peDetallePedido.catStock.id.idProductos = objeto.catProducto.idProductos;
    this.peDetallePedido.catStock.id.idPuntosVenta = objeto.catPuntosVenta.idPuntosVenta;

    console.log("esta es el objeto nuevo", this.peDetallePedido)

    if (this.listaDetallePedido.length === 0) {
      this.listaDetallePedido.push(this.peDetallePedido);
      console.log(this.listaDetallePedido)
      this.encuentraArray = false;
    } else {

      for (var x in this.listaDetallePedido) {
        //realizamos la validación para verificar si existe el prodcuto dentro de la lista Stock
        if (this.listaDetallePedido[x].catStock.id.idProductos == this.peDetallePedido.catStock.id.idProductos
          && this.listaDetallePedido[x].catStock.id.idPuntosVenta == this.peDetallePedido.catStock.id.idPuntosVenta
        ) {
          console.log("entreeee")
          this.listaDetallePedido[x].canidadPe++;
          this.encuentraArray = true;
        }

      }
      //  se realiza la valicaión si existe el procuto en el array
      if (this.encuentraArray) {
        // reiniciar valores para la nueva busqueda del elemento en el array para el siguiente proceso
        this.encuentraArray = false;
      } else {
        //si no existe el producto ingresa un nuevo elemento en el array 
        //metodo push para apilar elemnto en el array

        console.log("holla añado un nuevo a la list")
        this.listaDetallePedido.push(this.peDetallePedido);

        this.encuentraArray = false;
      }

    }
    console.log("Lista pedido==>", this.listaDetallePedido)

    this.peDetallePedido = {
      idDetallePe: 0,
      descripcion: "",
      valorTotal: 0,
      valorUnit: 0,
      canidadPe: 0,
      catStock: {
        id: {
          idPuntosVenta: 0,
          idProductos: 0
        }
      }

    }





  }

}
