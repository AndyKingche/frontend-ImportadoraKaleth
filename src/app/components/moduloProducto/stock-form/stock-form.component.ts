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
import { resolve } from 'url';


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
  categoriaSelectSearch: Categorias = {
    idCategoria: 0,
    descripcion: '',
    nombreCategoria: ''
  };
  categoriaAux: Categorias = {
    idCategoria: 0,
    descripcion: '',
    nombreCategoria: ''
  }
  //diesnos
  disenos: Disenos;
  disenosEscogida: any = [];
  disenosSelectSearch: Disenos = {
    idDisenos: 0,
    nombre: ''
  };
  disenosAux: Disenos = {
    idDisenos: 0,
    nombre: ''
  }
  //tallas
  tallas: Tallas;
  tallasEscogida: any = [];
  tallasSelectSearch: Tallas = {
    idTallas: 0,
    medida: '',
    descripcion: '',
    tipo: ''
  };
  tallasAux: Tallas = {
    idTallas: 0,
    medida: '',
    descripcion: '',
    tipo: ''
  }
  //productos
  productos: Productos = {

    catCategoria: { idCategoria: 0 },
    catTalla: { idTallas: 0 },
    catDiseno: { idDisenos: 0 }
  }
  //Variables del index

  idProductoPrueba: number = 0;
  idPuntoVentaPrueba: number;
  nombreCategoria: string = "";
  nombreDiseno: string = "";
  nombreTalla: string = "";

  cantidad: number = 0;
  stockMin: number = 0;
  stockMax: number = 0;
  precioUnit: number = 0;
  precioMay: number = 0;
  precioDis: number = 0;
  totalIngresoVista: string = "0";
  totalValorIngreso = 0;
  idProductoencontrado: number = 0;

  //////////////////////////////////////////
  productonuevo: any = {

    catCategoria: { idCategoria: 0 },
    catTalla: { idTallas: 0 },
    catDiseno: { idDisenos: 0 },
    codProducto: 0
  }

  ////////////////////////////////////////
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
  stocksAux: cat_stock = {
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

  displayCategoria: boolean = false;
  displayDiseno: boolean = false;
  displayTalla: boolean = false;

  /////Variables de las ventana modal
  ingresoCategoria: string = '';
  ingresoDiseno: string = "";
  ingresoTalla: String = "";

  //varaibake ara obtener el objecto del select

  toStr: any = JSON.stringify;

  //Boolean para el nombre repesido
  nombreCategoriaexiste: boolean = false;
  medidaexiste: boolean = false;
  nombredisenoexiste: boolean = false;


  constructor(private stockService: CatStockService,
    private productServices: ProductoService,
    private puntosVentaServices: PuntosVentasService,
    private categoriaservices: CategoriaService,
    private diesnosservice: DisenosService,
    private medidaservice: MedidaService,
    private activedrouter: ActivatedRoute, private router: Router,
    private notificacion: NotificacionService

  ) { }


  showDialogCategoria() {
    this.displayCategoria = true;
  }
  showDialogDiseno() {
    this.displayDiseno = true;
  }
  showDialogTalla() {
    this.displayTalla = true;
  }


  ngOnInit() {
    this.stockAuxiliarLista = [];

    const params = this.activedrouter.snapshot.params;
    this.idPuntoVentaPrueba = 14;
    this.totalIngresoVista = "0";

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
    // $('#categorias').select2(
    //   {
    //     placeholder: 'Categorias...',
    //     allowClear: true

    //   }
    // );

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

  //variables de ingreso cuando no existe un producto 
  idCategoriaIngreso = 0;
  idCategoriaEscogida = 0;
  idDisenoIngreso = 0;
  idDiseñoEscogido = 0;
  idTallaIngreso = 0;
  idTallaEscogido = 0;
  idProductoIngreso = 0;
  iddatosingresados: any = {
    idCategoriaIngreso: 0,
    idDisenoIngreso: 0,
    idTallaIngreso: 0
  }

  categoriasIngreso: Categorias = {
    idCategoria: 0,
    descripcion: "",
    nombreCategoria: ""
  }


  disenosIngreso: Disenos = {
    idDisenos: 0,
    nombre: ""
  }
  tallasIngreso: Tallas = {
    idTallas: 0,
    medida: "",
    descripcion: "",
    tipo: ""
  }
  productosIngreso: Productos = {
    idProductos: 0,
    catCategoria: {
      idCategoria: 0,
      descripcion: "",
      nombreCategoria: ""
    },
    catDiseno: {
      idDisenos: 0,
      nombre: ""
    },
    catTalla: {
      idTallas: 0,
      medida: "",
      descripcion: "",
      tipo: ""
    },
    codProducto: 0
  }


  /////////tomar el nombre de la lista de diseños
  async changedCategoria(event: any) {
    const IDCAT = new Promise(async (resolve, reject) => {
      await this.categoriaservices.findbynombre(this.categoriaSelectSearch.nombreCategoria)
        .subscribe(res => {
          resolve(res);
        })
    });

    await IDCAT.then(res => {
      this.categoriaSelectSearch.idCategoria = Number(res)
    }).catch(err => console.error(err));

    if (this.categoriaSelectSearch.idCategoria > 0) {
      this.idCategoriaEscogida = this.categoriaSelectSearch.idCategoria;
      this.nombreCategoriaexiste = true;
    } else {
      this.nombreCategoria = this.categoriaSelectSearch.nombreCategoria;
      this.idCategoriaEscogida = this.categoriaSelectSearch.idCategoria;
      this.nombreCategoriaexiste = false;
    }
  }

  async changedDiseno(value) {

    const IDDIS = new Promise(async (resolve, reject) => {
      await this.diesnosservice.
        findbynombre(this.disenosSelectSearch.nombre)
        .subscribe(res => {
          resolve(res);
        })
    });

    await IDDIS.then(res => { this.disenosSelectSearch.idDisenos = Number(res) });

    if (this.disenosSelectSearch.idDisenos > 0) {
      this.idDiseñoEscogido = this.disenosSelectSearch.idDisenos;
      this.nombredisenoexiste = true;
    } else {
      this.nombreDiseno = this.disenosSelectSearch.nombre;
      this.idDiseñoEscogido = this.disenosSelectSearch.idDisenos;
      this.nombredisenoexiste = false;
    }

  }
  async changedTalla(value: any) {

    console.log("=====", this.tallasSelectSearch.medida)

    const IDTALLA = new Promise(async (resolve, reject) => {

      await this.medidaservice.findbynombre(this.tallasSelectSearch.medida)
        .subscribe(res => {

          resolve(res)
        }
          , err => console.log(err));
    })
    await IDTALLA.then(res => { this.tallasSelectSearch.idTallas = Number(res) })
      .catch(err => console.log(err))
    if (this.tallasSelectSearch.idTallas > 0) {
      this.idTallaEscogido = this.tallasSelectSearch.idTallas;
      this.medidaexiste = true;
    } else {
      this.idTallaEscogido = this.tallasSelectSearch.idTallas;
      this.nombreTalla = this.tallasSelectSearch.medida;
      this.medidaexiste = false;
    }
  }
  ////// METODOS PARA AGREGAR NUEVAS CATEGORIAS, DISEÑOS, TALLAS AL ARRAY
  ingresarCategoria(categories: string) {
    this.ingresoCategoria = categories;

  }
  ingresarpushCategoria() {
    if (this.ingresoCategoria.length != 0) {
      let categoriaAuxiliar = {
        idCategoria: 0,
        nombreCategoria: this.ingresoCategoria,
        descripcion: ""
      }
      this.categoriaEscogida.push(categoriaAuxiliar);

      console.log("ingrese categoria lista=>", this.categoriaEscogida)
      this.displayCategoria = false;
    } else {
      this.notificacion.showError('Asegurese de llenar todos los campos !', 'Imposible Ingresar Nueva Talla');
    }

  }
  ingresarDiseno(diseno: string) {
    this.ingresoDiseno = diseno;

  }
  ingresarpushDiseno() {


    if (this.ingresoDiseno.length != 0) {
      let disenoAuxiliar = {
        idDisenos: 0,
        nombre: this.ingresoDiseno
      }
      this.disenosEscogida.push(disenoAuxiliar);

      console.log("ingrese Diseño lista=>", this.disenosEscogida)
      this.displayDiseno = false;
    } else {
      this.notificacion.showError('Asegurese de llenar todos los campos !', 'Imposible Ingresar Nueva Talla');
    }

  }
  ingresarTalla(talla: string) {
    this.ingresoTalla = talla;

  }
  ingresarpushTalla() {
    // console.log("este es el ingreso",this.ingresoTalla)
    if (this.ingresoTalla.length != 0) {
      let tallaAuxiliar = {
        idTallas: 0,
        descripcion: "",
        medida: this.ingresoTalla,
        tipo: ""
      }
      this.tallasEscogida.push(tallaAuxiliar);

      console.log("ingrese talla lista=>", this.tallasEscogida)
      this.displayTalla = false;

    } else {
      this.notificacion.showError('Asegurese de llenar todos los campos !', 'Imposible Ingresar Nueva Talla')
    }

  }


  async consultar() {
    //   ////  this.codigoProducto(no hay)

    const IDPRODUCTOINPUT = new Promise(async (resolve, reject) => {
      await this.productServices.findproductobycodigo(this.idProductoPrueba).subscribe((res) => {
        resolve(res)
        console.log("idProductos consulta", res)

      }, err => console.log(err))
    });


    await IDPRODUCTOINPUT.then(async (res) => {
      console.log("Entre=>1")
      if (Number(res) == -1) {
        /////
        //if si escoge una categoria con el codigo existente solo ingresar ese de lo contrario crear 

        if (this.idCategoriaEscogida != 0) {
          this.idCategoriaIngreso = this.idCategoriaEscogida;// guarda el mismo valor 
        } else {


          // de lo contrario si el codigo de la categoria es 0 crear categoria 
          /////
          if (this.nombreCategoriaexiste) {
            console.log("SI EXISTE NO SE PUEDE CREAR")
          } else {
            console.log("NO existe si SE PUEDE CREAR")
            //ingreso de categorias solo se ingresa el nombre
            this.categoriasIngreso.nombreCategoria = this.nombreCategoria;

            console.log("categoria", this.categoriasIngreso)
            const CATEGORIAIDNUEVO = new Promise(async (resolve, reject) => {
              await this.categoriaservices.saveCategoria(this.categoriasIngreso).subscribe(
                res => {
                  resolve(res.idCategoria);
                  console.log("categoria ingre", res)
                  setTimeout(() => {
                    this.notificacion.showSuccess('La categoria se ha agregado correctamente', 'Categoria agregada');
                  }, 100)

                }, error => console.error(error)
              );
            })

            await Promise.resolve(CATEGORIAIDNUEVO).then(res => {
              this.idCategoriaIngreso = Number(res)
              console.log("id Categoria", this.idCategoriaIngreso)
            });

          }

          console.log("Entre=>2")



        }
        ///validación si el diseño ya existe 
        if (this.idDiseñoEscogido != 0) {
          this.idDisenoIngreso = this.idDiseñoEscogido;// guarda el mismo valor 
        } else {

          //ingreso de diseño solo se ingresa el nombre del diseño 
          this.disenosIngreso.nombre = this.nombreDiseno;
          console.log("diseños", this.disenosIngreso)
          const DISENOIDNUEVO = new Promise(async (resolve, reject) => {
            await this.diesnosservice.saveDiseno(this.disenosIngreso).subscribe(
              res => {

                resolve(res.idDisenos);
                console.log("diseno ingre", res)
                setTimeout(() => {
                  this.notificacion.showSuccess('El diseno se ha agregado correctamente', 'Diseno agregado');
                }, 100)

              }, error => console.error(error)
            );
          })


          await Promise.resolve(DISENOIDNUEVO).then(res => {
            this.idDisenoIngreso = Number(res)
            console.log("id Diseño", this.idDisenoIngreso)
          });
        }


        ///validación si la talla ya existe 
        if (this.idTallaEscogido != 0) {
          this.idTallaIngreso = this.idTallaEscogido;// guarda el mismo valor 
        } else {
          //ingreso talla, solo se ingresa la medida
          this.tallasIngreso.medida = this.nombreTalla;
          console.log("tallas ", this.tallasIngreso)
          const TALLAIDNUEVO = new Promise(async (resolve, reject) => {

            await this.medidaservice.saveTalla(this.tallasIngreso).subscribe(
              res => {
                resolve(res.idTallas);
                console.log("talla ingre", res)
                setTimeout(() => {
                  this.notificacion.showSuccess('La talla/medida se ha agregado correctamente', 'Medida agregada');
                }, 200)

              }, error => console.error(error)
            );
          })



          await Promise.resolve(TALLAIDNUEVO).then(res => {
            this.idTallaIngreso = Number(res)
            console.log("id Talla", this.idTallaIngreso)
          });

        }
        //////////vamos a obtener los valores de cadaa uno de los ids de los ultimos ingresados

        // await Promise.resolve(CATEGORIAIDNUEVO).then(res => {
        //   this.idCategoriaIngreso = Number(res)
        //   console.log("id Categoria", this.idCategoriaIngreso)
        // });
        // await Promise.resolve(DISENOIDNUEVO).then(res => {
        //   this.idDisenoIngreso = Number(res)
        //   console.log("id Diseño", this.idDisenoIngreso)
        // });
        // await Promise.resolve(TALLAIDNUEVO).then(res => {
        //   this.idTallaIngreso = Number(res)
        //   console.log("id Talla", this.idTallaIngreso)
        // });


        //lenamos el prodcuto (codigoProducto,idCategoria,idDiseño,idTalla),

        console.log("cat x->")
        console.log(" cat", this.idCategoriaIngreso, "dise", this.idDisenoIngreso, "talla", this.idTallaIngreso)


        this.productonuevo = {

          catCategoria: { idCategoria: this.idCategoriaIngreso },
          catTalla: { idTallas: this.idTallaIngreso },
          catDiseno: { idDisenos: this.idDisenoIngreso },
          codProducto: this.idProductoPrueba
        }
        const PRODUCTOIDNUEVO = new Promise(async (resolve, reject) => {
          await this.productServices.saveProducto(this.productonuevo).subscribe(res => {
            console.log(res.idProductos)
            resolve(res.idProductos)
          }, err => console.log(err))
        })

        await PRODUCTOIDNUEVO.then(res => this.idProductoIngreso = Number(res));

        console.log("id producto nuevo ingresado", this.idProductoIngreso)
        this.idProductoencontrado = this.idProductoIngreso;
      }
      console.log("Entre=>3")

    }).catch(err => console.log(err))

    //////////////si hay el producot///////////////


    if (this.testingreso()) {

      //consultamos el producto
      const PROMESAPRODUCTO = new Promise(async (resolve, rej) => {
        await this.productServices.getProducto(this.idProductoencontrado).subscribe(
          res => {
            resolve(res)
          }, err => console.error(err
          )
        )
      })
      // console.log("entre")
      //Consultamos el putno de venta 
      const PROMESASPUNTOVENTA = new Promise(async (resolve, reject) => {
        await this.puntosVentaServices.getPuntosVenta(this.idPuntoVentaPrueba).subscribe(res => {
          console.log(res)
          resolve(res);
        }, err => console.log(err))
      })
      //Ingresamos el producto consultado al StockAuxiliar
      await PROMESAPRODUCTO.then(res => this.stockAuxiliar.catProducto = res)
      //Ingresamos el Punto de Venta consultado al StockAuxiliar
      await PROMESASPUNTOVENTA.then(res => this.stockAuxiliar.catPuntosVenta = res)

      //realizamos la validación si la lista esta vacia 
      if (this.stockAuxiliarLista.length === 0) {
        //añadimos el primer elemento a la lista
        this.stockAuxiliarLista.push(this.stockAuxiliar);
        //enviamos una variable falsa si existe el productodespues de ingresar
        this.encuentraArray = false;

      } else {
        /// recorrido for para verirficar si el producto ecxiste dentro del array
        for (var x in this.stockAuxiliarLista) {
          //realizamos la validación para verificar si existe el prodcuto dentro de la lista Stock
          if (this.stockAuxiliarLista[x].catProducto.idProductos == this.stockAuxiliar.catProducto.idProductos
            && this.stockAuxiliarLista[x].catPuntosVenta.idPuntosVenta == this.stockAuxiliar.catPuntosVenta.idPuntosVenta
          ) {
            // sumatoria de la cantidad de un elemento encontrado
            this.stockAuxiliarLista[x].cantidad = Number(this.stockAuxiliarLista[x].cantidad) + Number(this.stockAuxiliar.cantidad);
            console.log(this.stockAuxiliarLista[x].cantidad)
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
          this.stockAuxiliarLista.push(this.stockAuxiliar);
          this.encuentraArray = false;
        }

      }

      console.log(this.stockAuxiliarLista);
      //Vaciamos el stockAuxiliar para evitar conflictos
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


      console.log("se limpia")

    }


    ///hhhhhhhh
    this.totalValorIngreso = 0;

    this.stockAuxiliarLista.forEach(element => {
      element = element.cantidad * element.precioUnit;
      this.totalValorIngreso += element;
      console.log(element);
    });

    this.totalIngresoVista = "" + (this.totalValorIngreso);

  }
  //METODO PARA INGRESAR A LA BDD EN LA TABLA STOCK 
  async ingresar() {
    //Se realiza un recorrido a la lista auxiliar 
    for (let i = 0; i < this.stockAuxiliarLista.length; i++) {
      //se reaqliza una consulta en donde verificamos si existe el el porduco por id punto venta en el stock 
      //nos devuelve el valor la cantidad que tiene en stock del registro 
      await this.stockService.getEncontrarStock(this.stockAuxiliarLista[i].catProducto.idProductos,
        this.stockAuxiliarLista[i].catPuntosVenta.idPuntosVenta).subscribe(async (res) => {
          //si la cantidad es mayor o igual a cero quiere decir que el elemento si existe 
          if (res >= 0) {
            //creamos una variable y guardamos el resultado de la busqueda("cantidad")
            this.cantidadConsulta = Number(res);
            //realizamos la suma de la cantidad que existe con la cantidad que se va ingresar
            this.cantidadConsulta = this.cantidadConsulta + Number(this.stockAuxiliarLista[i].cantidad);
            //ingresamos el resultado de la suma para actualizar la cantidad en la BDD en la tabla Stock
            // await this.stockService.updateStockCantidad(this.cantidadConsulta,
            //   this.stockAuxiliarLista[i].catProducto.idProductos,
            //   this.stockAuxiliarLista[i].catPuntosVenta.idPuntosVenta).subscribe(res => {
            //     console.log("si se actualizo")
            //   }, err => console.log(err))

            //cantidad:number,precioUnit:number,precioMayor:number,precioDist:number,stockMax:number, id_producto: number, stockMin:number,id_puntosventa: number
            await this.stockService.updateStocks(
              this.cantidadConsulta,
              this.stockAuxiliarLista[i].precioUnit,
              this.stockAuxiliarLista[i].precioMayor,
              this.stockAuxiliarLista[i].precioDistribuidor,
              this.stockAuxiliarLista[i].stockMax,
              this.stockAuxiliarLista[i].catProducto.idProductos,
              this.stockAuxiliarLista[i].stockMin,
              this.stockAuxiliarLista[i].catPuntosVenta.idPuntosVenta
            ).subscribe(res => {
              console.log("si se actualizo")
            }, err => console.log(err))


            //reiniciamos el valor a cero de la cantidadConsulta para un nuevo proceso
            this.cantidadConsulta = 0;


            console.log(res)
            console.log("si hay")

          } else {

            //ingresamos los datos de la posición de la lista en un objeto tipo stock para porceder a ingresar a la BDD

            this.stocks.id.idProductos = this.stockAuxiliarLista[i].catProducto.idProductos;
            this.stocks.id.idPuntosVenta = this.stockAuxiliarLista[i].catPuntosVenta.idPuntosVenta;
            this.stocks.cantidad = this.stockAuxiliarLista[i].cantidad;
            this.stocks.stockMin = this.stockAuxiliarLista[i].stockMin;
            this.stocks.stockMax = this.stockAuxiliarLista[i].stockMax;
            this.stocks.precioMayor = this.stockAuxiliarLista[i].precioMayor;
            this.stocks.precioUnit = this.stockAuxiliarLista[i].precioUnit;
            this.stocks.precioDistribuidor = this.stockAuxiliarLista[i].precioDistribuidor;
            this.stocks.existe = 'S';

            //se ingresa a la BDD como un nuevo registro en la tabla Stock

            await this.stockService.saveStock(this.stocks).subscribe(res => {
              console.log("si se ingreso nuevo stock")
              //reiniciamos los valores del objeto stock para un unevo resgitro 
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




  ////////////////////////////////////METODO PARA OBTENER LAS TALLAS////////////////////////////////////////////////
  getTallas() {
    this.medidaservice.getTallas().subscribe(
      res => {
        this.tallas = res;
        this.tallasEscogida = res;
      }, error => console.error(error)
    );
  }
  ////////////////////////////////////METODO PARA OBTENER LAS CATEGORIAS////////////////////////////////////////////////
  getCategorias() {
    this.categoriaservices.getCategorias().subscribe(
      res => {
        this.categoria = res;
        this.categoriaEscogida = res;

      }, error => console.error(error)
    );
  }
  ////////////////////////////////////METODO PARA OBTENER LOS DISEÑOS////////////////////////////////////////////////
  getDisenos() {
    console.log("si entrte")
    this.diesnosservice.getDisenos().subscribe(
      res => {
        // console.log(res)
        this.disenos = res;
        this.disenosEscogida = res;

      }, error => console.error(error)
    );
  }



  eliminarstockList(id: number) {
    console.log("el ide escogido es=>", id)
    this.stockAuxiliarLista = this.stockAuxiliarLista.filter(element => {

      return element.catProducto.idProductos != id;
    })
    this.totalValorIngreso = 0;
    this.stockAuxiliarLista.forEach(element => {
      element = element.cantidad * element.precioUnit;
      this.totalValorIngreso += element;
      console.log(element);
    });

    this.totalIngresoVista = "" + (this.totalValorIngreso);
    console.log(this.stockAuxiliarLista);
  }
  ////////////////////////////////////METODO PARA BUSCAR EL PORDUCTO MIENTRAS SE TIPEA EN EN IMPUT////////////////////////////////////////////////
  ////////////////////////////////////PARA LLENAR AUTOMATICAMENTE LOS VALORES EN LOS CAMPOS////////////////////////////////////////////////
  async buscarStockProducto() {

    const IDPRODUCTO = new Promise(async (resolve, reject) => {
      await this.productServices.findproductobycodigo(this.idProductoPrueba).subscribe((res) => {
        resolve(res)
        console.log("idProductos consulta", res)

      }, err => console.log(err))
    });


    await IDPRODUCTO.then(res => {
      this.idProductoencontrado = Number(res);
      console.log(this.idProductoencontrado)
      //cosuotar producto por id para llenar lista de los select 
      ////////////////
      if (this.idProductoencontrado > 0) {
        this.productServices.getProducto(this.idProductoencontrado).subscribe(result => {

          let objetonuevo = Object.assign(result);
          console.log("objeto nuevo => ", objetonuevo)
          //talla
          this.tallasSelectSearch = objetonuevo.catTalla;
          // this.nombreCategoria = result[0].catProducto.catCategoria.nombreCategoria;
          //categora
          this.categoriaSelectSearch = objetonuevo.catCategoria;
          // this.nombreDiseno = result[0].catProducto.catDiseno.nombre;
          //diseno
          this.disenosSelectSearch = objetonuevo.catDiseno;

        })


        this.stockService.findbyIdproductoIdpuntosVenta(Number(res), this.idPuntoVentaPrueba).subscribe(result => {
          //////////////
          console.log("envia =>", result, "que tipo es", typeof (result));
          if (Object.keys(result).length === 0) {

            this.cantidad = 0;
            this.precioDis = 0;
            this.precioMay = 0;
            this.precioUnit = 0;
            this.stockMax = 0;
            this.stockMin = 0;

          } else {

            this.cantidad = 0;
            this.precioDis = result[0].precioDistribuidor;
            this.precioMay = result[0].precioMayor;
            this.precioUnit = result[0].precioUnit;
            this.stockMax = result[0].stockMax;
            this.stockMin = result[0].stockMin;
          }


          console.log(result)


        }, err => console.log(err))
      } else {

        this.tallasAux = {
          idTallas: 0,
          medida: "",
          descripcion: "",
          tipo: ""
        }
        this.categoriaAux = {
          idCategoria: 0,
          descripcion: "",
          nombreCategoria: ""
        }
        this.disenosAux = {
          idDisenos: 0,
          nombre: ""
        }

        this.tallasSelectSearch = this.tallasAux;
        this.categoriaSelectSearch = this.categoriaAux;
        this.disenosSelectSearch = this.disenosAux;

        this.cantidad = 0;
        this.precioDis = 0;
        this.precioMay = 0;
        this.precioUnit = 0;
        this.stockMax = 0;
        this.stockMin = 0;


      }


    })





  }

  OnInitVacio(encontrar: string): void {
    if (encontrar.length == 0) {

    } else {
      this.buscarStockProducto();
    }
    console.log(encontrar)

  }

  ngAfterViewInit() {
    $(".js-example-tags").select2({
      tags: true
    });
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

    // let opcionTallas = this.quitarespacios(this.nombreTalla);
    // //let opcionCategoria = this.quitarespacios('#categoria');
    // let opcionDisenos = this.quitarespacios(this.nombreDiseno);

    if (//opcionTallas.length > 0 &&
      //opcionCategoria.length > 0 &&
      //opcionDisenos.length > 0) 
      true) {


      this.stockAuxiliar.cantidad = cantidad;
      this.stockAuxiliar.existe = existe;
      this.stockAuxiliar.precioDistribuidor = precioDis;
      this.stockAuxiliar.precioMayor = precioMay;
      this.stockAuxiliar.precioUnit = precioUnit;
      this.stockAuxiliar.stockMax = stockMax;
      this.stockAuxiliar.stockMin = stockMin;
      return true;
    } else {
      return false;
    }
  }

  //METODO VALIDAR LOS ESPACIOS DEPUES DE LA ULTIMA LETRA O NUMERO
  quitarespacios(atributoHTML: string) {
    let obtenerletras = $(atributoHTML).val();
    return obtenerletras.trim();
  }
}
