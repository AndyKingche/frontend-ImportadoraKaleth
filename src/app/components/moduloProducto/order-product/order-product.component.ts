import { Component, OnInit } from '@angular/core';
import { VenCabezaFactura } from 'src/app/models/VenCabezaFactura';
import { PedidosService } from '../../../services/pedidos.service';
import { FacturacionService } from '../../../services/facturacion.service';
import { CatStockService } from '../../../services/cat-stock.service';
import { peCabezaPedido } from 'src/app/models/peCabezaPedido';
import {ConfirmationService, Message} from 'primeng-lts/api';
import { NotificacionService } from "../../../services/notificacion.service";
@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.css']
})
export class OrderProductComponent implements OnInit {

  pedido:any=[];
  detallepedido:peCabezaPedido = {
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
  isloading = false;
  auxiliarFacturaIngreso: VenCabezaFactura = {
    estado: "",
    iva: 0,
    fechaFactu: "",
    total: 0,
    subtotal: 0,
    descuento: 0,
    usUser: {
      idUsuario: 1
    },
    detallefact: [{
      cantidadFact: 0,
      descripcion: "",
      valorTotal: 0,
      valorUnit: 0,
      catStock:
      {
        id: {
          idProductos: 0,
          idPuntosVenta: 0
        }
      }
    }

    ],
    venCliente: {
      idCliente: 0
    }

  }
  displayAceptar:boolean=false;
  msgs: Message[] = [];
  constructor(private pedidoService: PedidosService,
    private facturaService:FacturacionService,
    private stockService:CatStockService,
    private confirmationService: ConfirmationService,
    private notificacion: NotificacionService
   ) { }

  ngOnInit() {
    this.getPedidos();
  }

  getPedidos(){
    this.pedidoService.getOrder().subscribe(res=>{
      this.pedido = res;
      console.log(this.pedido)
    })
  }

  verPedido(idCliente:number,idCabezaPedido:number) {

    console.log(idCliente," ",idCabezaPedido)
    this.isloading = true;
    this.pedidoService.orderreport(idCliente,idCabezaPedido).subscribe(res => {
      let pdfWindow = window.open("")
      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
        encodeURI(res[0]) + "'></iframe>"
      )
      
      this.isloading = false;
    },
      err => console.log(err));

  }

  showDsialogAceptar(idCabezaPedido:number){
    this.displayAceptar = true;

  }
  async vender(idCabezaPedido:number){
    
    this.isloading = true;
    const pedido = new Promise(async (resolve,reject)=>{
      await this.pedidoService.getOrderbyId(idCabezaPedido).subscribe(res=>{
        resolve(res);
      }) 
    });
    
    let idfacturaPDF = 0;
    let fecha = new Date()
    let fechaFormateada = fecha.getFullYear() + "-" + ("0" + (fecha.getMonth() + 1)).slice(-2) + "-" + ("0" + (fecha.getDate() + 1)).slice(-2);
    this.detallepedido = await pedido.then(res=>res);
    //console.log(fechaFormateada);
    this.auxiliarFacturaIngreso.fechaFactu = fechaFormateada;
    this.auxiliarFacturaIngreso.estado = "A"
    this.auxiliarFacturaIngreso.total = this.detallepedido.total;
    this.auxiliarFacturaIngreso.subtotal = this.detallepedido.total;
    this.auxiliarFacturaIngreso.usUser.idUsuario = 1//;- 
    this.auxiliarFacturaIngreso.venCliente.idCliente = this.detallepedido.venCliente.idCliente;
    for (let index = 0; index < this.detallepedido.detallepedido.length; index++) {
      this.auxiliarFacturaIngreso.detallefact[index]={
        cantidadFact: this.detallepedido.detallepedido[index].cantidadPe,
        descripcion: this.detallepedido.detallepedido[index].descripcion,
        valorTotal:this.detallepedido.detallepedido[index].valorTotal,
        valorUnit: this.detallepedido.detallepedido[index].valorUnit,
        catStock: this.detallepedido.detallepedido[index].catStock
        
      }
      
    }
    console.log(this.auxiliarFacturaIngreso)
    const obtenerid = new Promise(async (resolve, reject) => {
      await this.facturaService.saveFactura(this.auxiliarFacturaIngreso).subscribe(res => {
        console.log(res)
        resolve(res.idCabezaFac)
      }, err => console.log(err))
    })

    idfacturaPDF = await obtenerid.then(res => Number(res));
    // // console.log("este es el id de la factura realizada", idfacturaPDF)
    let restaCantidad = 0;
    let cantidadLista = 0;
    let cantidadConsulta = 0;
    // console.log(this.auxiliarFacturaIngreso);
    for (let i = 0; i < this.auxiliarFacturaIngreso.detallefact.length; i++) {

      const ActualizarStockCantidad = new Promise(async (resolve, reject) => {
        await this.stockService.findbyIdproductoIdpuntosVenta(this.auxiliarFacturaIngreso.detallefact[i].catStock.id.idProductos, this.auxiliarFacturaIngreso.detallefact[i].catStock.id.idPuntosVenta)
          .subscribe(res => {

            restaCantidad = 0;

            cantidadConsulta = res[0].cantidad;
            cantidadLista = this.auxiliarFacturaIngreso.detallefact[i].cantidadFact;
            restaCantidad = cantidadConsulta - cantidadLista;

            console.log(cantidadConsulta)
            console.log(cantidadLista)
            console.log(restaCantidad)




            this.stockService.updateStockCantidadRest(Number(restaCantidad), this.auxiliarFacturaIngreso.detallefact[i].catStock.id.idProductos, this.auxiliarFacturaIngreso.detallefact[i].catStock.id.idPuntosVenta)
              .subscribe(res => {
                console.log("si actualizamos")
                resolve(res);
              })
          }, err => console.log(err))

      })
      await ActualizarStockCantidad.then(res => console.log(
        res
      ));

    }

    this.detallepedido.estado = "V";

    this.pedidoService.updateOrderByid(this.detallepedido.idCabezaPe,this.detallepedido).subscribe(res=>{
      this.getPedidos();

    })

  
    this.facturaService.ticket(idfacturaPDF).subscribe(res => {
      let pdfWindow = window.open("")
      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
        encodeURI(res[0]) + "'></iframe>"
      )
      this.isloading = false;
    },
      err => console.log(err));
      this.notificacion.showInfo("El pedido se ha realizado.","Pedido realizado");
      this.vaciarVariables();
   
      
  }//termina el metodo


  vaciarVariables(){
    this.auxiliarFacturaIngreso = {
      estado: "",
      iva: 0,
      fechaFactu: "",
      total: 0,
      subtotal: 0,
      descuento: 0,
      usUser: {
        idUsuario: 1
      },
      detallefact: [{
        cantidadFact: 0,
        descripcion: "",
        valorTotal: 0,
        valorUnit: 0,
        catStock:
        {
          id: {
            idProductos: 0,
            idPuntosVenta: 0
          }
        }
      }

      ],
      venCliente: {
        idCliente: 0
      }

    };

    this.detallepedido={
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
  }

  async borrar(idCabezaPe:number){
    this.isloading=true;
this.pedidoService.deleteOrder_Detalle(idCabezaPe).subscribe(res=>{
  this.pedidoService.deleteOrder(idCabezaPe).subscribe(res=>{
    
    this.getPedidos();
    this.notificacion.showInfo("El pedido se ha borrado","Pedido no realizado");
    this.isloading=false;
  })
})
  }
}
