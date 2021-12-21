import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NotificacionService} from '../../../services/notificacion.service'

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
import { cat_stock } from 'src/app/models/cat_stock';
import { UsuariosService } from '../../../services/usuarios.service';
declare let $: any;

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
      codProducto: ''
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
  isloading = false;
  selectedDetalles: VenDetalleFact;
  selectedValue: string = 'val1';
  //variables
  idProductoConsulta: number = 0;
  codigoProducto;
  idPuntosVenta: number;
  detalle: string = "";
  precioUnit: number = 0;
  precioMay: number = 0;
  precioDis: number = 0;
  cantidad: number = 0;

  subtotalFactura: number = 0;
  descuentoFactura: number = 0;
  porcentajeDescuentoSeleccionado: number = 0;

  precioSeleccionado: number = 0;

  totalIngresoVista: string = "0";
  totalVenta: string = "0";
  totalVentaAxuliar: string = "0";

  totalDescuento: string = '0';

  encuentraArray = false;
  //variables Stock
  cantidadDisponible: number = 0;
  cantidadConsulta: number = 0;
  cantidadLista: number = 0;



  cantidadDisponibleAUx: any = [];
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

  clientmodal: Clientes = {

    idCliente: 0,
    apellidoCli: "",
    cedulaCli: "",
    direccionCli: "",
    email: "",
    nombreCli: "",
    telefono: ""

  };

  auxiliarFacturaIngreso: VenCabezaFactura = {
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
  displayConsultar: boolean = false;
  displayCliente: boolean = false;
  stockConsulta: any = [];
  selectedStock: cat_stock;
  disabled: boolean = false;
  usuarioId:number=0;
  constructor(private stockService: CatStockService,
    private clienteService: ClientesService,
    private facturaService: FacturacionService,
    private notificacion: NotificacionService,
    private router: Router,
    private activedrouter: ActivatedRoute,
    private userService:UsuariosService) {

    activedrouter.params.subscribe(val => {
      this.ngOnInit();
      this.inicializarVariables();
    })
  }


  ngOnInit() {
    const params = this.activedrouter.snapshot.params;
    this.disabled = false;
    this.idPuntosVenta = Number(params.id);
    //console.log("hola", this.idPuntosVenta)
    this.totalIngresoVista = "0";
    this.listafacturaIngreso = [{
      idCabezaFac: 0,
      estado: "",
      iva: 0,
      fechaFactu: "",
      total: 0,
      subtotal: 0,
      descuento: 0,
      usUser: {
        idUsuario: this.usuarioId,
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
    this.getStockConsulta(this.idPuntosVenta);
    this.userService.getUserLogged().subscribe(res=>{
      // console.log("el usuario logeado es "+res[0].idUsuario);
      this.usuarioId = res[0].idUsuario;
    })
  }



  obtenerVariable(nombreProd: any) {
    this.codigoProducto = nombreProd;
    this.displayConsultar = false;

    this.encontrarProducto(this.codigoProducto);
    (<HTMLInputElement>document.getElementById("primerRadio")).checked = true;
  }
  //seleccionar el precio del radio button
  radioChangeHandler($event: any) {
    this.precioSeleccionado = $event.target.value;
  }
  imprimirRadiobutton() {
    //(<HTMLInputElement>document.getElementById("primerRadio")).checked = true;

    //let valorRadiobutton = document.getElementById("primerRadio").checked;

    // console.log(x);
    //console.log(this.precioSeleccionado)

  }

  //Metodo para agregar datos a una lista para posteriormente ingresar a la bdd
  async Agregar() {


    if (this.cedula.length === 0 ||
      this.nombreCliente.length == 0 ||
      this.apellidoCliente.length == 0 ||
      this.telefono.length == 0 ||
      this.email.length == 0 ||
      this.direccion.length == 0
    ) {
      
      this.notificacion.showError('Ingrese datos del cliente', '**ERROR');
    } else {
      this.disabled = true;


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
        //console.log("el cliente existe", res)
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

        //console.log("el nuevo clientea ingresar = > ", this.nuevoClienteIngreso);

        const IDCLIENTEINGREO = new Promise(async (resolve, reject) => {
          await this.clienteService.saveCliente(this.nuevoClienteIngreso).subscribe(res => {
            resolve(res.idCliente);
          }, error => console.log(error))
        });

        await IDCLIENTEINGREO.then(res => {
          this.idClienteIngreso = Number(res);
        })

        //console.log("id CLiente ingresado=>  ", this.idClienteIngreso)
      } else {
        //console.log("el cliente existe", this.idClienteIngreso)
      }


      if (this.cantidadDisponible < this.cantidad) {

        
        this.notificacion.showError('No hay cantidad suficiente para vender', '**ERROR');

      } else {
        ///INGRESAR DATOS SI EXISTE EL CLIENTE

        this.venDetalleFactura.cantidadFact = this.cantidad;
        this.venDetalleFactura.descripcion = this.detalle;
        this.venDetalleFactura.valorTotal = Number(this.precioSeleccionado * this.cantidad);
        this.venDetalleFactura.valorUnit = Number(this.precioSeleccionado);
        //console.log("entre pprecio unit")
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///Ccodigo para controlar los precios automaticamente cuando un producto es mayor a 12 y seleccionar el precio al por mayor 
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // if (this.venDetalleFactura.cantidadFact > 0 && this.venDetalleFactura.cantidadFact < 12) {
        //   this.venDetalleFactura.valorTotal = Number(this.precioSeleccionado * this.cantidad);
        //   this.venDetalleFactura.valorUnit = Number(this.precioSeleccionado);
        //   console.log("entre pprecio unit")
        // }

        // if (this.venDetalleFactura.cantidadFact >= 12 && this.venDetalleFactura.cantidadFact < 24) {
        //   console.log("entre pprecio mayor")
        //   this.venDetalleFactura.valorTotal = Number(this.precioMay * this.cantidad);
        //   this.venDetalleFactura.valorUnit = Number(this.precioMay);
        // }
        // if (this.venDetalleFactura.cantidadFact >= 24) {
        //   console.log("entre pprecio distribuidor")
        //   this.venDetalleFactura.valorTotal = Number(this.precioDis * this.cantidad);
        //   this.venDetalleFactura.valorUnit = Number(this.precioDis);
        //   console.log("este es el precio total:", this.venDetalleFactura.valorTotal)
        // }

        // this.venDetalleFactura.valorUnit = Number(this.precioUnit);
        this.venDetalleFactura.catStock.id.idProductos = this.idProductoConsulta;//cabiar al id proucto
        this.venDetalleFactura.catStock.id.idPuntosVenta = this.idPuntosVenta;



        if (this.listaDetalleFactura.length === 0) {

          if (this.venDetalleFactura.cantidadFact <= 0) {
            
            this.notificacion.showError('Ingrese cantidad mayor a 0', '**ERROR');

          } else {
            //añadimos el primer elemento a la lista
            this.listaDetalleFactura.push(this.venDetalleFactura);
            this.totalIngresoVista = "" + this.venDetalleFactura.cantidadFact * this.venDetalleFactura.valorUnit;

            this.totalVenta = "" + this.venDetalleFactura.valorTotal;
            this.totalVentaAxuliar = "" + this.venDetalleFactura.valorTotal;



            this.cantidadDisponible = this.cantidadDisponible - this.venDetalleFactura.cantidadFact;



            //enviamos una variable falsa si existe el productodespues de ingresar
            this.encuentraArray = false;

          }

        } else {

          if (this.venDetalleFactura.cantidadFact <= 0) {
            
            this.notificacion.showError('Ingrese cantidad mayor a 0', '**ERROR');
          } else {
            this.cantidadLista = 0;
            this.cantidadDisponible = 0;

            for (var x in this.listaDetalleFactura) {
              //realizamos la validación para verificar si existe el prodcuto dentro de la lista Stock
              if (this.listaDetalleFactura[x].catStock.id.idProductos == this.venDetalleFactura.catStock.id.idProductos
                && this.listaDetalleFactura[x].catStock.id.idPuntosVenta == this.venDetalleFactura.catStock.id.idPuntosVenta
              ) {



                this.listaDetalleFactura[x].valorUnit = this.precioSeleccionado;
                // sumatoria de la cantidad de un elemento encontrado
                this.listaDetalleFactura[x].cantidadFact = Number(this.listaDetalleFactura[x].cantidadFact) + Number(this.venDetalleFactura.cantidadFact);


                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                ///Ccodigo para controlar los precios automaticamente cuando un producto es mayor a 12 y seleccionar el precio al por mayor 
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



                // if (this.listaDetalleFactura[x].cantidadFact > 0 && this.listaDetalleFactura[x].cantidadFact < 12) {
                //   this.listaDetalleFactura[x].valorUnit = this.precioUnit;
                //   console.log("entre pprecio unit")
                // }
                // if (this.listaDetalleFactura[x].cantidadFact >= 12 && this.listaDetalleFactura[x].cantidadFact < 24) {
                //   console.log("entre pprecio mayor")
                //   this.listaDetalleFactura[x].valorUnit = this.precioMay;

                // } if (this.listaDetalleFactura[x].cantidadFact >= 24) {
                //   console.log("entre pprecio distribuidor")
                //   this.listaDetalleFactura[x].valorUnit = this.precioDis;

                // }

                this.listaDetalleFactura[x].valorTotal = Number(this.listaDetalleFactura[x].cantidadFact * Number(this.listaDetalleFactura[x].valorUnit))
                //console.log(this.listaDetalleFactura[x].cantidadFact)
                //cambiamos la varibnale encuentraArray a tr5u al momento que se encuentra el porducto en el stocklista
                this.encuentraArray = true;
                this.cantidadLista = this.listaDetalleFactura[x].cantidadFact;

                this.cantidadDisponible = this.cantidadConsulta - this.cantidadLista;

                // console.log("cantidad consulta=>", this.cantidadConsulta)
                // console.log("cantidad Lista=>", this.cantidadLista)
                // console.log("cantidad Dsiponible=>", this.cantidadDisponible)

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

              this.cantidadDisponible = this.cantidadConsulta - this.venDetalleFactura.cantidadFact;

              this.encuentraArray = false;
            }

            let totalvista = 0;
            for (var x in this.listaDetalleFactura) {

              totalvista += (this.listaDetalleFactura[x].valorTotal);
            }
            this.totalIngresoVista = "" + totalvista;
            this.totalVenta = "" + totalvista;
            this.totalVentaAxuliar = "" + totalvista;
          }



        }

        //console.log(this.listaDetalleFactura);
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

      this.codigoProducto = 0;
      this.buscarStockProducto();
      (<HTMLInputElement>document.getElementById("primerRadio")).checked = true;

    }


  }

  inicializarVariables() {

    this.idProductoConsulta = 0;
    this.codigoProducto = 0;
    //  (<HTMLInputElement>document.getElementById("primerRadio")).checked = true;



    this.detalle = "";
    this.precioUnit = 0;
    this.precioMay = 0;
    this.precioDis = 0;
    this.subtotalFactura = 0;
    this.descuentoFactura = 0;
    this.cantidad = 0;
    this.precioSeleccionado = 0;
    this.totalIngresoVista = "0";
    this.totalVenta = "0";
    this.totalVentaAxuliar = "0";
    this.encuentraArray = false;
    this.cedula = "";
    this.listafacturaIngreso = [];
    this.listaDetalleFactura = [];

    this.cantidadDisponible = 0;


    this.nombreCliente = "";
    this.apellidoCliente = "";
    this.telefono = "";
    this.email = "";
    this.direccion = "";
    this.idClienteIngreso = 0;

    this.auxiliarFacturaIngreso = {
      estado: "",
      iva: 0,
      fechaFactu: "",
      total: 0,
      subtotal: 0,
      descuento: 0,
      usUser: {
        idUsuario: 0
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


  }
  async Vender() {



    this.disabled = false;


    let idfacturaPDF = 0;
    let fecha = new Date()
    let fechaFormateada = fecha.getFullYear() + "-" + ("0" + (fecha.getMonth() + 1)).slice(-2) + "-" + ("0" + (fecha.getDate() + 1)).slice(-2);
    //console.log(fechaFormateada);
    this.auxiliarFacturaIngreso.fechaFactu = fechaFormateada;
    this.auxiliarFacturaIngreso.estado = "A";
    this.auxiliarFacturaIngreso.iva = this.porcentajeDescuentoSeleccionado;
    this.auxiliarFacturaIngreso.total = (Number(this.totalVenta));
    this.auxiliarFacturaIngreso.subtotal = (Number(this.subtotalFactura));
    this.auxiliarFacturaIngreso.descuento = (Number(this.descuentoFactura));
    this.auxiliarFacturaIngreso.usUser.idUsuario = this.usuarioId;//Usuario logeaado 
    this.auxiliarFacturaIngreso.venCliente.idCliente = this.idClienteIngreso;
    if (this.listaDetalleFactura.length === 0) {
      
      this.notificacion.showError('No existe datos para realizar la venta', '**ERROR');
      // this.isloading=true;
    } else {

      this.isloading = true;

      // let pruebaingreso = {

      //   estado: "A",
      //   iva: 0,
      //   fechaFactu: "2021-06-24",
      //   total: 0,
      //   usUser: {
      //     idUsuario: 1
      //   },
      //   detallefact: [{
      //     cantidadFact: 0,
      //     descripcion: "Goku",
      //     valorTotal: 0,
      //     valorUnit: 12,
      //     catStock:
      //     {
      //       id: {
      //         idProductos: 1,
      //         idPuntosVenta: 1
      //       }
      //     }
      //   }

      //   ],
      //   venCliente: {
      //     idCliente: 1
      //   }

      // }
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


      //console.log(this.auxiliarFacturaIngreso)
      const obtenerid = new Promise(async (resolve, reject) => {
        await this.facturaService.saveFactura(this.auxiliarFacturaIngreso).subscribe(res => {
          //console.log(res)
          resolve(res.idCabezaFac)
        }, err => console.log(err))
      })

      idfacturaPDF = await obtenerid.then(res => Number(res));
      //console.log("este es el id de la factura realizada", idfacturaPDF)
      let restaCantidad = 0;
      let cantidadLista = 0;
      let cantidadConsulta = 0;
      for (let i = 0; i < this.listaDetalleFactura.length; i++) {

        const ActualizarStockCantidad = new Promise(async (resolve, reject) => {
          await this.stockService.findbyIdproductoIdpuntosVenta(this.listaDetalleFactura[i].catStock.id.idProductos, this.listaDetalleFactura[i].catStock.id.idPuntosVenta)
            .subscribe(res => {

              restaCantidad = 0;

              cantidadConsulta = res[0].cantidad;
              cantidadLista = this.listaDetalleFactura[i].cantidadFact;
              restaCantidad = cantidadConsulta - cantidadLista;

              // console.log(cantidadConsulta)
              // console.log(cantidadLista)
              // console.log(restaCantidad)




              this.stockService.updateStockCantidadRest(Number(restaCantidad), this.listaDetalleFactura[i].catStock.id.idProductos, this.listaDetalleFactura[i].catStock.id.idPuntosVenta)
                .subscribe(res => {
                  //console.log("si actualizamos")
                  resolve(res);
                })
            }, err => console.log(err))

        })
        await ActualizarStockCantidad.then(res => res);

      }

      //  window.open('/api/client/report',"_blank")
      //window.open(`/api/bill/ticket/${idfacturaPDF}`, "_blank");
      this.facturaService.ticket(idfacturaPDF).subscribe(res => {
        let pdfWindow = window.open("")
        pdfWindow.document.write(
          "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
          encodeURI(res[0]) + "'></iframe>"
        )
        this.isloading = false;
      },
        err => console.log(err));


      (<HTMLInputElement>document.getElementById("primerPorcentaje")).checked = true;
      this.inicializarVariables();
    }
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
        this.cantidadDisponible = 0;
        this.precioSeleccionado = 0;



      } else {

        this.cantidadDisponible = 0;
        this.cantidadConsulta = 0;
        this.cantidadLista = 0;
        this.cantidadConsulta = result[0].cantidad;
        (<HTMLInputElement>document.getElementById("primerRadio")).checked = true;
        if (this.listaDetalleFactura.length == 0) {
          this.cantidadDisponible = this.cantidadConsulta;
        } else {

          for (let i = 0; i < this.listaDetalleFactura.length; i++) {
            if (this.listaDetalleFactura[i].catStock.id.idProductos == result[0].catProducto.idProductos
              && this.listaDetalleFactura[i].catStock.id.idPuntosVenta == this.idPuntosVenta
              ////ojo cambiar 
            ) {

              this.cantidadLista = Number(this.listaDetalleFactura[i].cantidadFact);
              this.cantidadDisponible = this.cantidadConsulta - this.cantidadLista;

              // console.log("cantidad consulta=>", this.cantidadConsulta)
              // console.log("cantidad Lista=>", this.cantidadLista)
              // console.log("cantidad Dsiponible=>", this.cantidadDisponible)

              break;

            } else {
              this.cantidadDisponible = this.cantidadConsulta;
            }
          }
        }

        this.idProductoConsulta = Number(result[0].catProducto.idProductos);

        this.cantidad = 1;
        //this.cantidadDisponible = result[0].cantidad;
        this.precioDis = result[0].precioDistribuidor;
        this.precioMay = result[0].precioMayor;
        this.precioUnit = result[0].precioUnit;

        this.precioSeleccionado = this.precioUnit;
        this.detalle = result[0].catProducto.catCategoria.nombreCategoria + " " +
          result[0].catProducto.catDiseno.nombre + " - " +
          result[0].catProducto.catTalla.medida + " ";

      }

    }, err => console.log(err))




  }




  ///Metodo de eliminar un producto de la lista que se va a vender
  eliminarProductodeList(idProducto: number) {

    //console.log("este es el id del producto escocigido", idProducto);

    this.listaDetalleFactura = this.listaDetalleFactura.filter(producto => {
      return producto.catStock.id.idProductos != idProducto;
    })
    let totalvista = 0;
    for (var x in this.listaDetalleFactura) {

      totalvista += (this.listaDetalleFactura[x].valorTotal);
    }
    this.totalIngresoVista = "" + totalvista;
    this.totalVenta = "" + totalvista;



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

  showConsultar() {
    this.displayConsultar = true;
  }
  showCliente() {
    this.displayCliente = true;
  }

  getStockConsulta(id: number) {
    //console.log(this.idPuntosVenta)
    this.stockService.findStockInventarioPuntoVenta(id).subscribe(res => { this.stockConsulta = res }, err => console.log(err))
  }

  encontrarProductoModal(productoBuscar: any) {
   // console.log(productoBuscar.length)
    if (productoBuscar.length != 0) {
      this.stockService.findStockbyParametersPuntoVenta(this.idPuntosVenta, productoBuscar).subscribe(res => {
        this.stockConsulta = res;
      }, err => console.log(err));
    }
    else {
      this.getStockConsulta(this.idPuntosVenta);
    }

  }

  ingresarClienteModal() {
    //console.log(this.clientmodal)
  }

  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  //calcular descuento al total de la factura
  calcularDescuento($event: any) {
    this.porcentajeDescuentoSeleccionado = $event.target.value;


    this.subtotalFactura = Number(this.totalVentaAxuliar);

    let valorDescuento = Number(this.totalVentaAxuliar) * (Number(this.porcentajeDescuentoSeleccionado / 100));

    this.descuentoFactura = Number(valorDescuento.toFixed(2));
    this.totalVenta = String(Number(this.subtotalFactura) - Number(valorDescuento));

    //console.log(this.totalVenta);
  }

}
