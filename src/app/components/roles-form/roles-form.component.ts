import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from '../../models/Roles';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.css']
})
export class RolesFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  rol : Roles = {
    descripcion: '',
    nombre: '',
    rol:''
  };
  edit: boolean = false;
  constructor(private rolesService: RolesService, private router: Router, private activedrouter: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activedrouter.snapshot.params;
    console.log(params);
    if(params.id){
      this.rolesService.getRol(params.id).subscribe(
        res=>{
          if(res!= null){
            console.log(res);
            this.rol = res; 
            this.edit = true;

          }else{
            this.router.navigate(['/rol']);
          }
          
        },
        err => console.log("hay error "+ err)
      )
    }
  }

  saveRol(){
    this.rolesService.saveRoles(this.rol).subscribe(
      res=>{
        this.rol.nombre =' ';
        this.rol.descripcion = '' ;
        this.rol.descripcion = ' ';
      },
      err => console.error(err)
    );
  }

  updateRol(){
    this.rolesService.updateRoles(this.rol.id_roles, this.rol).subscribe(
      res=>{
        this.rol.nombre =' ';
        this.rol.descripcion = '' ;
        this.rol.descripcion = ' ';
      },
      err => console.error(err)
    );
  }


}
