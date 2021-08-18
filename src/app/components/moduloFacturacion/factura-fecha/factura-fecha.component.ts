import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { VenCabezaFactura } from '../../../models/VenCabezaFactura';
import { FacturacionService } from '../../../services/facturacion.service';
import { CatStockService } from '../../../services/cat-stock.service'
@Component({
  selector: 'app-factura-fecha',
  templateUrl: './factura-fecha.component.html',
  styleUrls: ['./factura-fecha.component.css']
})
export class FacturaFechaComponent implements OnInit {

  facturafecha: any = [];
  selectedFactura: VenCabezaFactura;
  i = new Date();
  f = new Date();
  totalVenta: number = 0;
  isloading = false;
  es: any;

  constructor(private facturacionservice: FacturacionService, private stockServices: CatStockService) { }

  ngOnInit() {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }
    this.i = null;
    this.f = null;
  }

  async getfacturaFecha() {
    //fechainicio:string,fechafin:string
    this.isloading = true;
    let fechaInicio = this.i;
    let fechaFormateadaInicio = fechaInicio.getFullYear() + "-" + ("0" + (fechaInicio.getMonth() + 1)).slice(-2) + "-" + (fechaInicio.getDate());

    let fechaFin = this.f;
    let fechaFormateadaFin = fechaFin.getFullYear() + "-" + ("0" + (fechaFin.getMonth() + 1)).slice(-2) + "-" + (fechaFin.getDate());



    const arrayFacturas = new Promise(async (resolve, reject) => {
      await this.facturacionservice.facturafechas(fechaFormateadaInicio, fechaFormateadaFin).subscribe(res => {

        resolve(res);

        //this.facturafecha = res;
        // console.log(this.facturafecha)
      }, err => console.log(err))
    });

    await arrayFacturas.then(res => {
      this.facturafecha = res;
      this.isloading = false;
    })

    this.totalVenta = 0;
    for (var x in this.facturafecha) {

      this.totalVenta = this.totalVenta + this.facturafecha[x].total;
    }
  }
  async imprimirfacturaFecha() {
    this.isloading = true;
    let fechaInicio = this.i;
    let fechaFormateadaInicio = fechaInicio.getFullYear() + "-" + ("0" + (fechaInicio.getMonth() + 1)).slice(-2) + "-" + (fechaInicio.getDate());

    let fechaFin = this.f;
    let fechaFormateadaFin = fechaFin.getFullYear() + "-" + ("0" + (fechaFin.getMonth() + 1)).slice(-2) + "-" + (fechaFin.getDate());




    const arrayFacturas = new Promise(async (resolve, reject) => {
      await this.facturacionservice.facturafechas(fechaFormateadaInicio, fechaFormateadaFin).subscribe(res => {

        resolve(res)
        //this.facturafecha = res;
        // console.log(this.facturafecha)
      }, err => console.log(err))
    });

    await arrayFacturas.then(res => {
      this.facturafecha = res;

    })

    this.totalVenta = 0;
    for (var x in this.facturafecha) {

      this.totalVenta = this.totalVenta + this.facturafecha[x].total;
    }

    let valor = "" + (this.totalVenta).toFixed(2);

    //window.open(`/api/bill/reporteFecha/${fechaFormateadaInicio}/${fechaFormateadaFin}/${valor}`, "_blank");
    this.facturacionservice.reporteFacturaFechas(fechaFormateadaInicio, fechaFormateadaFin, valor).subscribe(res => {
      let pdfWindow = window.open("")
      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
        encodeURI(res[0]) + "'></iframe>"
      )
      this.isloading = false;
    },
      err => console.log(err))

  }

  mostrarTicket(idfacturaPDF: number) {
    this.isloading = true;
    this.facturacionservice.ticket(idfacturaPDF).subscribe(res => {
      let pdfWindow = window.open("")
      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
        encodeURI(res[0]) + "'></iframe>"
      )
      this.isloading = false;
    },
      err => console.log(err));

  }

  detalleFactAnular: any;
  factura: VenCabezaFactura = {
    estado: "",
    iva: 0,
    fechaFactu: "",
    total: 0,
    subtotal: 0,
    descuento: 0,
    usUser: {
      idUsuario: 0,
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

  async anularFactura(idfactura: number) {

    this.isloading = true;
    //consultar y guardar el detalle 
    const facura = new Promise(async (resolve, reject) => {
      await this.facturacionservice.facturaId(idfactura).subscribe(res => {
        resolve(res);


      })
    });

    this.factura = await facura.then(res => res);

    this.factura.estado = 'AN';
    //cambiar a estado anulado 

    const estado = new Promise(async (resolve, reject) => {
      await this.facturacionservice.updateFactura(idfactura, this.factura).subscribe(res => {
        resolve(res);

      })
    });


    ///////////////////////////////////////
    this.detalleFactAnular = this.factura.detallefact;

    for (let i = 0; i < this.detalleFactAnular.length; i++) {

      let idProducto = this.detalleFactAnular[i].catStock.catProducto.idProductos;
      let idPuntosVenta = this.detalleFactAnular[i].catStock.catPuntosVenta.idPuntosVenta;
      let cantidadProdDetalle = this.detalleFactAnular[i].cantidadFact;
      /// CONSULTAR EN LA TABLA STOCK LA CANTIDAD DE ACUERDO AL ID pUNTOS VENTA Y IDpRODUCTO


      const cantidadStockAnterior = new Promise(async (resolve, reject) => {
        await this.stockServices.findbyIdproductoIdpuntosVenta(idProducto, idPuntosVenta).subscribe(res => {
          resolve(res);

        })
      });
      let stock: any;
      stock = await cantidadStockAnterior.then(res => res);
      let cantidadConsulta = stock[0].cantidad;

      //tomar cantidad del stock y sumar 


      let cantidadIngreso = cantidadProdDetalle + cantidadConsulta;
      //actualizar stock en la BDD 

      this.stockServices.updateStockCantidadRest(cantidadIngreso, idProducto, idPuntosVenta).subscribe(res => {
        console.log("actualizado: " + res)
      });

    }
    this.isloading = false;

  }
}
