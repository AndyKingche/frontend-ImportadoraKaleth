import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RolesFormComponent } from './components/roles-form/roles-form.component';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EstadoCivilFormComponent } from './components/estado-civil-form/estado-civil-form.component';
import { EstadoCivilListComponent } from './components/estado-civil-list/estado-civil-list.component';
import { UsuariosFormComponent } from './components/usuarios-form/usuarios-form.component';
import { UsuariosListComponent } from './components/usuarios-list/usuarios-list.component';
import { GeneroFormComponent } from './components/genero-form/genero-form.component';
import { GeneroListComponent } from './components/genero-list/genero-list.component';
import { RolesUsuariosFormComponent } from './components/roles-usuarios-form/roles-usuarios-form.component';
import { RolesUsuariosListComponent } from './components/roles-usuarios-list/roles-usuarios-list.component';

import { NgSelect2Module } from 'ng-select2';
import { ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriaFormComponent } from './components/categoria-form/categoria-form.component';
import { CategoriaListComponent } from './components/categoria-list/categoria-list.component';
import { MedidaFormComponent } from './components/medida-form/medida-form.component';
import { MedidaListComponent } from './components/medida-list/medida-list.component';
import { DisenosFormComponent } from './components/disenos-form/disenos-form.component';
import { DisenosListComponent } from './components/disenos-list/disenos-list.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { ProductoListComponent } from './components/producto-list/producto-list.component';


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
    ProductoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelect2Module,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [RolesFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
