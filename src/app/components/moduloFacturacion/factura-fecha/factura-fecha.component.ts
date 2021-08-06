import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { VenCabezaFactura } from '../../../models/VenCabezaFactura';
import { FacturacionService } from '../../../services/facturacion.service';
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
  constructor(private facturacionservice: FacturacionService) { }

  ngOnInit() {
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
}
