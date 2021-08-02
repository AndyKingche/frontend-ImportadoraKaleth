import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from '../../../models/Roles';
import { RolesService } from '../../../services/roles.service';
import { NotificacionService } from '../../../services/notificacion.service';
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
  actualizar: string = 'Ingresar';
  constructor(private rolesService: RolesService, 
    private router: Router, private activedrouter: ActivatedRoute,
    private notificacion: NotificacionService) { }

  ngOnInit() {
    const params = this.activedrouter.snapshot.params;
    console.log(params);
    if(params.id){
      this.actualizar = 'Actualizar';
      this.rolesService.getRol(params.id).subscribe(
        res=>{
          if(res!= null){
            console.log(res);
            this.rol = res; 
            this.edit = true;

          }else{
            this.router.navigate(['/admin/rol']);
          }
          
        },
        err => console.log("hay error "+ err)
      )
    }else{
      this.actualizar = 'Ingresar';
    }
  }

  saveRol(){
    
    if(this.testingresar()){   
      this.rolesService.saveRoles(this.rol).subscribe(
        res=>{
          this.rol.nombre =' ';
          this.rol.descripcion = '' ;
          this.rol.rol= ' ';
          setTimeout(()=>{
            this.notificacion.showSuccess('Rol correctamente agregado', ' Rol Ingresado')
          },200);
          this.router.navigate(['/admin/rol'])
        },
        err => console.error(err)
      );
    }else{
      this.notificacion.showError('Revise que todos los campos esten llenos','Error al agregar Rol')
    }
  }

  updateRol(){
    
    if(this.testingresar()){
        
      this.rolesService.updateRoles(this.rol.idRoles, this.rol).subscribe(
        res=>{
          this.rol.nombre =' ';
          this.rol.descripcion = '' ;
          this.rol.rol = ' ';
          setTimeout(()=>{
            this.notificacion.showSuccess('Rol actualizado Correctamente','Rol actualizado');
            },200)
          this.router.navigate(['/admin/rol']);
        },
        err => console.error(err)
      );

    }else{
      this.notificacion.showError('Revise que todos los campos esten llenos','Error al actualizar Rol')

    }
  }

  testingresar() {
    
    if ( this.rol.nombre.length !=0 &&
      this.rol.descripcion.length != 0 &&
      this.rol.rol.length !=0 ) {  
        this.rol.nombre = this.quitarespacios(this.rol.nombre); 
        this.rol.descripcion = this.quitarespacios(this.rol.descripcion); 
        this.rol.rol = this.quitarespacios(this.rol.rol); 
      return true;
    } else {
      
      return false;
    }
  }

  quitarespacios(letras:string){
    let obtenerLetras = letras;
    return obtenerLetras.trim();
  }


}
