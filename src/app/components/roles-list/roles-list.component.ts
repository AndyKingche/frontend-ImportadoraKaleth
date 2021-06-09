import { Component, HostBinding, OnInit } from '@angular/core';
//Roles
import { Roles } from '../../models/Roles';
import { RolesService } from '../../services/roles.service';
//Fromsulario
import { FormGroup } from '@angular/forms';
import { NotificacionService } from '../../services/notificacion.service';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  roles : any = [];
  constructor( private rolesservices : RolesService, private notifiacion: NotificacionService) { }

  ngOnInit() {
    this.getRoles();
  }

  getRoles(){
    this.rolesservices.getRoles().subscribe(
      res=>{
        this.roles = res;
      },
      err => console.error(err)
    );
  }

  deleteRol(id: number){
    this.rolesservices.deleteRoles(id).subscribe(
      res=>{
        this.notifiacion.showInfo('Se ha eliminado correctamente','Rol eliminado')
        this.getRoles()
      },
      error => console.error(error)
      
    );
  }

}
