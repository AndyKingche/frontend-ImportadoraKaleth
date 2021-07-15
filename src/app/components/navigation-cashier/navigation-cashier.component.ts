import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-navigation-cashier',
  templateUrl: './navigation-cashier.component.html',
  styleUrls: ['./navigation-cashier.component.css']
})
export class NavigationCashierComponent implements OnInit {

  items: MenuItem[];
  constructor() { }

  ngOnInit() {
    this.items = [
      {
          label: 'Usuarios',

          icon: 'pi pi-fw pi-user',
          items:[
            {label: 'Usuarios', icon: 'pi pi-fw pi-users',routerLink: ['/admin/user']},
            {label: 'Roles', icon: 'pi pi-fw pi-user-plus',routerLink: ['/admin/rol']},
            {label: 'Asignar Rol Usuario', icon: 'pi pi-fw pi-id-card',routerLink: ['/admin/rol-user']},
            
          ]
         
      },
      {
          label: 'Productos',
          icon: 'pi pi-fw pi-clone',
          items: [
              {label: 'Categoria', icon: 'pi pi-fw pi-sitemap',routerLink: ['/admin/category']},
              {label: 'Diseño', icon: 'pi pi-fw pi-images',routerLink: ['/admin/design']},
              {label: 'Talla', icon: 'pi pi-fw pi-sort-alpha-up',routerLink: ['/admin/size']},
              {label: 'Producto', icon: 'pi pi-fw pi-tags',routerLink: ['/admin/product']},
              {label: 'Stock', icon: 'pi pi-fw pi-list',routerLink: ['/admin/stock']},
          ]
      },
      {
        label:'Punto de ventas',
        icon:'pi pi-fw pi-check-square',
        routerLink: ['/admin/sales-points']
      }
  ]



  }
}
