import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//Stock
import { cat_stock } from '../../../models/cat_stock';
import { CatStockService } from '../../../services/cat-stock.service';
//Productos
import { Productos } from '../../../models/catProducto';
import { ProductoService } from '../../../services/producto.service';
//PuntosVenta
import { PuntosVentas } from '../../../models/catPuntosVenta';
import { PuntosVentasService } from '../../../services/puntos-ventas.service';
//Tallas
import { Tallas } from '../../../models/catTalla';
import { MedidaService } from '../../../services/medida.service';
//Disenos
import { Disenos } from '../../../models/catDiseno';
import { DisenosService } from '../../../services/disenos.service';
// categoria 
import { Categorias } from '../../../models/catCategoria';
import { CategoriaService } from '../../../services/categoria.service';
//stockAuxiliar
import { cat_stockAuxiliar } from '../../../models/cat_stockAuxiliar';
import { NotificacionService } from '../../../services/notificacion.service';

declare let $: any;


@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  //productos
  producto: Productos;
  productoEscogida: any = [];
  //puntosventa
  puntosVenta: PuntosVentas;
  puntosVentaEscogida: any = [];
  //categorias
  categoria: Categorias;
  categoriaEscogida: any = [];
  //diesnos
  disenos: Disenos;
  disenosEscogida: any = [];
  //tallas
  tallas: Tallas;
  tallasEscogida: any = [];
  //productos
  productos: Productos = {

    catCategoria: { idCategoria: 0 },
    catTalla: { idTallas: 0 },
    catDiseno: { idDisenos: 0 }
  }
  //Variables del index
  
  idProductoPrueba: number = 0;
  idPuntoVentaPrueba: number;
  nombreCategoria:string="";
  

  stockAuxiliar: cat_stockAuxiliar = {
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
      }
    },
    catPuntosVenta: { idPuntosVenta: 0 },
    existe: '',
    precioDistribuidor: 0,
    precioMayor: 0,
    precioUnit: 0,
    stockMax: 0,
    stockMin: 0
  };
  stockAuxiliarLista: any[];
  //stock
  stocks: cat_stock = {
    id: {
      idProductos: 0,
      idPuntosVenta: 14
    },
    stockMax: 0,
    stockMin: 0,
    precioDistribuidor: 0,
    precioMayor: 0,
    precioUnit: 0,
    existe: '',

  }

  stocksEscogidos: any[];
  edit: boolean = false;


  constructor(private stockService: CatStockService,
    private productServices: ProductoService,
    private puntosVentaServices: PuntosVentasService,
    private categoriaservices: CategoriaService,
    private diesnosservice: DisenosService,
    private medidaservice: MedidaService,
    private activedrouter: ActivatedRoute, private router: Router,
    private notificacion: NotificacionService) { }

  ngOnInit() {
    this.stockAuxiliarLista = [];
    const params = this.activedrouter.snapshot.params;
    this.idPuntoVentaPrueba = 14;

    if (params.id) {
      this.stockService.getStock(params.id).subscribe(
        res => {
          if (res != null) {
            console.log(res);
            //this.productos = res;
            this.medidaservice.getTalla(this.producto.catTalla.idTallas).subscribe(
              res => {
                this.tallasEscogida = res;
                $('#tallas').select2(
                  {
                    placeholder: this.tallasEscogida.medida,
                    allowClear: true

                  }
                );
              }, error => console.error(error)
            );
            this.categoriaservices.getCategoria(this.producto.catCategoria.idCategoria).subscribe(
              res => {
                this.categoriaEscogida = res;
                $('#categorias').select2({
                  placeholder: this.categoriaEscogida.nombreCategoria,
                  allowClear: true
                });
              },
              error => console.error(error)
            );

            this.diesnosservice.getDiseno(this.producto.catDiseno.idDisenos).subscribe(
              res => {
                this.disenosEscogida = res;
                $('#disenos').select2({
                  placeholder: this.disenosEscogida.nombre,
                  allowClear: true
                });
              },
              error => console.error(error)
            );

            this.edit = true;

          } else {
            this.router.navigate(['/stock']);
          }

        },
        err => console.log("hay error " + err)
      )
    }
    this.getTallas();
    $('#tallas').select2(
      {
        placeholder: 'Tallas...',
        allowClear: true

      }
    );
    this.getCategorias();
    $('#categorias').select2(
      {
        placeholder: 'Categorias...',
        allowClear: true

      }
    );

    this.getDisenos();
    $('#disenos').select2(
      {
        placeholder: 'Disenos...',
        allowClear: true

      }
    );
  }

  //variables ingreso stock
  encuentraArray = false;
  cantidadConsulta = 0;
  async consultar() {

    if (this.testingreso()) {

      const PROMESAPRODUCTO = new Promise(async (resolve, rej) => {
        await this.productServices.getProducto(this.idProductoPrueba).subscribe(
          res => {
            resolve(res)
          }, err => console.error(err
          )
        )
      })


      const PROMESASPUNTOVENTA = new Promise(async (resolve, reject) => {
        await this.puntosVentaServices.getPuntosVenta(this.idPuntoVentaPrueba).subscribe(res => {
          resolve(res);
        }, err => console.log(err))
      })

      await PROMESAPRODUCTO.then(res => this.stockAuxiliar.catProducto = res)
      await PROMESASPUNTOVENTA.then(res => this.stockAuxiliar.catPuntosVenta = res)



      if (this.stockAuxiliarLista.length === 0) {

        this.stockAuxiliarLista.push(this.stockAuxiliar);
        this.encuentraArray = false;

      } else {
        /// recorrido for para verirficar si el producto ecxiste dentro del array
        for (var x in this.stockAuxiliarLista) {
          if (this.stockAuxiliarLista[x].catProducto.idProductos == this.stockAuxiliar.catProducto.idProductos
            && this.stockAuxiliarLista[x].catPuntosVenta.idPuntosVenta == this.stockAuxiliar.catPuntosVenta.idPuntosVenta
          ) {
            // sumatoria de la cantidad de un elemento encontrado
            this.stockAuxiliarLista[x].cantidad = Number(this.stockAuxiliarLista[x].cantidad) + Number(this.stockAuxiliar.cantidad);
            console.log(this.stockAuxiliarLista[x].cantidad)
            this.encuentraArray = true;
          }

        }
        // reiniciar valores para la nueva busqueda del elemento en el array
        if (this.encuentraArray) {

          this.encuentraArray = false;
        } else {
          //metodo push para apilar elemnto en el array
          this.stockAuxiliarLista.push(this.stockAuxiliar);
          this.encuentraArray = false;
        }

      }




      console.log(this.stockAuxiliarLista);
      this.stockAuxiliar = {
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
          }
        },
        catPuntosVenta: { idPuntosVenta: 0 },
        existe: '',
        precioDistribuidor: 0,
        precioMayor: 0,
        precioUnit: 0,
        stockMax: 0,
        stockMin: 0
      };


      console.log("se limpia")

    }
  }

  async ingresar() {

    for (let i = 0; i < this.stockAuxiliarLista.length; i++) {
      await this.stockService.getEncontrarStock(this.stockAuxiliarLista[i].catProducto.idProductos,
        this.stockAuxiliarLista[i].catPuntosVenta.idPuntosVenta).subscribe(async (res) => {
          if (res >= 0) {

            this.cantidadConsulta = Number(res);
            this.cantidadConsulta = this.cantidadConsulta + Number(this.stockAuxiliarLista[i].cantidad);
            await this.stockService.updateStockCantidad(this.cantidadConsulta,
              this.stockAuxiliarLista[i].catProducto.idProductos,
              this.stockAuxiliarLista[i].catPuntosVenta.idPuntosVenta).subscribe(res => {
                console.log("si se actualizo")
              }, err => console.log(err))
            this.cantidadConsulta = 0;

            console.log(res)
            console.log("si hay")

          } else {

            this.stocks.id.idProductos = this.stockAuxiliarLista[i].catProducto.idProductos;
            this.stocks.id.idPuntosVenta = this.stockAuxiliarLista[i].catPuntosVenta.idPuntosVenta;
            this.stocks.cantidad = this.stockAuxiliarLista[i].cantidad;
            this.stocks.stockMin = this.stockAuxiliarLista[i].stockMin;
            this.stocks.stockMax = this.stockAuxiliarLista[i].stockMax;
            this.stocks.precioMayor = this.stockAuxiliarLista[i].precioMayor;
            this.stocks.precioUnit = this.stockAuxiliarLista[i].precioUnit;
            this.stocks.precioDistribuidor = this.stockAuxiliarLista[i].precioDistribuidor;
            this.stocks.existe = 'S';



            await this.stockService.saveStock(this.stocks).subscribe(res => {
              console.log("si se ingreso nuevo stock")

              this.stocks = {
                id: {
                  idProductos: 0,
                  //cambiar este punto de venta automatico depues
                  idPuntosVenta: 14,
                },
                stockMax: 0,
                stockMin: 0,
                precioDistribuidor: 0,
                precioMayor: 0,
                precioUnit: 0,
                existe: '',

              }


            }, err => console.log(err))

            console.log("no hay")
          }
        }, err => console.log("salio error"))
    }

    this.router.navigate(['/stock']);

    
  }




  ////////////////////////////////////////////////////////////////////////////////////
  getTallas() {
    this.medidaservice.getTallas().subscribe(
      res => {
        this.tallas = res;
      }, error => console.error(error)
    );
  }

  getCategorias() {
    this.categoriaservices.getCategorias().subscribe(
      res => {
        this.categoria = res;

      }, error => console.error(error)
    );
  }

  getDisenos() {
    console.log("si entrte")
    this.diesnosservice.getDisenos().subscribe(
      res => {
        console.log(res)
        this.disenos = res;

      }, error => console.error(error)
    );
  }


  async testingreso() {

    // let idProducto = this.quitarespacios('#codigo');

    let cantidad = this.quitarespacios('#cantidad');
    let existe = "S";
    let precioUnit = this.quitarespacios('#PrecioUnit');
    let precioMay = this.quitarespacios('#PrecioMay')
    let precioDis = this.quitarespacios('#PrecioDis')
    let stockMax = this.quitarespacios('#stockMax');
    let stockMin = this.quitarespacios('#stockMin');

    let opcionTallas = this.quitarespacios('#talla');
    let opcionCategoria = this.quitarespacios('#categoria');
    let opcionDisenos = this.quitarespacios('#diseno');

    if (opcionTallas.length > 0 &&
      opcionCategoria.length > 0 &&
      opcionDisenos.length > 0) {


      this.stockAuxiliar.cantidad = cantidad;
      this.stockAuxiliar.existe = existe;
      this.stockAuxiliar.precioDistribuidor = precioDis;
      this.stockAuxiliar.precioMayor = precioMay;
      this.stockAuxiliar.precioUnit = precioUnit;
      this.stockAuxiliar.stockMax = stockMax;
      this.stockAuxiliar.stockMin = stockMin;


      //catProducto


      //  await this.productServices.getProducto(this.idProductoPrueba).subscribe(res => {
      //   this.stockAuxiliar.catProducto = res;
      //   console.log("producto"); 
      //   ///promesas ts  
      // },
      //   err => console.log(err))
      // //catPuntos venta


      // await this.puntosVentaServices.getPuntosVenta(this.idPuntoVentaPrueba
      // ).subscribe(res => {
      //   this.stockAuxiliar.catPuntosVenta = res;
      //   console.log("puntunto venta");
      // }, error => console.log(error))


      return true;
    } else {
      return false;
    }
  }

  updateStocks() { }

  quitarespacios(atributoHTML: string) {
    let obtenerletras = $(atributoHTML).val();
    return obtenerletras.trim();
  }
}
