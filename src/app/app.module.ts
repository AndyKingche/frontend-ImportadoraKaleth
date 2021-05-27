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
    RolesUsuariosListComponent
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
