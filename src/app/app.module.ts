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
    GeneroListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [RolesFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
