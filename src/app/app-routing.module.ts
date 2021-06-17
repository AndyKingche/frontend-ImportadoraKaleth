import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Roles
import { RolesFormComponent } from './components/moduloUsuarios/roles-form/roles-form.component';
import { RolesListComponent } from './components/moduloUsuarios/roles-list/roles-list.component';
//Estado civil
import { EstadoCivilFormComponent } from './components/moduloUsuarios/estado-civil-form/estado-civil-form.component';
import { EstadoCivilListComponent } from './components/moduloUsuarios/estado-civil-list/estado-civil-list.component';
//Genero
import { GeneroFormComponent } from './components/moduloUsuarios/genero-form/genero-form.component';
import { GeneroListComponent } from './components/moduloUsuarios/genero-list/genero-list.component';
//Usuarios
import { UsuariosFormComponent } from './components/moduloUsuarios/usuarios-form/usuarios-form.component';
import { UsuariosListComponent } from './components/moduloUsuarios/usuarios-list/usuarios-list.component';
//Rol-Usuarios
import { RolesUsuariosFormComponent } from './components/moduloUsuarios/roles-usuarios-form/roles-usuarios-form.component';
import { RolesUsuariosListComponent } from './components/moduloUsuarios/roles-usuarios-list/roles-usuarios-list.component';
//categoria
import { CategoriaFormComponent } from './components/moduloProducto/categoria-form/categoria-form.component';
import { CategoriaListComponent } from '././components/moduloProducto/categoria-list/categoria-list.component';
//Tallas
import { MedidaFormComponent } from '././components/moduloProducto/medida-form/medida-form.component';
import { MedidaListComponent } from '././components/moduloProducto/medida-list/medida-list.component';
//Disenos
import { DisenosFormComponent } from './components/moduloProducto/disenos-form/disenos-form.component';
import { DisenosListComponent } from './components/moduloProducto/disenos-list/disenos-list.component';
//producto
import { ProductoFormComponent } from './components/moduloProducto/producto-form/producto-form.component';
import { ProductoListComponent } from './components/moduloProducto/producto-list/producto-list.component';
//puntos ventas
import {PuntosVentasFormComponent} from './components/moduloProducto/puntos-ventas-form/puntos-ventas-form.component' ;
import {PuntosVentasListComponent} from './components/moduloProducto/puntos-ventas-list/puntos-ventas-list.component';
//stock
import {StockFormComponent} from './components/moduloProducto/stock-form/stock-form.component'; 
import {StockListComponent} from './components/moduloProducto/stock-list/stock-list.component';
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

  ,
  {
    path:'sales-points',
    component: PuntosVentasListComponent
  },
  {
    path:'sales-points-add',
    component: PuntosVentasFormComponent
  },
  {
    path: 'sales-points-edit/:id',
    component: PuntosVentasFormComponent
  }
,
  {
    path:'stock',
    component: StockListComponent
  },
  {
    path:'stock-add',
    component: StockFormComponent
  },
  {
    path: 'stock-edit/:id',
    component: StockFormComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
