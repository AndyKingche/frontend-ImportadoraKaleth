import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Roles
import { RolesFormComponent } from './components/roles-form/roles-form.component';
import { RolesListComponent } from './components/roles-list/roles-list.component';
//Estado civil
import { EstadoCivilFormComponent } from './components/estado-civil-form/estado-civil-form.component';
import { EstadoCivilListComponent } from './components/estado-civil-list/estado-civil-list.component';
//Genero
import { GeneroFormComponent } from './components/genero-form/genero-form.component';
import { GeneroListComponent } from './components/genero-list/genero-list.component';
//Usuarios
import { UsuariosFormComponent } from './components/usuarios-form/usuarios-form.component';
import { UsuariosListComponent } from './components/usuarios-list/usuarios-list.component';

const routes: Routes = [
  {
    path:' ',
    redirectTo:'/rol',
    pathMatch: 'full'
  },
  {
    path:'rol',
    component: RolesListComponent // esta es la principal, la lista
  },
  {
    path:'rol-add',
    component:RolesFormComponent
  }
  ,{
    path:'rol-edit/:id',
    component:RolesFormComponent
  },{
    path:'civil-status',
    component:EstadoCivilListComponent
  },
  {
    path:'civil-status-add',
    component:EstadoCivilFormComponent
  },
  {
    path: 'civil-status-edit/:id',
    component:EstadoCivilFormComponent
  },{
    path: 'gender',
    component: GeneroListComponent
  },{
    path: 'gender-add',
    component: GeneroFormComponent
  },{
    path: 'gender-edit/:id',
    component: GeneroFormComponent
  },
  {
    path:'user',
    component:UsuariosListComponent
  },
  {
    path: 'user-add',
    component: UsuariosFormComponent
  },
  {
    path: 'user-edit/:id',
    component: UsuariosFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
