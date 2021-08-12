import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EstadoCivilFormComponent } from './components/moduloUsuarios/estado-civil-form/estado-civil-form.component';
import { EstadoCivilListComponent } from './components/moduloUsuarios/estado-civil-list/estado-civil-list.component';
import { UsuariosFormComponent } from './components/moduloUsuarios/usuarios-form/usuarios-form.component';
import { UsuariosListComponent } from './components/moduloUsuarios/usuarios-list/usuarios-list.component';
import { GeneroFormComponent } from './components/moduloUsuarios/genero-form/genero-form.component';
import { GeneroListComponent } from './components/moduloUsuarios/genero-list/genero-list.component';

import { NgSelect2Module } from 'ng-select2';
import { ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriaFormComponent } from './components/moduloProducto/categoria-form/categoria-form.component';
import { CategoriaListComponent } from './components/moduloProducto/categoria-list/categoria-list.component';
import { MedidaFormComponent } from './components/moduloProducto/medida-form/medida-form.component';
import { MedidaListComponent } from './components/moduloProducto/medida-list/medida-list.component';
import { DisenosFormComponent } from './components/moduloProducto/disenos-form/disenos-form.component';
import { DisenosListComponent } from './components/moduloProducto/disenos-list/disenos-list.component';
import { ProductoFormComponent } from './components/moduloProducto/producto-form/producto-form.component';
import { ProductoListComponent } from './components/moduloProducto/producto-list/producto-list.component';
import { PuntosVentasFormComponent } from './components/moduloProducto/puntos-ventas-form/puntos-ventas-form.component';
import { PuntosVentasListComponent } from './components/moduloProducto/puntos-ventas-list/puntos-ventas-list.component';
import { StockFormComponent } from './components/moduloProducto/stock-form/stock-form.component';
import { StockListComponent } from './components/moduloProducto/stock-list/stock-list.component';


// import {DialogModule} from 'primeng/dialog';

// import {InputTextModule} from 'primeng/inputtext';
// import {TooltipModule} from 'primeng/tooltip';
// import {ButtonModule} from 'primeng/button';
// import {CalendarModule} from 'primeng/calendar';

// import { PrimeNGConfig } from 'primeng/api';
// import {TableModule} from 'primeng/table';
// import {CardModule} from 'primeng/card';


// import {DropdownModule} from 'primeng/dropdown';
// import {SliderModule} from 'primeng/slider';
// import {ProgressBarModule} from 'primeng/progressbar';
// import {PaginatorModule} from 'primeng/paginator';

import {DialogModule} from 'primeng-lts/dialog';

import {InputTextModule} from 'primeng-lts/inputtext';
import {TooltipModule} from 'primeng-lts/tooltip';
import {ButtonModule} from 'primeng-lts/button';
import {CalendarModule} from 'primeng-lts/calendar';

import { PrimeNGConfig } from 'primeng-lts/api';
import {TableModule} from 'primeng-lts/table';
import {CardModule} from 'primeng-lts/card';

//firebase
//import { AngularFireModule } from '@angular/fire';
//import {  AngularFireAuthModule } from '@angular/fire/auth';
//import { environment } from '../environments/environment';
import { LoginComponent } from './components/login/login.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';

import {DropdownModule} from 'primeng-lts/dropdown';
import {SliderModule} from 'primeng-lts/slider';
import {ProgressBarModule} from 'primeng-lts/progressbar';
import {PaginatorModule} from 'primeng-lts/paginator';
//primeros comentarios
import { FacturacionFormComponent } from './components/moduloFacturacion/facturacion-form/facturacion-form.component';

import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import { HomeComponent } from './components/home/home.component';
import { CarritoComponent } from './components/moduloPedidos/carrito/carrito.component';
// import {InputNumberModule} from 'primeng/inputnumber';
// import {FileUploadModule} from 'primeng/fileupload';
// import {GalleriaModule} from 'primeng/galleria';


import {InputNumberModule} from 'primeng-lts/inputnumber';
import {FileUploadModule} from 'primeng-lts/fileupload';
import {GalleriaModule} from 'primeng-lts/galleria';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

import { AngularFireModule } from '@angular/fire';
import {  AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment.prod';

import {ClientsListComponent} from '../app/components/clients-list/clients-list.component';
import {ClientsFormComponent} from '../app/components/clients-form/clients-form.component';
import { ReportProductoComponent } from './components/moduloProducto/report-producto/report-producto.component';
// import {SidebarModule} from 'primeng/sidebar';
// import {SlideMenuModule} from 'primeng/slidemenu';
// import {KeyFilterModule} from 'primeng/keyfilter';
import {SidebarModule} from 'primeng-lts/sidebar';
import {SlideMenuModule} from 'primeng-lts/slidemenu';
import {KeyFilterModule} from 'primeng-lts/keyfilter';
import {NavigationCashierComponent } from './components/navigation-cashier/navigation-cashier.component';

import { StockCashierListComponent } from './components/moduloProducto/stock-cashier-list/stock-cashier-list.component';
import { StockCashierFormComponent } from './components/moduloProducto/stock-cashier-form/stock-cashier-form.component';
import { FacturacionCashierComponent } from './components/moduloFacturacion/facturacion-cashier/facturacion-cashier.component';
import { FacturaFechaComponent } from './components/moduloFacturacion/factura-fecha/factura-fecha.component';
import { NavigationCustomerComponent } from './components/navigation-customer/navigation-customer.component';
import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import {FieldsetModule} from 'primeng-lts/fieldset';
import {PasswordModule} from 'primeng-lts/password';
import {InputMaskModule} from 'primeng-lts/inputmask';
import { PasswordResetFormComponent } from './componenets/password-reset-form/password-reset-form.component';
//
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    EstadoCivilFormComponent,
    EstadoCivilListComponent,
    UsuariosFormComponent,
    UsuariosListComponent,
    GeneroFormComponent,
    GeneroListComponent,
    CategoriaFormComponent,
    CategoriaListComponent,
    MedidaFormComponent,
    MedidaListComponent,
    DisenosFormComponent,
    DisenosListComponent,
    ProductoFormComponent,
    ProductoListComponent,
    LoginComponent,
    LoginRegisterComponent,
    PuntosVentasFormComponent,
    PuntosVentasListComponent,
    StockFormComponent,
    StockListComponent,
    FacturacionFormComponent,
    HomeComponent,
    CarritoComponent,
    ClientsListComponent,
    ReportProductoComponent,
    NavigationCashierComponent,
    StockCashierListComponent,
    StockCashierFormComponent,
    FacturacionCashierComponent,
    FacturaFechaComponent,
    ClientsFormComponent,
    NavigationCustomerComponent,
    PasswordResetFormComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelect2Module,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    DialogModule,
    InputTextModule,
    TooltipModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    TableModule,
    CardModule,
    
 
    DropdownModule,
    SliderModule,
    ProgressBarModule,
    MenubarModule,
    PaginatorModule,
    InputNumberModule,
    FileUploadModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    SidebarModule,
    SlideMenuModule,
    KeyFilterModule,
   
    GalleriaModule,
    AngularFireAuthModule,
    FieldsetModule,
    PasswordModule,
    InputMaskModule,
    ProgressSpinnerModule
 
    
  ],
  providers: [PrimeNGConfig,CookieService
    ,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
