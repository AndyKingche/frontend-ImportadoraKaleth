import { Component, OnInit, HostBinding, Output, EventEmitter, Input } from '@angular/core';

import { ActivatedRoute, Router } from "@angular/router";
import { CatStockService } from '../../services/cat-stock.service';
import { peDetallePedido } from '../../models/peDetallePedido';
import { peDetallePedidoAux } from 'src/app/models/peDetallePedidoAux';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
import { UsuariosService } from '../../services/usuarios.service';
import { ClientesService } from '../../services/clientes.service';
declare let $: any;
import { Usuarios } from '../../models/Usuarios';
import { Clientes } from 'src/app/models/Clientes';
import { Genero } from 'src/app/models/Genero';
import { Estadocivil } from 'src/app/models/Estadocivil';
import { GeneroService } from 'src/app/services/genero.service';
import { EstadoCivilService } from 'src/app/services/estado-civil.service';
import * as firebase from 'firebase/app';
import { LocationStrategy } from '@angular/common';
import { ParametrosService } from 'src/app/services/parametros.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  styles: [`
  .outofstock {
    font-size: 15pt;
      color: #FF5252;
      font-family: 'Montserrat-Regular';

  }

  .lowstock {
    font-size: 15pt;
      color: #FFA726;
      font-family: 'Montserrat-Regular';
  }

  .instock {
    font-size: 15pt;
      color: #66BB6A;
      font-family: 'Montserrat-Regular';
  }
  .badgeoutofstock{
    font-family: 'Montserrat-Regular';
    color: #ffffff;
    font-size: 15pt;
    text-align: center;
  }
  .badgeoutofstock .titulo__status--stock::before{
    font-family: 'Montserrat-Regular';
    content:'Agotado';
    font-size: 15pt;
    }
  .badgelowstock{
    font-family: 'Montserrat-Light';
    color: #ffffff;
    text-align: center;
    font-size: 15pt;
    }
    .badgelowstock .titulo__status--stock::before{
      font-family: 'Montserrat-Light';
      content:'Disponible';
      font-size: 15pt;
      }
    .badgeinstock{

  color: #ffffff;
  font-family: 'Montserrat-Light';
  text-align: center;
  font-size: 15pt;
  border-radius: 20px 20px 20px 20px;
      }
      .badgeinstock .titulo__status--stock::before{
        font-family: 'Montserrat-Light';
        content:'Disponible';
        }

  :host ::ng-deep .row-accessories {
      background-color: rgba(0,0,0,.15) !important;
  }
`
  ]
})
export class HomeComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  @Input()
  stock: any = [];
  stockAuxModal:cat_stockAuxiliar={
    cantidad: 0,
    catProducto: {
      idProductos:0,
      catCategoria:{ idCategoria:0,
        descripcion:'',
        nombreCategoria:''},
      catDiseno:{idDisenos:0,
        nombre:'',
        urlFoto:'',
        urlFoto1:'',
        urlFoto2:''},
      catTalla:{idTallas:0,
        medida:'',
        descripcion:'',
        tipo:''},
      //codProducto?:number,
      codProducto:''},
    catPuntosVenta: {idPuntosVenta:0,
      nombreLocal:'',
      direccion:'',
      ciudad:'',
      telefono:0,
      urlMapa:''},
    existe: '',
    precioDistribuidor: 0,
    precioMayor: 0,
    precioUnit: 0,
    stockMax: 0,
    stockMin: 0
  };

  mostrarCarrito: boolean = false;
  mostrarInicio: boolean = true
  isloading = false;
  constructor(private stockService: CatStockService,
    private productServices: ProductoService,
    private puntosVentaServices: PuntosVentasService,
    private categoriaservices: CategoriaService,
    private diesnosservice: DisenosService,
    private medidaservice: MedidaService,
    private activedrouter: ActivatedRoute, private router: Router,
    private notificacion: NotificacionService,
    private pedidoservice: PedidosService,
    private userService: UsuariosService,
    private clienteService: ClientesService,
    private generoService: GeneroService, private civilService: EstadoCivilService, private location: LocationStrategy,
    private sanitizer: DomSanitizer,
    private parametroServicio: ParametrosService) {
    activedrouter.params.subscribe(res => {
      this.ngOnInit();
    });
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }

  //varibales
  inicio: number = 0;
  numeroFilas: number = 12;
  cantidadExistente: number = 0;
  listaDetallePedido: peDetallePedido[];
  valorTotalCarrito: number = 0;
  cantidadNuevaAux: number = 0;

  //variables modale mostrar productos conm mas imagenes
  displayImagenes: boolean = false;
  stringUrlFoto1: string = "";
  stringUrlFoto2: string = "";
  stringUrlFoto3: string = "";

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
  //usuarios
  usuarioLogeado: Usuarios = {
    idUsuario: 0,
    apellido: "",
    cedula: "",
    direccion: "",
    email: "",
    estado: "",
    fechanacimiento: "",
    nombre: "",
    password: "",
    telefono: "",
    rol: 0,
    estadocivil: {},
    genero: {},
    resetPassword: false
  }
  //
  idCliente: number = 0;
  activarButton: boolean = true;
  activarSesion: boolean = false;
  puedeComprar: boolean = false;
  displayRegister: boolean = false;
  puedeRegistrarCliente: boolean = false;
  categoriaFiltro: Categorias;
  categoriaFiltroEscogido: any = [];
  disenoFiltro: Disenos;
  disenoFiltroEscogido: any = [];
  tallaFiltro: Tallas;
  tallaFiltroEscogido: any = [];
  usuariologeadosesion = "";

  //variables para el filtro más  dinamico
  nombredisenoFilro = null;
  nombrecategoriaFltro = null;
  medidaFiltro = null;
  //
  imagenObtenidaMostrar = null;
  async ngOnInit() {
    //this.getStocksExistents();
    await this.getParametros();
    await this.getStocksExistentsPuntoVenta();
    await this.getCantExistent();
    this.listaDetallePedido = [];
    this.listaCheckout = [];
    //this.getUserId();
    await this.getuserTOKEN();
    await this.getPuntosVentas();
     await this.getCategoria();
     await this.getDisenno();
    await this.getTallas();


  }
  linkLogin(){
    this.router.navigate(['/login'])
  }

  closesesion() {
    this.userService.deleteToken();
    this.activarButton = true;
    this.activarSesion = false;
    this.idCliente = 0;
    this.puedeComprar = false;
    this.router.navigate(['/home'])
    this.mostrarCarrito = false;
    this.mostrarInicio = true;
    this.valorTotalCarrito = 0;
  }
//Filtrar
  async getCategoria(){
    const  category= new Promise(async (resolve,reject)=>{
      await  this.categoriaservices.getCategorias().subscribe(res=>{
        resolve(res);
        
      })
    });

    await category.then(res=>{
      this.categoriaFiltro =res;
    }).catch(e=>console.log(e));
    
  
  }
  async getDisenno(){
    const dis = new Promise(async (resolve,reject)=>{
      await this.diesnosservice.getDisenos().subscribe(res=>{
        resolve(res)
        
      })
    });

    await  dis.then(res=>{
      this.disenoFiltro =  res;
    }).catch(e=>console.log(e));
   
    
  }
  async getTallas(){
    const sizeTalla= new Promise(async (resolve,reject)=>{
      await this.medidaservice.getTallas().subscribe(res=>{
        resolve(res);
      })
    })
    await sizeTalla.then(res=>{
      this.tallaFiltro =  res;
    }).catch(e=>console.log(e));
   
  }

  cambiarImagen(imagen:any){
    this.imagenObtenidaMostrar = imagen;
  }
  async mostrarTodosProductos(){
    await this.getStocksExistentsPuntoVenta();
    this.disenoFiltroEscogido = null;
    this.categoriaFiltroEscogido = null;
    this.tallaFiltroEscogido = null;
    this.nombrecategoriaFltro=null;
      this.nombredisenoFilro=null;
      this.medidaFiltro=null;
  }
 async encontrarProductoFiltrar() {
  let nombrediseno = '';
  let nombrecategoria = '';
  let medida = '';
if(Object.keys(this.disenoFiltroEscogido).length==0 &&
Object.keys(this.categoriaFiltroEscogido).length==0 &&
Object.keys(this.tallaFiltroEscogido).length==0
){
  this.notificacion.showInfo('Escoga por lo menos una opción', '**Filtrar')
}else{
  if(this.disenoFiltroEscogido.nombre!=null){
    nombrediseno = this.disenoFiltroEscogido.nombre;
  }else{
    nombrediseno = "vacio";
  }
  if(this.categoriaFiltroEscogido.nombreCategoria!=null){
    nombrecategoria = this.categoriaFiltroEscogido.nombreCategoria;
  }else{
    nombrecategoria = "vacio";
  }if(this.tallaFiltroEscogido.medida!=null){
    medida = this.tallaFiltroEscogido.medida;
  }else{
    medida = "vacio";
  }
  

    const productosExistentes = new Promise(async (resolve, reject) => {
      await this.stockService.stockfilter(nombrecategoria,nombrediseno, medida)
      .subscribe(res=>{
        resolve(res);
      }, err => console.error(err))

    });

    await productosExistentes.then(res => this.stock = res);
    
    nombrediseno = '';
    nombrecategoria = '';
    medida = ''; 

}
   

    
    
     
    
    
    //console.log(productoBuscar.length)
    // if (productoBuscar.length != 0) {
    //   // this.stockService.findStockbyParametersPuntoVenta(this.idPuntoVentaPrueba, productoBuscar).subscribe(res => {
    //   //   //this.stockConsulta = res;
    //   // }, err => console.log(err));
    // }
    // else {
    //   //this.consultarstockhabilitado(this.idPuntoVentaPrueba);
    // }

  }

  async getuserTOKEN() {

    let nuevoTOKEN = this.userService.getToken();
    if (nuevoTOKEN) {
      this.activarSesion = true;
      const userLoged = new Promise(async (resolve, reject) => {
        await this.userService.usuarioSINo(nuevoTOKEN).subscribe(res => {
          resolve(res)
        }, err => console.log(err))
      });

      const getNewCliente = new Promise(async (resolve, reject) => {
        await userLoged.then(async (result) => {
          this.usuariologeadosesion = `${result[0].nombre} ${result[0].apellido}`
          await this.clienteService.findClienteByEmail(result[0].email).subscribe(
            res => {
              resolve(res)
            }, err => console.log(err)
          )
        })
      });
      await getNewCliente.then(res =>{ this.idCliente = res[0].idCliente}).catch(e=>console.log(e));
      if (this.idCliente) {
        this.puedeComprar = true;
      } else {
        this.router.navigate(['/login'])
      }
      this.activarButton = false;





    } else {

      this.puedeComprar = false;
    }

  }
  ShowCarrito() {

    if (this.puedeComprar) {
      this.mostrarCarrito = true;
      this.mostrarInicio = false;
      this.listanuevaCarrito();
    } else {
      this.router.navigate(['/login']);
    }


  }

  ShowInicio() {
    this.mostrarCarrito = false;
    this.mostrarInicio = true;
    this.router.navigateByUrl("productos")
  }
  enviarLista() {

    //this.nuevaListaDetallePedidio.emit(this.listaDetallePedido);
  }
  async paginate(event) {


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

    //this.getStocksExistents();
    await this.getStocksExistentsPuntoVenta();
  }

  async getStocksExistentsPuntoVenta() {
    
    const productosExistentes = new Promise(async (resolve, reject) => {
      await this.stockService.getStockAllExistPuntoVenta(this.idPuntosVentaStockMostrar, this.inicio, this.numeroFilas).toPromise().then(res => {
        resolve(res);
        
      }, err => console.error(err))

    });

    await productosExistentes.then(res => {this.stock = res}).catch(e=>console.log(e));
    
    // this.stockService.getStockAllExistPuntoVenta(this.idPuntosVentaStockMostrar, this.inicio, this.numeroFilas).subscribe(
    //   res => {

    //     this.stock = res;
    //   }, err => console.error(err)

    // );

   
  }

  async getStocksExistents() {
    const existentes = new Promise(async (resolve,reject)=>{
      await  this.stockService.getAllStockExistents(this.inicio, this.numeroFilas).subscribe(
        res => {
  
          resolve(res);
          
        }, err => console.error(err)
  
      );
    });
    
    await existentes.then(res=>{
      this.stock = res;
    }).catch(e=>console.log(e));
   
  }

  imprimirProductos() {

  }
  async getCantExistent() {
    const cantidadExiste = new Promise(async (resolve,reject)=>{
      await this.stockService.getCantExistents().subscribe(
        res => {
  
          resolve(res)

        }, err => console.error(err)
  
      );
    });

    await cantidadExiste.then(res=>{
      this.cantidadExistente = Number(res);
      this.cantidadExistente = Math.ceil((this.cantidadExistente) / 12);
    }).catch(e=>console.log(e));
    
  }



  quitardelista(idproduct: number, idpuntoventa: number) {

    for (let x in this.listaCheckout) {
      if (Number(this.listaCheckout[x].catProducto.idProductos) === idproduct && Number(this.listaCheckout[x].catPuntosVenta.idPuntosVenta) === idpuntoventa) {

        this.listaCheckout.splice(Number(x), 1);


        break;
      }
    }

    for (let x in this.listaDetallePedido) {

      if (Number(this.listaDetallePedido[x].catStock.id.idProductos) === idproduct && Number(this.listaDetallePedido[x].catStock.id.idPuntosVenta) === idpuntoventa) {

        this.listaDetallePedido.splice(Number(x), 1);


        break;
      }
    }

    //for para calcular el total del carrito
    this.valorTotalCarrito = 0;
    for (var x in this.listaDetallePedido) {

      this.valorTotalCarrito = this.valorTotalCarrito + this.listaDetallePedido[x].valorTotal;
    }

  }

  async getUserId() {

    const userLoged = new Promise(async (resolve, reject) => {
      await this.userService.getUserLogged().subscribe(async (res) => {
        resolve(res)
      })
    });

    const getNewCliente = new Promise(async (resolve, reject) => {
      await userLoged.then(async (result) => {
        await this.clienteService.findClienteByEmail(result[0].email).subscribe(
          res => {
            resolve(res)
          }, err => console.log(err)
        )
      })
    });
    await getNewCliente.then(res => this.idCliente =  res[0].idCliente).catch(e=>console.log(e));
    this.activarButton = false;

  }

  //agregar productos a carrito
  async Agregar(objeto: any) {

    //await this.getUserId();
    if (this.puedeComprar) {

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

            
            this.listaDetallePedido[x].cantidadPe++;
            this.notificacion.showInfo(this.peDetallePedido.descripcion+'\nCantidad: '+this.listaDetallePedido[x].cantidadPe,'Se Agrego al Carrito')
            
            let TotalAux = 0;

            TotalAux = this.listaDetallePedido[x].cantidadPe * this.listaDetallePedido[x].valorUnit;

            this.listaDetallePedido[x].valorTotal = TotalAux;

            this.encuentraArray = true;




          }

          this.valorTotalCarrito = this.valorTotalCarrito + this.listaDetallePedido[x].valorTotal;
        }
        if (this.encuentraArray) {
          // reiniciar valores para la nueva busqueda del elemento en el array para el siguiente proceso
          this.encuentraArray = false;


        } else {
          //si no existe el producto ingresa un nuevo elemento en el array
          //metodo push para apilar elemnto en el array


          this.listaDetallePedido.push(this.peDetallePedido);

          //for para calcular el total del carrito
          this.valorTotalCarrito = 0;
          for (var x in this.listaDetallePedido) {

            this.valorTotalCarrito = this.valorTotalCarrito + this.listaDetallePedido[x].valorTotal;
          }

          this.encuentraArray = false;
        }



      }

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
      //this.idCliente=0;
      //this.auxcantidadPedido = 0;
      //this.cantidadPedido = 0;
      
    } else {
      this.router.navigateByUrl('login')
    }
    //hasta aqui

  }


  obtenerCantidad(cantidad: number, idProducto: number, idPuntoVenta: number) {
    this.cantidadPedido = cantidad;


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

        this.auxPedidoDetalle.cantidadPe = Number(this.listaDetallePedido[x].cantidadPe);
        this.auxPedidoDetalle.valorTotal = this.listaDetallePedido[x].valorTotal;
        this.auxPedidoDetalle.valorUnit = this.listaDetallePedido[x].valorUnit;
        this.auxPedidoDetalle.descripcion = this.listaDetallePedido[x].descripcion;
        if (this.listaCheckout.length == 0) {

          this.listaCheckout.push(this.auxPedidoDetalle);
          this.encuentraArray = false;
        } else {

          for (let y in this.listaCheckout) {
            if (this.listaCheckout[y].catProducto.idProductos == this.auxPedidoDetalle.catProducto.idProductos
              && this.listaCheckout[y].catPuntosVenta.idPuntosVenta == this.auxPedidoDetalle.catPuntosVenta.idPuntosVenta
            ) {



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


            this.listaCheckout.push(this.auxPedidoDetalle);

            this.encuentraArrayCarrito = false;
          }

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
    if (this.listaCheckout.length === 0) {

      this.notificacion.showWarning('No tiene pedidos para realizar', 'Warning');


    } else {
      let idfacturaPedidoPDF = 0;
      let idClientePedido = 0;
      this.isloading = true;
      let fecha = new Date()
      let fechaFormateada = fecha.getFullYear() + "-" + ("0" + (fecha.getMonth() + 1)).slice(-2) + "-" + ("0" + (fecha.getDate() + 1)).slice(-2);
      this.cabezaPedidoIngreso.estado = "A",
        //this.cabezaPedidoIngreso.total=0;
        this.cabezaPedidoIngreso.fechaPe = fechaFormateada;
      this.cabezaPedidoIngreso.venCliente.idCliente = this.idCliente;
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



      const obtenerIdCabezaPedido = new Promise(async (resolve, reject) => {
        await this.pedidoservice.saveOrder(this.cabezaPedidoIngreso).subscribe(res => {

          resolve(res.idCabezaPe)
        }, err => console.log(err))
      })


      idfacturaPedidoPDF = await obtenerIdCabezaPedido.then(res => Number(res));

      setTimeout(() => {
        this.notificacion.showInfo('Su Pedido se realizo con exito', "PEDIDO REALIZADO");
        this.listaDetallePedido = [];
        this.listaCheckout = [];
      }, 200);


      this.valorTotalCarrito = 0;

      //generar pdf proforma del pedido realizado
      // window.open(`/api/order/report/${idClientePedido}/${idfacturaPedidoPDF}`, "_blank");
      this.pedidoservice.orderreport(idClientePedido, idfacturaPedidoPDF).subscribe(res => {
        let pdfWindow = window.open("")
        pdfWindow.document.write(
          "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
          encodeURI(res[0]) + "'></iframe>"
        )
        this.isloading = false;
        this.router.navigateByUrl("#productos");
        this.mostrarInicio = true;
        this.mostrarCarrito = false;
      },
        err => console.log(err));
    }


  }

  images: any[];
  detalle: string = "";
  detalle2: string = "";
  precioModal: number = 0;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  // mostrar imagenes completas
  showDialogImagenes(stocks: any) {
    this.stockAuxModal = stocks;
    console.log(this.stockAuxModal);
    this.images = [];

    // this.stringUrlFoto1 = stocks.catProducto.catDiseno.urlFoto;
    this.imagenObtenidaMostrar = this.stockAuxModal.catProducto.catDiseno.urlFoto;
    // this.stringUrlFoto2 = stocks.catProducto.catDiseno.urlFoto1;
    // this.stringUrlFoto3 = stocks.catProducto.catDiseno.urlFoto2;


    this.detalle = stocks.catProducto.catCategoria.nombreCategoria + " " + stocks.catProducto.catDiseno.nombre + " Talla: " + stocks.catProducto.catTalla.medida;
    this.detalle2 = stocks.catProducto.catCategoria.descripcion;

    this.precioModal = stocks.precioUnit;

    //cargo una lista de las rutas de las imagenes


    this.images = [
      { urlFoto: this.stringUrlFoto1 },
      { urlFoto: this.stringUrlFoto2 },
      { urlFoto: this.stringUrlFoto3 }];

    this.displayImagenes = true

  }
  //Obtener los puntos de vemnta para mostrar en el hom de los locales fisicos existentes
  puntosVentas: any = [];
  urlSafe: SafeResourceUrl;

  async getPuntosVentas() {
    const puntoV = new Promise(async (resolve,reject)=>{
    await  this.puntosVentaServices.getPuntosVentas().subscribe(
  res => {
    resolve(res);
   
  }, err => console.error(err)

);
    });

    await puntoV.then(res=>{
      this.puntosVentas = res;
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(res[0].urlMapa);
    }).catch(e=>console.log(e));
    
   
  }


  //obtener los datos de parametros para las vistas
  parametros: any = [];
  idParametro = 0;
  textoBanner = '';
  mensajePuntosVenta = '';
  fraseFooter = '';
  tituloServicios = '';
  servicio1 = '';
  servicio2 = '';
  servicio3 = '';
  servicio4 = '';
  servicio5 = '';
  tituloInformacion = '';
  telefono = '';
  celular = '';
  correo1 = '';
  correo2 = '';
  direccion = '';
  urlFotoBanner1 = '';
  urlFotoBanner2 = '';
  urlFotoBanner3 = '';
  conocenos = '';
  mision = '';
  vision = '';
  idPuntosVentaStockMostrar = 0;

  async getParametros() {
    const parametros = new Promise (async (resolve,reject)=>{
      await this.parametroServicio.gerParametros().subscribe(
        res => {
          resolve(res)
        },
        err => console.error(err)
      );
    });
     await parametros.then(res=>{
       
      this.parametros = res;
      this.parametros = res;
      this.idParametro = res[0].idParametro;
      this.textoBanner = res[0].textoBanner;
      this.mensajePuntosVenta = res[0].mensajePuntosVenta;
      this.fraseFooter = res[0].fraseFooter;
      this.tituloServicios = res[0].tituloServicios;
      this.servicio1 = res[0].servicio1;
      this.servicio2 = res[0].servicio2;
      this.servicio3 = res[0].servicio3;
      this.servicio4 = res[0].servicio4;
      this.servicio5 = res[0].servicio5;
      this.tituloInformacion = res[0].tituloInformacion;
      this.telefono = res[0].telefono;
      this.celular = res[0].celular;
      this.correo1 = res[0].correo1;
      this.correo2 = res[0].correo2;
      this.direccion = res[0].direccion;
      this.urlFotoBanner1 = res[0].urlFotoBanner1;
      this.urlFotoBanner2 = res[0].urlFotoBanner2;
      this.urlFotoBanner3 = res[0].urlFotoBanner3;
      this.conocenos = res[0].conocenos;
      this.mision = res[0].mision;
      this.vision = res[0].vision;
      this.idPuntosVentaStockMostrar = Number(res[0].idPuntosVentaStock);
     }).catch(e=>console.log(e));
    
  }

  async isEnableCategoria(cat:any){
    if(cat==null){
      this.nombrecategoriaFltro = null;
      if(this.nombrecategoriaFltro==null && this.nombredisenoFilro==null && this.medidaFiltro == null ){
        await this.mostrarTodosProductos();

      }else{
        if(this.medidaFiltro==null){
          this.medidaFiltro = 'vacio';
         
        }
        if(this.nombredisenoFilro ==null){
          this.nombredisenoFilro = 'vacio';
        }
        const productosExistentes = new Promise(async (resolve, reject) => {
          await this.stockService.stockfilter( 'vacio',this.nombredisenoFilro, this.medidaFiltro)
          .subscribe(res=>{
            resolve(res);
          }, err => console.error(err))
    
        });
    
        await productosExistentes.then(res => this.stock = res);

        if(this.medidaFiltro== 'vacio'){
          this.medidaFiltro = null;
         
        }
        if(this.nombredisenoFilro == 'vacio'){
          this.nombredisenoFilro = null;
        }
        
      }
    }else{
      this.nombrecategoriaFltro = cat.nombreCategoria;
      
      if(this.nombredisenoFilro==null){
        this.nombredisenoFilro = 'vacio';
      }
      if(this.medidaFiltro==null){
        this.medidaFiltro = 'vacio';
      }
      const productosExistentes = new Promise(async (resolve, reject) => {
        await this.stockService.stockfilter(cat.nombreCategoria,this.nombredisenoFilro, this.medidaFiltro)
        .subscribe(res=>{
          resolve(res);
        }, err => console.error(err))
  
      });
  
      await productosExistentes.then(res => this.stock = res);
     
      if(this.nombredisenoFilro== 'vacio'){
        this.nombredisenoFilro = null;
      }
      if(this.medidaFiltro== 'vacio'){
        this.medidaFiltro = null;
      }
    }
  }


  async isEnableDiseno(dis:any){
    if(dis==null){
      this.nombredisenoFilro = null;
      if(this.nombrecategoriaFltro==null && this.nombredisenoFilro==null && this.medidaFiltro == null ){
        await this.mostrarTodosProductos();

      }else{
        if(this.nombrecategoriaFltro==null){
          this.nombrecategoriaFltro = 'vacio';
        }
        if(this.medidaFiltro ==null){
          this.medidaFiltro = 'vacio';
        }
        const productosExistentes = new Promise(async (resolve, reject) => {
          await this.stockService.stockfilter( this.nombrecategoriaFltro,'vacio', this.medidaFiltro)
          .subscribe(res=>{
            resolve(res);
          }, err => console.error(err))
    
        });
    
        await productosExistentes.then(res => this.stock = res);
        if(this.nombrecategoriaFltro== 'vacio'){
          this.nombrecategoriaFltro = null;
        }
        if(this.medidaFiltro == 'vacio'){
          this.medidaFiltro = null;
        }      
      }

    }else{
      this.nombredisenoFilro = dis.nombre;
      if(this.nombrecategoriaFltro==null){
        this.nombrecategoriaFltro = 'vacio';
      }
      if(this.medidaFiltro==null){
        this.medidaFiltro = 'vacio';
      }
      const productosExistentes = new Promise(async (resolve, reject) => {
        await this.stockService.stockfilter(this.nombrecategoriaFltro,dis.nombre, this.medidaFiltro)
        .subscribe(res=>{
          resolve(res);
        }, err => console.error(err))
  
      });
  
      await productosExistentes.then(res => this.stock = res);

      if(this.nombrecategoriaFltro== 'vacio'){
        this.nombrecategoriaFltro = null;
      }
      if(this.medidaFiltro == 'vacio'){
        this.medidaFiltro = null;
      }
    }

  }

  async isEnableMedida(med:any){
    if(med==null){
      this.medidaFiltro = null;
      if(this.nombrecategoriaFltro==null && this.nombredisenoFilro==null && this.medidaFiltro == null ){
        await this.mostrarTodosProductos();

      }else{
        if(this.nombrecategoriaFltro==null){
          this.nombrecategoriaFltro = 'vacio';
        }
        if(this.nombredisenoFilro ==null){
          this.nombredisenoFilro = 'vacio';
        }
        const productosExistentes = new Promise(async (resolve, reject) => {
          await this.stockService.stockfilter( this.nombrecategoriaFltro,this.nombredisenoFilro, 'vacio')
          .subscribe(res=>{
            resolve(res);
          }, err => console.error(err))
    
        });
    
        await productosExistentes.then(res => this.stock = res);
        if(this.nombrecategoriaFltro== 'vacio'){
          this.nombrecategoriaFltro = null;
        }
        if(this.nombredisenoFilro == 'vacio'){
          this.nombredisenoFilro = null;
        }
      }
    }else{
      this.medidaFiltro = med.medida;
      if(this.nombrecategoriaFltro==null){
        this.nombrecategoriaFltro = 'vacio';
      }
      if(this.nombredisenoFilro ==null){
        this.nombredisenoFilro = 'vacio';
      }
      const productosExistentes = new Promise(async (resolve, reject) => {
        await this.stockService.stockfilter( this.nombrecategoriaFltro,this.nombredisenoFilro, med.medida)
        .subscribe(res=>{
          resolve(res);
        }, err => console.error(err))
  
      });
  
      await productosExistentes.then(res => this.stock = res);
      if(this.nombrecategoriaFltro== 'vacio'){
        this.nombrecategoriaFltro = null;
      }
      if(this.nombredisenoFilro == 'vacio'){
        this.nombredisenoFilro = null;
      }
      
    }
  }

}


