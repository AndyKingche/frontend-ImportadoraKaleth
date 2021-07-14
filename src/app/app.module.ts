import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RolesFormComponent } from './components/moduloUsuarios/roles-form/roles-form.component';
import { RolesListComponent } from './components/moduloUsuarios/roles-list/roles-list.component';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EstadoCivilFormComponent } from './components/moduloUsuarios/estado-civil-form/estado-civil-form.component';
import { EstadoCivilListComponent } from './components/moduloUsuarios/estado-civil-list/estado-civil-list.component';
import { UsuariosFormComponent } from './components/moduloUsuarios/usuarios-form/usuarios-form.component';
import { UsuariosListComponent } from './components/moduloUsuarios/usuarios-list/usuarios-list.component';
import { GeneroFormComponent } from './components/moduloUsuarios/genero-form/genero-form.component';
import { GeneroListComponent } from './components/moduloUsuarios/genero-list/genero-list.component';
import { RolesUsuariosFormComponent } from './components/moduloUsuarios/roles-usuarios-form/roles-usuarios-form.component';
import { RolesUsuariosListComponent } from './components/moduloUsuarios/roles-usuarios-list/roles-usuarios-list.component';

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

import {DialogModule} from 'primeng/dialog';

import {InputTextModule} from 'primeng/inputtext';
import {TooltipModule} from 'primeng/tooltip';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import { FilterService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import {SliderModule} from 'primeng/slider';
import {ProgressBarModule} from 'primeng/progressbar';
import {PaginatorModule} from 'primeng/paginator';

import { FacturacionFormComponent } from './components/moduloFacturacion/facturacion-form/facturacion-form.component';


import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import { HomeComponent } from './components/home/home.component';
import { CarritoComponent } from './components/moduloPedidos/carrito/carrito.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {FileUploadModule} from 'primeng/fileupload';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import {ClientsListComponent} from '../app/components/clients-list/clients-list.component';
import { ReportProductoComponent } from './components/moduloProducto/report-producto/report-producto.component';
import {SidebarModule} from 'primeng/sidebar';
import {SlideMenuModule} from 'primeng/slidemenu';
//
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RolesFormComponent,
    RolesListComponent,
    EstadoCivilFormComponent,
    EstadoCivilListComponent,
    UsuariosFormComponent,
    UsuariosListComponent,
    GeneroFormComponent,
    GeneroListComponent,
    RolesUsuariosFormComponent,
    RolesUsuariosListComponent,
    CategoriaFormComponent,
    CategoriaListComponent,
    MedidaFormComponent,
    MedidaListComponent,
    DisenosFormComponent,
    DisenosListComponent,
    ProductoFormComponent,
    ProductoListComponent,
    PuntosVentasFormComponent,
    PuntosVentasListComponent,
    StockFormComponent,
    StockListComponent,
    FacturacionFormComponent,
    HomeComponent,
    CarritoComponent,
    ClientsListComponent,
    ReportProductoComponent
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
    DividerModule,
    MultiSelectModule,
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
    SlideMenuModule
    
  ],
  providers: [RolesFormComponent,PrimeNGConfig,FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
