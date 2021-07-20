import { Component, OnInit, HostBinding, Output, EventEmitter, Input } from '@angular/core';

import { ActivatedRoute, Router } from "@angular/router";
import { CatStockService } from '../../services/cat-stock.service';
import { peDetallePedido } from '../../models/peDetallePedido';
import { peDetallePedidoAux } from 'src/app/models/peDetallePedidoAux';
import * as html2pdf from 'html2pdf.js';
//Productos
import { Productos } from '../../models/catProducto';
import { ProductoService } from '../../services/producto.service';
//PuntosVenta
import { PuntosVentas } from '../../models/catPuntosVenta';
import { PuntosVentasService } from '../../services/puntos-ventas.service';
//Tallas
import { Tallas } from '../../models/catTalla';
import { MedidaService } from '../../services/medida.service';
//Disenos
import { Disenos } from '../../models/catDiseno';
import { DisenosService } from '../../services/disenos.service';
// categoria 
import { Categorias } from '../../models/catCategoria';
import { CategoriaService } from '../../services/categoria.service';
//stockAuxiliar
import { cat_stockAuxiliar } from '../../models/cat_stockAuxiliar';
import { NotificacionService } from '../../services/notificacion.service';

//Pedido
import { peCabezaPedido } from '../../models/peCabezaPedido';
import { PedidosService } from '../../services/pedidos.service';
import jsPDF from 'jspdf';
import { async } from '@angular/core/testing';
import { resolve } from 'url';
declare let $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  @Input()
  stock: any = [];
  mostrarCarrito: boolean = false;
  mostrarInicio: boolean = true
  constructor(private stockService: CatStockService,
    private productServices: ProductoService,
    private puntosVentaServices: PuntosVentasService,
    private categoriaservices: CategoriaService,
    private diesnosservice: DisenosService,
    private medidaservice: MedidaService,
    private activedrouter: ActivatedRoute, private router: Router,
    private notificacion: NotificacionService,
    private pedidoservice: PedidosService) { }

  //varibales 
  inicio: number = 0;
  numeroFilas: number = 12;
  cantidadExistente: number = 0;
  listaDetallePedido: peDetallePedido[];
  valorTotalCarrito: number = 0;

  encuentraArray: boolean = false;
  encuentraArrayCarrito: boolean = false;
  cantidadPedido: number = 0;
  auxcantidadPedido: number = 0;
  cabezaPedidoIngreso: peCabezaPedido = {
    estado: "",
    fechaPe: "",
    total: 0,
    detallepedido: [{
      idDetallePe: 0,
      descripcion: "",
      valorTotal: 0,
      valorUnit: 0,
      cantidadPe: 0,
      catStock: {
        id: {
          idPuntosVenta: 0,
          idProductos: 0
        }
      }
    }],
    venCliente: { idCliente: 0 }
  }
  ///llenar lista
  listaCheckout: peDetallePedidoAux[];
  selectedlistaCheckout: peDetallePedidoAux;
  auxPedidoDetalle: peDetallePedidoAux = {
    idDetallePe: 0,
    descripcion: "",
    valorTotal: 0,
    valorUnit: 0,
    cantidadPe: 0,
    catProducto: { idProductos: 0 },
    catPuntosVenta: { idPuntosVenta: 0 },
  }
  cantidadInput: number = 0;

  //objetto tipo venDetallefactura
  peDetallePedido: peDetallePedido = {
    idDetallePe: 0,
    descripcion: "",
    valorTotal: 0,
    valorUnit: 0,
    cantidadPe: 0,
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
    //this.getStocksExistents();
    this.getStocksExistentsPuntoVenta();
    this.getCantExistent();
    this.listaDetallePedido = [];
    this.listaCheckout = [];



  }
  ShowCarrito() {
    console.log("si aplastaste")
    this.mostrarCarrito = true;
    this.mostrarInicio = false;
    this.listanuevaCarrito();

  }
  ShowInicio() {
    this.mostrarCarrito = false;
    this.mostrarInicio = true;
    this.router.navigate(["/index.html"])
  }
  enviarLista() {
    console.log("Hola")
    //this.nuevaListaDetallePedidio.emit(this.listaDetallePedido);
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
    //this.getStocksExistents();
    this.getStocksExistentsPuntoVenta();
  }

  getStocksExistentsPuntoVenta() {
    this.stockService.getStockAllExistPuntoVenta(14, this.inicio, this.numeroFilas).subscribe(
      res => {
        console.log(res)
        this.stock = res;
      }, err => console.error(err)

    );
  }

  getStocksExistents() {
    this.stockService.getAllStockExistents(this.inicio, this.numeroFilas).subscribe(
      res => {
        console.log(res)
        this.stock = res;
      }, err => console.error(err)

    );
  }

  imprimirProductos() {

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



  quitardelista(idproduct: number, idpuntoventa: number) {
    console.log("idproduct", idproduct, "puntoventa ", idpuntoventa)
    for (let x in this.listaCheckout) {
      if (Number(this.listaCheckout[x].catProducto.idProductos) === idproduct && Number(this.listaCheckout[x].catPuntosVenta.idPuntosVenta) === idpuntoventa) {
        console.log("entre", x)
        this.listaCheckout.splice(Number(x), 1);

        console.log(this.listaCheckout)
        break;
      }
    }

    for (let x in this.listaDetallePedido) {
      console.log(this.listaDetallePedido)
      if (Number(this.listaDetallePedido[x].catStock.id.idProductos) === idproduct && Number(this.listaDetallePedido[x].catStock.id.idPuntosVenta) === idpuntoventa) {
        console.log("entre", x)
        this.listaDetallePedido.splice(Number(x), 1);

        console.log(this.listaDetallePedido)
        break;
      }
    }

    //for para calcular el total del carrito 
    this.valorTotalCarrito = 0;
    for (var x in this.listaDetallePedido) {

      this.valorTotalCarrito = this.valorTotalCarrito + this.listaDetallePedido[x].valorTotal;
    }

  }

  //agregar productos a carrito 
  async Agregar(objeto: any) {


    console.log("este es el objeto", objeto)
    this.peDetallePedido.cantidadPe = 1;
    this.peDetallePedido.descripcion = objeto.catProducto.catCategoria.nombreCategoria + " " + objeto.catProducto.catDiseno.nombre + "-" + objeto.catProducto.catTalla.medida;
    this.peDetallePedido.valorUnit = objeto.precioUnit;
    this.peDetallePedido.valorTotal = Number(objeto.precioUnit * this.peDetallePedido.cantidadPe);
    this.peDetallePedido.catStock.id.idProductos = objeto.catProducto.idProductos;
    this.peDetallePedido.catStock.id.idPuntosVenta = objeto.catPuntosVenta.idPuntosVenta;


    if (this.listaDetallePedido.length == 0) {

      this.listaDetallePedido.push(this.peDetallePedido);
      this.valorTotalCarrito = this.listaDetallePedido[0].valorTotal;
      //this.cantidadPedido = 0;
      //this.auxcantidadPedido = 0;

      this.encuentraArray = false;
    } else {
      this.valorTotalCarrito = 0;
      for (var x in this.listaDetallePedido) {
        //realizamos la validación para verificar si existe el prodcuto dentro de la lista Stock
        if (this.listaDetallePedido[x].catStock.id.idProductos == this.peDetallePedido.catStock.id.idProductos
          && this.listaDetallePedido[x].catStock.id.idPuntosVenta == this.peDetallePedido.catStock.id.idPuntosVenta
        ) {

          //let cantidadSpiner=0;
          // cantidadSpiner= this.peDetallePedido.canidadPe;

          // console.log("entreeee => cantidad ",this.listaDetallePedido[x].canidadPe)
          // this.listaDetallePedido[x].canidadPe = this.listaDetallePedido[x].canidadPe+cantidadSpiner;
          this.listaDetallePedido[x].cantidadPe++;

          let TotalAux = 0;

          TotalAux = this.listaDetallePedido[x].cantidadPe * this.listaDetallePedido[x].valorUnit;
          console.log(TotalAux)
          this.listaDetallePedido[x].valorTotal = TotalAux;

          this.encuentraArray = true;
          //-----this.cantidadPedido=0;
          //this.auxcantidadPedido = 0;



        }

        this.valorTotalCarrito = this.valorTotalCarrito + this.listaDetallePedido[x].valorTotal;
      }
      if (this.encuentraArray) {
        // reiniciar valores para la nueva busqueda del elemento en el array para el siguiente proceso
        this.encuentraArray = false;


      } else {
        //si no existe el producto ingresa un nuevo elemento en el array 
        //metodo push para apilar elemnto en el array

        console.log("holla añado un nuevo a la list")
        this.listaDetallePedido.push(this.peDetallePedido);

        //for para calcular el total del carrito 
        this.valorTotalCarrito = 0;
        for (var x in this.listaDetallePedido) {

          this.valorTotalCarrito = this.valorTotalCarrito + this.listaDetallePedido[x].valorTotal;
        }

        this.encuentraArray = false;
      }
      console.log("Lista pedido==>", this.listaDetallePedido)


    }
    //se realiza la valicaión si existe el procuto en el array
    // if (this.encuentraArray) {
    //   // reiniciar valores para la nueva busqueda del elemento en el array para el siguiente proceso
    //   this.encuentraArray = false;
    // } else {
    //   //si no existe el producto ingresa un nuevo elemento en el array 
    //   //metodo push para apilar elemnto en el array

    //   console.log("holla añado un nuevo a la list")
    //   this.listaDetallePedido.push(this.peDetallePedido);

    //   this.encuentraArray = false;
    // }
    console.log("Lista pedido==>", this.listaDetallePedido)
    this.peDetallePedido = {
      idDetallePe: 0,
      descripcion: "",
      valorTotal: 0,
      valorUnit: 0,
      cantidadPe: 0,
      catStock: {
        id: {
          idPuntosVenta: 0,
          idProductos: 0
        }
      }

    }
    //this.auxcantidadPedido = 0;
    //this.cantidadPedido = 0;



  }


  obtenerCantidad(cantidad: number, idProducto: number, idPuntoVenta: number) {
    this.cantidadPedido = cantidad;
    console.log(this.cantidadPedido);

    for (let i in this.listaCheckout) {
      if (this.listaCheckout[i].catProducto.idProductos == idProducto
        && this.listaCheckout[i].catPuntosVenta.idPuntosVenta == idPuntoVenta) {
        this.listaCheckout[i].cantidadPe = Number(this.cantidadPedido);
        this.listaCheckout[i].valorTotal = Number(this.cantidadPedido) * Number(this.listaCheckout[i].valorUnit);
      }
    }

    for (let i in this.listaDetallePedido) {
      if (this.listaDetallePedido[i].catStock.id.idProductos == idProducto
        && this.listaDetallePedido[i].catStock.id.idPuntosVenta == idPuntoVenta) {
        this.listaDetallePedido[i].cantidadPe = this.cantidadPedido;
        this.listaDetallePedido[i].valorTotal = this.cantidadPedido * this.listaDetallePedido[i].valorUnit;
      }
    }


    //for para calcular el total del carrito 
    this.valorTotalCarrito = 0;
    for (var x in this.listaDetallePedido) {

      this.valorTotalCarrito = this.valorTotalCarrito + this.listaDetallePedido[x].valorTotal;
    }
  }

  async listanuevaCarrito() {

    if (this.listaDetallePedido.length != null) {


      for (var x in this.listaDetallePedido) {
        console.log(this.listaDetallePedido[x])
        const productos = new Promise(async (resolve, reject) => {
          await this.productServices.getProducto(Number(this.listaDetallePedido[x].catStock.id.idProductos)).subscribe(res => {

            resolve(res);
          });
        })

        const puntoVenta = new Promise(async (resolve, reject) => {
          await this.puntosVentaServices.getPuntosVenta(Number(this.listaDetallePedido[x].catStock.id.idPuntosVenta)).subscribe(res => {
            resolve(res);
          });
        })

        await productos.then(res => { this.auxPedidoDetalle.catProducto = res; })
        await puntoVenta.then(res => { this.auxPedidoDetalle.catPuntosVenta = res; })
        console.log("Number0", this.listaDetallePedido[x].cantidadPe)
        this.auxPedidoDetalle.cantidadPe = Number(this.listaDetallePedido[x].cantidadPe);
        this.auxPedidoDetalle.valorTotal = this.listaDetallePedido[x].valorTotal;
        this.auxPedidoDetalle.valorUnit = this.listaDetallePedido[x].valorUnit;
        this.auxPedidoDetalle.descripcion = this.listaDetallePedido[x].descripcion;
        if (this.listaCheckout.length == 0) {

          this.listaCheckout.push(this.auxPedidoDetalle);
          this.encuentraArray = false;
        } else {
          console.log("ya esta llena")
          for (let y in this.listaCheckout) {
            if (this.listaCheckout[y].catProducto.idProductos == this.auxPedidoDetalle.catProducto.idProductos
              && this.listaCheckout[y].catPuntosVenta.idPuntosVenta == this.auxPedidoDetalle.catPuntosVenta.idPuntosVenta
            ) {
              console.log("entreeee")


              this.listaCheckout[y].cantidadPe = Number(this.auxPedidoDetalle.cantidadPe);
              this.listaCheckout[y].valorTotal = Number(this.auxPedidoDetalle.valorTotal);
              this.encuentraArrayCarrito = true;

            }

          }
          if (this.encuentraArrayCarrito) {
            // reiniciar valores para la nueva busqueda del elemento en el array para el siguiente proceso
            this.encuentraArrayCarrito = false;
          } else {
            //si no existe el producto ingresa un nuevo elemento en el array 
            //metodo push para apilar elemnto en el array

            console.log("holla añado un nuevo a la list")
            this.listaCheckout.push(this.auxPedidoDetalle);

            this.encuentraArrayCarrito = false;
          }
          console.log("Lista pedido==>", this.listaCheckout)
        }
        this.auxPedidoDetalle = {
          idDetallePe: 0,
          descripcion: "",
          valorTotal: 0,
          valorUnit: 0,
          cantidadPe: 0,
          catProducto: { idProductos: 0 },
          catPuntosVenta: { idPuntosVenta: 0 },
        }

      }




    }
  }

  async generarPedido() {
    if (this.listaCheckout.length > 0) {
      let idfacturaPedidoPDF = 0;
      let idClientePedido = 0;

      let fecha = new Date()
      let fechaFormateada = fecha.getFullYear() + "-" + ("0" + (fecha.getMonth() + 1)).slice(-2) + "-" + (fecha.getDate() + 1);
      this.cabezaPedidoIngreso.estado = "A",
        //this.cabezaPedidoIngreso.total=0;
        this.cabezaPedidoIngreso.fechaPe = fechaFormateada;
      this.cabezaPedidoIngreso.venCliente.idCliente = 1;
      //capturamos el id del cliente para imprimir el pdf
      idClientePedido = this.cabezaPedidoIngreso.venCliente.idCliente;
      for (let i in this.listaCheckout) {
        this.cabezaPedidoIngreso.total += this.listaCheckout[i].valorTotal;
        this.cabezaPedidoIngreso.detallepedido[i] = {
          cantidadPe: this.listaCheckout[i].cantidadPe,
          descripcion: this.listaCheckout[i].descripcion,
          valorTotal: this.listaCheckout[i].valorTotal,
          valorUnit: this.listaCheckout[i].valorUnit,
          catStock: {
            id: {
              idProductos: this.listaCheckout[i].catProducto.idProductos,
              idPuntosVenta: this.listaCheckout[i].catPuntosVenta.idPuntosVenta
            }
          }
        }

      }

      console.log("PEDIDO realizado=>  ", this.cabezaPedidoIngreso)

      const obtenerIdCabezaPedido = new Promise(async (resolve, reject) => {
        await this.pedidoservice.saveOrder(this.cabezaPedidoIngreso).subscribe(res => {
          console.log(res)
          resolve(res.idCabezaPe)
        }, err => console.log(err))
      })


      idfacturaPedidoPDF = await obtenerIdCabezaPedido.then(res => Number(res));

      setTimeout(() => {
        this.notificacion.showInfo('Su Pedido se realizo con exito', "PEDIDO REALIZADO");
        this.listaDetallePedido = null;
        this.listaCheckout = null;
      }, 200);
      this.router.navigate(["/"]);

      this.valorTotalCarrito = 0;

      //generar pdf proforma del pedido realizado 
      window.open(`/api/order/report/${idClientePedido}/${idfacturaPedidoPDF}`, "_blank");


    } else {
      alert("no tiene pedidos para realizar")
    }


  }

}


