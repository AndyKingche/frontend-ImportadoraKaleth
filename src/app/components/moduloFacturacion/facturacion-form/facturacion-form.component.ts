import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//stockAuxiliar
import { cat_stockAuxiliar } from '../../../models/cat_stockAuxiliar';
import { CatStockService } from '../../../services/cat-stock.service';
//CLIENTES
import { Clientes } from '../../../models/Clientes';
import { ClientesService } from '../../../services/clientes.service';
@Component({
  selector: 'app-facturacion-form',
  templateUrl: './facturacion-form.component.html',
  styleUrls: ['./facturacion-form.component.css']
})
export class FacturacionFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  //objeto stok busqueda para ventas
  stock: cat_stockAuxiliar = {
    cantidad: 0,
    catProducto: {
      idProductos: 0,
      catCategoria: {
        idCategoria: 0,
        descripcion: '',
        nombreCategoria: '',
      },
      catDiseno: {
        idDisenos: 0,
        nombre: '',
      },
      catTalla: {
        idTallas: 0,
        medida: '',
        descripcion: '',
        tipo: '',
      },
      codProducto: 0
    },
    catPuntosVenta: { idPuntosVenta: 0 },
    existe: '',
    precioDistribuidor: 0,
    precioMayor: 0,
    precioUnit: 0,
    stockMax: 0,
    stockMin: 0
  };
  //variables
  codigoProducto;
  idPuntosVenta: number;
  detalle: string = "";
  precioUnit: number = 0;
  precioMay: number = 0;
  precioDis: number = 0;
  cantidad: number = 0;
  totalIngresoVista: string = "0";

  //variables cliente
  cedula: string = "";
  nombreCliente: string = "";
  apellidoCliente: string = "";
  telefono: string = "";
  email: string = "";
  direccion: string = "";

  constructor(private stockService: CatStockService,
    private clienteService: ClientesService,
    private router: Router,
    private activedrouter: ActivatedRoute,) { }

  ngOnInit() {
    const params = this.activedrouter.snapshot.params;
    this.idPuntosVenta = 14;
    this.totalIngresoVista = "0";
  }


  encontrarProducto(encontrar: string): void {
    if (encontrar.length == 0) {

    } else {
      this.buscarStockProducto();
    }
    //console.log(encontrar)

  }
  encontrarCliente(cedula: string): void {
    if (cedula.length == 0) {

    } else {
      this.buscarClienteByCedula();
    }

    console.log(cedula)
  }


  ////////////////////////////////////PARA LLENAR AUTOMATICAMENTE LOS VALORES EN LOS CAMPOS////////////////////////////////////////////////
  async buscarStockProducto() {

    this.stockService.getStockProductbyCodProductoExite(this.codigoProducto, this.idPuntosVenta).subscribe(result => {

      if (Object.keys(result).length === 0) {
        this.cantidad = 0;
        this.precioDis = 0;
        this.precioMay = 0;
        this.precioUnit = 0;
        this.detalle = "";
      } else {

        this.cantidad = 0;
        this.precioDis = result[0].precioDistribuidor;
        this.precioMay = result[0].precioMayor;
        this.precioUnit = result[0].precioUnit;
        this.detalle = result[0].catProducto.catCategoria.nombreCategoria + " " +
          result[0].catProducto.catDiseno.nombre + " - " +
          result[0].catProducto.catTalla.medida + " ";

      }
      console.log(result)

    }, err => console.log(err))




  }
  //////METODO PARA REALIZAR LA BUSQUEDA DE UN CLIENTE POR LA CEDULA
  async buscarClienteByCedula() {
    this.clienteService.getClienteByCedula(this.cedula).subscribe(result => {
      console.log(result)
      if (Object.keys(result).length === 0) {
        this.nombreCliente = "";
        this.apellidoCliente = "";
        this.telefono = "";
        this.email = "";
        this.direccion = "";
      } else {

        // console.log(result)
        this.nombreCliente = result[0].nombrecliente;
        this.apellidoCliente = result[0].apellidocliente;
        this.telefono = result[0].telefono;
        this.email = result[0].email;
        this.direccion = result[0].direccioncliente;
      }
    }, err => console.log(err))

  }



}
