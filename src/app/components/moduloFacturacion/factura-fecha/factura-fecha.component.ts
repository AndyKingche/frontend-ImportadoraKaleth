import { Component, OnInit } from '@angular/core';
import { VenCabezaFactura } from '../../../models/VenCabezaFactura';
import { FacturacionService } from '../../../services/facturacion.service';
@Component({
  selector: 'app-factura-fecha',
  templateUrl: './factura-fecha.component.html',
  styleUrls: ['./factura-fecha.component.css']
})
export class FacturaFechaComponent implements OnInit {

  facturafecha : any =[];
  selectedFactura: VenCabezaFactura;
  i:string='';
  f:string='';
  constructor(private facturacionservice:FacturacionService) { }

  ngOnInit() {
    this.i=' ';
    this.f=' ';
  }
  
  getfacturaFecha(){
    //fechainicio:string,fechafin:string
    console.log(this.i,this.f)
    this.facturacionservice.facturafechas(this.i,this.f).subscribe(res=>{
      this.facturafecha = res;
      console.log(this.facturafecha)
    },err=>console.log(err))
  }
  imprimirfacturaFecha(){
    window.open(`/api/bill/reporteFecha/${this.i}/${this.f}`,"_blank");

  }


}
