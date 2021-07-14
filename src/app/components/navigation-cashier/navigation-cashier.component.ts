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
            {label: 'Usuarios', icon: 'pi pi-fw pi-users',routerLink: ['/user']},
            {label: 'Roles', icon: 'pi pi-fw pi-user-plus',routerLink: ['/rol']},
            {label: 'Asignar Rol Usuario', icon: 'pi pi-fw pi-id-card',routerLink: ['/rol-user']},
            
          ]
         
      },
      {
          label: 'Productos',
          icon: 'pi pi-fw pi-clone',
          items: [
              {label: 'Categoria', icon: 'pi pi-fw pi-sitemap',routerLink: ['/category']},
              {label: 'Diseño', icon: 'pi pi-fw pi-images',routerLink: ['/design']},
              {label: 'Talla', icon: 'pi pi-fw pi-sort-alpha-up',routerLink: ['/size']},
              {label: 'Producto', icon: 'pi pi-fw pi-tags',routerLink: ['/product']},
              {label: 'Stock', icon: 'pi pi-fw pi-list',routerLink: ['/stock']},
          ]
      },
      {
        label:'Punto de ventas',
        icon:'pi pi-fw pi-check-square',
        routerLink: ['/sales-points']
      }
  ]



  }
}
