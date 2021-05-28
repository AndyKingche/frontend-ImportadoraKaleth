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
//Rol-Usuarios
import { RolesUsuariosFormComponent } from './components/roles-usuarios-form/roles-usuarios-form.component';
import { RolesUsuariosListComponent } from './components/roles-usuarios-list/roles-usuarios-list.component';
//categoria
import { CategoriaFormComponent } from './components/categoria-form/categoria-form.component';
import { CategoriaListComponent } from './components/categoria-list/categoria-list.component';
//Tallas
import { MedidaFormComponent } from './components/medida-form/medida-form.component';
import { MedidaListComponent } from './components/medida-list/medida-list.component';
//Disenos
import { DisenosFormComponent } from './components/disenos-form/disenos-form.component';
import { DisenosListComponent } from './components/disenos-list/disenos-list.component';
//producto
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { ProductoListComponent } from './components/producto-list/producto-list.component'

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
  },
  {
    path:'rol-user',
    component: RolesUsuariosListComponent
  },
  {
    path:'rol-user-add',
    component: RolesUsuariosFormComponent
  },
  {
    path: 'rol-user-edit/:id',
    component: RolesUsuariosFormComponent
  }
  ,
  {
    path:'category',
    component: CategoriaListComponent
  },
  {
    path:'category-add',
    component: CategoriaFormComponent
  },
  {
    path: 'category-edit/:id',
    component: CategoriaFormComponent
  },
  {
    path:'size',
    component: MedidaListComponent
  },
  {
    path:'size-add',
    component: MedidaFormComponent
  },
  {
    path: 'size-edit/:id',
    component: MedidaFormComponent
  },
  {
    path:'design',
    component: DisenosListComponent
  },
  {
    path:'design-add',
    component: DisenosFormComponent
  },
  {
    path: 'design-edit/:id',
    component: DisenosFormComponent
  },
  {
    path:'product',
    component: ProductoListComponent
  },
  {
    path:'product-add',
    component: ProductoFormComponent
  },
  {
    path: 'product-edit/:id',
    component: ProductoFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
