import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//stockAuxiliar
import { cat_stockAuxiliar } from '../../../models/cat_stockAuxiliar';
import { CatStockService } from '../../../services/cat-stock.service';
//CLIENTES
import { Clientes } from '../../../models/Clientes';
import { ClientesService } from '../../../services/clientes.service';
import { resolve } from 'url';
import { VenCabezaFactura } from 'src/app/models/VenCabezaFactura';
import { VenDetalleFact } from 'src/app/models/VenDetalleFact';
import { FacturacionService } from '../../../services/facturacion.service';
import { ThrowStmt } from '@angular/compiler';
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



  listafacturaIngreso: VenCabezaFactura[];
  listaDetalleFactura: VenDetalleFact[];

  //variables
  idProductoConsulta: number = 0;
  codigoProducto;
  idPuntosVenta: number;
  detalle: string = "";
  precioUnit: number = 0;
  precioMay: number = 0;
  precioDis: number = 0;
  cantidad: number = 0;
  totalIngresoVista: string = "0";
  encuentraArray = false;
  //variables cliente
  cedula: string = "";
  nombreCliente: string = "";
  apellidoCliente: string = "";
  telefono: string = "";
  email: string = "";
  direccion: string = "";
  idClienteIngreso: number = 0;
  //objeto cliente
  nuevoClienteIngreso: Clientes = {

    idCliente: 0,
    apellidoCli: "",
    cedulaCli: "",
    direccionCli: "",
    email: "",
    nombreCli: "",
    telefono: ""

  };
  //objeto cabeza ingreso auxiliar
  // auxiliarFacturaIngreso: VenCabezaFactura = {
  //   idCabezaFac: 0,
  //   estado: '',
  //   iva: 0,
  //   fechaFactu: '',
  //   total: 0,
  //   usUser: {
  //     idUsuario: 0,
  //   },
  //   detallefact: [{
  //     idDetalleFact: 0,
  //     cantidadFact: 0,
  //     descripcion: '',
  //     valorTotal: 0,
  //     valorUnit: 0,
  //     catStock: {
  //       id: {
  //         idPuntosVenta: 0,
  //         idProductos: 0
  //       }
  //     }
  //   }
  //   ],
  //   venCliente: {
  //     idCliente: 0
  //   },

  // }
  auxiliarFacturaIngreso: VenCabezaFactura = {
    estado: "",
    iva: 0,
    fechaFactu: "",
    total: 0,
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
  // venCabezaFactura:VenCabezaFactura={

  // }
  //objetto tipo venDetallefactura
  venDetalleFactura: VenDetalleFact = {
    idDetalleFact: 0,
    cantidadFact: 0,
    descripcion: "",
    valorTotal: 0,
    valorUnit: 0,
    catStock: {
      id: {
        idPuntosVenta: 0,
        idProductos: 0
      }
    }
  }


  constructor(private stockService: CatStockService,
    private clienteService: ClientesService,
    private facturaService: FacturacionService,
    private router: Router,
    private activedrouter: ActivatedRoute,) { }

  ngOnInit() {
    const params = this.activedrouter.snapshot.params;
    this.idPuntosVenta = 1;
    this.totalIngresoVista = "0";
    this.listafacturaIngreso = [{
      idCabezaFac: 0,
      estado: "",
      iva: 0,
      fechaFactu: "",
      total: 0,
      usUser: {
        idUsuario: 0,
      },
      detallefact: [{
        idDetalleFact: 0,
        cantidadFact: 0,
        descripcion: "",
        valorTotal: 0,
        valorUnit: 0,
        catStock: {
          id: {
            idPuntosVenta: 0,
            idProductos: 0
          }
        }
      }
      ],
      venCliente: {
        idCliente: 0
      },

    }
    ];

    this.listaDetalleFactura = [];
  }


  async Agregar() {
    const IDCLIENTE = new Promise(async (resolve, reject) => {
      await this.clienteService.getClienteByCedula(this.cedula).subscribe((res) => {
        if (Object.keys(res).length === 0) {

          resolve(0)
        } else {
          resolve(res[0].idCliente);
        }

      }, err => console.log(err))
    });

    await IDCLIENTE.then(res => {
      console.log("el cliente existe", res)
      this.idClienteIngreso = Number(res);
    })


    //creamos un nuevo cliente sis que no existe
    if (this.idClienteIngreso == 0) {
      this.nuevoClienteIngreso.nombreCli = this.nombreCliente;
      this.nuevoClienteIngreso.apellidoCli = this.apellidoCliente;
      this.nuevoClienteIngreso.cedulaCli = this.cedula;
      this.nuevoClienteIngreso.direccionCli = this.direccion;
      this.nuevoClienteIngreso.telefono = this.telefono;
      this.nuevoClienteIngreso.email = this.email;

      console.log("el nuevo clientea ingresar = > ", this.nuevoClienteIngreso);
      const IDCLIENTEINGREO = new Promise(async (resolve, reject) => {
        await this.clienteService.saveCliente(this.nuevoClienteIngreso).subscribe(res => {
          resolve(res.idCliente);
        }, error => console.log(error))
      });

      await IDCLIENTEINGREO.then(res => {
        this.idClienteIngreso = Number(res);
      })

      console.log("id CLiente ingresado=>  ", this.idClienteIngreso)
    } else {
      console.log("el cliente existe", this.idClienteIngreso)
    }

    ///INGRESAR DATOS SI EXISTE EL CLIENTE

    this.venDetalleFactura.cantidadFact = this.cantidad;
    this.venDetalleFactura.descripcion = this.detalle;
    this.venDetalleFactura.valorTotal = Number(this.precioUnit * this.cantidad);
    this.venDetalleFactura.valorUnit = Number(this.precioUnit);
    this.venDetalleFactura.catStock.id.idProductos = this.idProductoConsulta;//cabiar al id proucto
    this.venDetalleFactura.catStock.id.idPuntosVenta = this.idPuntosVenta;

    if (this.listaDetalleFactura.length === 0) {
      //añadimos el primer elemento a la lista
      this.listaDetalleFactura.push(this.venDetalleFactura);
      //enviamos una variable falsa si existe el productodespues de ingresar
      this.encuentraArray = false;

    } else {

      for (var x in this.listaDetalleFactura) {
        //realizamos la validación para verificar si existe el prodcuto dentro de la lista Stock
        if (this.listaDetalleFactura[x].catStock.id.idProductos == this.venDetalleFactura.catStock.id.idProductos
          && this.listaDetalleFactura[x].catStock.id.idPuntosVenta == this.venDetalleFactura.catStock.id.idPuntosVenta
        ) {
          this.listaDetalleFactura[x].valorUnit = this.precioUnit;
          // sumatoria de la cantidad de un elemento encontrado
          this.listaDetalleFactura[x].cantidadFact = Number(this.listaDetalleFactura[x].cantidadFact) + Number(this.venDetalleFactura.cantidadFact);
          this.listaDetalleFactura[x].valorTotal = Number(this.listaDetalleFactura[x].cantidadFact * Number(this.precioUnit))

          console.log(this.listaDetalleFactura[x].cantidadFact)
          //cambiamos la varibnale encuentraArray a tr5u al momento que se encuentra el porducto en el stocklista
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
        this.listaDetalleFactura.push(this.venDetalleFactura);
        this.encuentraArray = false;
      }
    }

    console.log(this.listaDetalleFactura);
    //objetto tipo venDetallefactura
    this.venDetalleFactura = {
      idDetalleFact: 0,
      cantidadFact: 0,
      descripcion: "",
      valorTotal: 0,
      valorUnit: 0,
      catStock: {
        id: {
          idPuntosVenta: 0,
          idProductos: 0
        }
      }

    }
  }

  async Vender() {
    this.auxiliarFacturaIngreso.fechaFactu = "2021-06-24";
    this.auxiliarFacturaIngreso.estado = "A";
    this.auxiliarFacturaIngreso.iva = 0;
    this.auxiliarFacturaIngreso.total = 0;
    this.auxiliarFacturaIngreso.usUser.idUsuario = 1;//Usuario logeaado 
    this.auxiliarFacturaIngreso.venCliente.idCliente = this.idClienteIngreso;
    //   this.auxiliarFacturaIngreso.detallefact = this.listaDetalleFactura;

    // let pruebaingreso ={
    //   idCbezaFac:0, 
    //  estado: "A",
    //  iva: 0,
    //  fechaFactu: "2021-06-24",
    //  total: 0,
    //  usUser: {
    //      idUsuario:1
    //  },
    //  detallefact: [{
    //      cantidadFact:0,
    //      descripcion:"Goku", 
    //      valorTotal:0,
    //      valorUnit:12,
    //      catStock:
    //      {
    //          id:{
    //              idProductos:1,
    //              idPuntosVenta:1
    //          }
    //      }
    //  }

    //  ],
    //  venCliente: {
    //      idCliente:1
    //  }

    //  }
    let pruebaingreso = {

      estado: "A",
      iva: 0,
      fechaFactu: "2021-06-24",
      total: 0,
      usUser: {
        idUsuario: 1
      },
      detallefact: [{
        cantidadFact: 0,
        descripcion: "Goku",
        valorTotal: 0,
        valorUnit: 12,
        catStock:
        {
          id: {
            idProductos: 1,
            idPuntosVenta: 1
          }
        }
      }

      ],
      venCliente: {
        idCliente: 1
      }

    }
    for (let i = 0; i < this.listaDetalleFactura.length; i++) {
      this.auxiliarFacturaIngreso.detallefact[i] = {

        cantidadFact: Number(this.listaDetalleFactura[i].cantidadFact),
        descripcion: this.listaDetalleFactura[i].descripcion,
        valorTotal: Number(this.listaDetalleFactura[i].valorTotal),
        valorUnit: Number(this.listaDetalleFactura[i].valorUnit),
        catStock: {
          id: {
            idPuntosVenta: Number(this.listaDetalleFactura[i].catStock.id.idPuntosVenta),
            idProductos: Number(this.listaDetalleFactura[i].catStock.id.idProductos)
          }
        }



      }
    }


    console.log(this.auxiliarFacturaIngreso)
    await this.facturaService.saveFactura(this.auxiliarFacturaIngreso).subscribe(res => {
      console.log(res)
    }, err => console.log(err))




  }

  encontrarProducto(encontrar: string): void {
    if (encontrar.length == 0) {

    } else {
      this.buscarStockProducto();
    }


  }
  encontrarCliente(cedula: string): void {
    if (cedula.length == 0) {
      this.nombreCliente = "";
      this.apellidoCliente = "";
      this.telefono = "";
      this.email = "";
      this.direccion = "";
    } else {
      this.buscarClienteByCedula();
    }


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

        this.idProductoConsulta = Number(result[0].catProducto.idProductos);

        this.cantidad = 0;
        this.precioDis = result[0].precioDistribuidor;
        this.precioMay = result[0].precioMayor;
        this.precioUnit = result[0].precioUnit;
        this.detalle = result[0].catProducto.catCategoria.nombreCategoria + " " +
          result[0].catProducto.catDiseno.nombre + " - " +
          result[0].catProducto.catTalla.medida + " ";

      }

    }, err => console.log(err))




  }
  //////METODO PARA REALIZAR LA BUSQUEDA DE UN CLIENTE POR LA CEDULA
  async buscarClienteByCedula() {
    this.clienteService.getClienteByCedula(this.cedula).subscribe(result => {

      if (Object.keys(result).length === 0) {
        this.nombreCliente = "";
        this.apellidoCliente = "";
        this.telefono = "";
        this.email = "";
        this.direccion = "";
      } else {

        // console.log(result)
        this.nombreCliente = result[0].nombreCli;
        this.apellidoCliente = result[0].apellidoCli;
        this.telefono = result[0].telefono;
        this.email = result[0].email;
        this.direccion = result[0].direccionCli;
      }
    }, err => console.log(err))

  }



}
