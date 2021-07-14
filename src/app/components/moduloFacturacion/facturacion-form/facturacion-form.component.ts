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
  totalVenta: string = "0";
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
    this.idPuntosVenta = 14;
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


    if (this.cantidadDisponible < this.cantidad) {
      console.log("no hay cantidad suficiente para vender")

    } else {
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
        this.totalIngresoVista = "" + this.venDetalleFactura.cantidadFact * this.precioUnit;
        this.totalVenta = "" + this.venDetalleFactura.valorTotal;

        this.cantidadDisponible = this.cantidadDisponible - this.venDetalleFactura.cantidadFact;



        //enviamos una variable falsa si existe el productodespues de ingresar
        this.encuentraArray = false;

      } else {

        this.cantidadLista = 0;
        this.cantidadDisponible = 0;

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
            this.cantidadLista = this.listaDetalleFactura[x].cantidadFact;

            this.cantidadDisponible = this.cantidadConsulta - this.cantidadLista;

            console.log("cantidad consulta=>", this.cantidadConsulta)
            console.log("cantidad Lista=>", this.cantidadLista)
            console.log("cantidad Dsiponible=>", this.cantidadDisponible)

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

    this.codigoProducto = 0;
    this.buscarStockProducto();

  }


  inicializarVariables() {

    this.idProductoConsulta = 0;
    this.codigoProducto = 0;

    this.detalle = "";
    this.precioUnit = 0;
    this.precioMay = 0;
    this.precioDis = 0;
    this.cantidad = 0;
    this.totalIngresoVista = "0";
    this.totalVenta = "0";
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


  }
  async Vender() {


    let fecha = new Date()
    let fechaFormateada = fecha.getFullYear() + "-" + ("0" + (fecha.getMonth() + 1)).slice(-2) + "-" + (fecha.getDate() + 1);
    //console.log(fechaFormateada);
    this.auxiliarFacturaIngreso.fechaFactu = fechaFormateada;
    this.auxiliarFacturaIngreso.estado = "A";
    this.auxiliarFacturaIngreso.iva = 0;
    this.auxiliarFacturaIngreso.total = (Number(this.totalIngresoVista));
    this.auxiliarFacturaIngreso.usUser.idUsuario = 1;//Usuario logeaado 
    this.auxiliarFacturaIngreso.venCliente.idCliente = this.idClienteIngreso;

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


    console.log(this.auxiliarFacturaIngreso)
    await this.facturaService.saveFactura(this.auxiliarFacturaIngreso).subscribe(res => {
      console.log(res)
    }, err => console.log(err))

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

            console.log(cantidadConsulta)
            console.log(cantidadLista)
            console.log(restaCantidad)




            this.stockService.updateStockCantidadRest(Number(restaCantidad), this.listaDetalleFactura[i].catStock.id.idProductos, this.listaDetalleFactura[i].catStock.id.idPuntosVenta)
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

    this.inicializarVariables();
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



      } else {

        this.cantidadDisponible = 0;
        this.cantidadConsulta = 0;
        this.cantidadLista = 0;
        this.cantidadConsulta = result[0].cantidad;

        if (this.listaDetalleFactura.length == 0) {
          this.cantidadDisponible = this.cantidadConsulta;
        } else {

          for (let i = 0; i < this.listaDetalleFactura.length; i++) {
            if (this.listaDetalleFactura[i].catStock.id.idProductos == result[0].catProducto.idProductos
              && this.listaDetalleFactura[i].catStock.id.idPuntosVenta == 14
            ) {

              this.cantidadLista = Number(this.listaDetalleFactura[i].cantidadFact);
              this.cantidadDisponible = this.cantidadConsulta - this.cantidadLista;

              console.log("cantidad consulta=>", this.cantidadConsulta)
              console.log("cantidad Lista=>", this.cantidadLista)
              console.log("cantidad Dsiponible=>", this.cantidadDisponible)

              break;

            } else {
              this.cantidadDisponible = this.cantidadConsulta;
            }
          }
        }

        this.idProductoConsulta = Number(result[0].catProducto.idProductos);

        this.cantidad = 0;
        //this.cantidadDisponible = result[0].cantidad;
        this.precioDis = result[0].precioDistribuidor;
        this.precioMay = result[0].precioMayor;
        this.precioUnit = result[0].precioUnit;
        this.detalle = result[0].catProducto.catCategoria.nombreCategoria + " " +
          result[0].catProducto.catDiseno.nombre + " - " +
          result[0].catProducto.catTalla.medida + " ";

      }

    }, err => console.log(err))




  }




  ///Metodo de eliminar un producto de la lista que se va a vender
  eliminarProductodeList(idProducto: number) {

    console.log("este es el id del producto escocigido", idProducto);

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



}
