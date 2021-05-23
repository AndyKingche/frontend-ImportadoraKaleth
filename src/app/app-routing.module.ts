import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Roles
import { RolesFormComponent } from './components/roles-form/roles-form.component';
import { RolesListComponent } from './components/roles-list/roles-list.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
