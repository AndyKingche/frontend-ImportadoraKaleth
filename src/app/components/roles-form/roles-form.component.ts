import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from '../../models/Roles';
import { RolesService } from '../../services/roles.service';
import { NotificacionService } from '../../services/notificacion.service';
import { isEmptyExpression } from '@angular/compiler';
declare let $ :any;
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
  constructor(private rolesService: RolesService, 
    private router: Router, private activedrouter: ActivatedRoute,
    private notificacion: NotificacionService) { }

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
    let obtenerNombre = this.quitarespacios('#nombre');
    let obtenerRol = this.quitarespacios('#rol');
    let obtenerDescripcion = this.quitarespacios('#descripcion');
    if(Object.keys(this.rol.nombre).length>0
    && obtenerNombre.length>0
    && Object.keys(this.rol.descripcion).length>0 
    && obtenerRol.length>0
    && Object.keys(this.rol.rol).length>0
    && obtenerDescripcion.length>0){
      this.rol.nombre = obtenerNombre;
      this.rol.rol = obtenerRol;
      this.rol.descripcion = obtenerDescripcion;

      this.rolesService.saveRoles(this.rol).subscribe(
        res=>{
          this.rol.nombre =' ';
          this.rol.descripcion = '' ;
          this.rol.rol= ' ';
          setTimeout(()=>{
            this.notificacion.showSuccess('Rol correctamente agregado', ' Rol Ingresado')
          },200);
          this.router.navigate(['/rol'])
        },
        err => console.error(err)
      );
    }else{
      this.notificacion.showError('Revise que todos los campos esten llenos','Error al agregar Rol')
    }
  }

  updateRol(){
    let obtenerNombre = this.quitarespacios('#nombre');
    let obtenerRol = this.quitarespacios('#rol');
    let obtenerDescripcion = this.quitarespacios('#descripcion');
    if(obtenerNombre.length>0
      &&obtenerDescripcion.length>0
      &&obtenerRol.length>0){
        this.rol.nombre = obtenerNombre;
      this.rol.rol = obtenerRol;
      this.rol.descripcion = obtenerDescripcion;

      this.rolesService.updateRoles(this.rol.id_roles, this.rol).subscribe(
        res=>{
          this.rol.nombre =' ';
          this.rol.descripcion = '' ;
          this.rol.rol = ' ';
          setTimeout(()=>{
            this.notificacion.showSuccess('Rol actualizado Correctamente','Rol actualizado');
            },200)
          this.router.navigate(['/rol']);
        },
        err => console.error(err)
      );

    }else{
      this.notificacion.showError('Revise que todos los campos esten llenos','Error al actualizar Rol')

    }
  }

  quitarespacios(atributoHTML:string){
    let obtenerLetras = $(atributoHTML).val();
    return obtenerLetras.trim();
  }


}
