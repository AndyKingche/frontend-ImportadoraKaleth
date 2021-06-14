import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
//Roles usuarios
import { Rolusuarios } from '../../../models/Rolusuarios';
import { RolesUsuariosService } from '../../../services/roles-usuarios.service'; 
//Usuarios
import { Usuarios } from '../../../models/Usuarios';
import { UsuariosService } from '../../../services/usuarios.service';
//Roles
import { Roles } from '../../../models/Roles';
import { RolesService } from '../../../services/roles.service';

import { NotificacionService } from '../../../services/notificacion.service';

declare let $: any;


@Component({
  selector: 'app-roles-usuarios-form',
  templateUrl: './roles-usuarios-form.component.html',
  styleUrls: ['./roles-usuarios-form.component.css']
})
export class RolesUsuariosFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  usuarios: Usuarios;
  usuariosEscogidos: any=[];

  roles: Roles;
  rolesEscogidos: any =[];

  roles_usuarios: Rolusuarios ={
    rol:{id_roles:0},
    user:{id_usuarios:0}
  }
  roles_usuariosEscogidos: any [];
  edit: boolean = false;
  constructor(private rolesservices: RolesService, 
    private usuariosservices: UsuariosService,
    private rolesusuariosservice: RolesUsuariosService,
    private activedrouter: ActivatedRoute, private router : Router,
    private notificacion: NotificacionService) { }

  ngOnInit() {
    const params = this.activedrouter.snapshot.params;

    if(params.id){
      this.rolesusuariosservice.getRolusuario(params.id).subscribe(
        res=>{
          if(res!= null){
            console.log(res);
            this.roles_usuarios = res;
            this.usuariosservices.getUsuario(this.roles_usuarios.user.id_usuarios).subscribe(
              res=>{
                this.usuariosEscogidos = res;
                $('#usuarios').select2(
                  {
                    placeholder:this.usuariosEscogidos.nombre +' '+this.usuariosEscogidos.apellido,
                    allowClear: true
    
                  }
                );
              },error => console.error(error)
            );
            this.rolesservices.getRol(this.roles_usuarios.rol.id_roles).subscribe(
              res=>{
                this.rolesEscogidos = res;
                $('#roles').select2({
                  placeholder:this.rolesEscogidos.nombre,
                  allowClear:true
                });
              },
              error => console.error(error)
              );
            this.edit = true;

          }else{
            this.router.navigate(['/rol-user']);
          }
          
        },
        err => console.log("hay error "+ err)
      )
    }
    this.getUsuarios();
    $('#usuarios').select2(
      {
        placeholder:'Usuarios...',
        allowClear: true

      }
    );
    this.getRoles();
    $('#roles').select2(
      {
        placeholder: 'Roles...',
        allowClear: true

      }
    );
  }

  saveRolusuario(){
    if(this.testingreso()){
      this.rolesusuariosservice.saveRolusuario(this.roles_usuarios).subscribe(
        res=>{
          setTimeout(()=>{
            this.notificacion.showSuccess('El Rol del Usuario se agrego correctamente','Rol usuarios Agregado');
          },200);
          this.router.navigate(['/rol-user'])
          
        },error => console.error(error)
      );

    }else{
      console.log("no se pudo")
    }
  }

  updateRolusuario(){
    
    if(this.roles_usuarios.rol.id_roles &&
      this.roles_usuarios.user.id_usuarios){
        this.rolesusuariosservice.updateRolusaurio(this.roles_usuarios.id_rolusuarios,this.roles_usuarios).subscribe(
          res => {
            setTimeout(()=>{
              this.notificacion.showSuccess('El rol actualizado ','Rol Usuarios actualizado');
              
            },200);
            this.router.navigate(['/rol-user'])
          },error => {console.error(error)}
        );

      }else{
        if(this.testingreso()){
          this.rolesusuariosservice.updateRolusaurio(this.roles_usuarios.id_rolusuarios,this.roles_usuarios).subscribe(
            res => {
              setTimeout(()=>{
                this.notificacion.showSuccess('El rol actualizado ','Rol Usuarios actualizado');
                
              },200);
              this.router.navigate(['/rol-user'])
            },error => {console.error(error)}
          );
        }else{
          this.notificacion.showError('Revisar si selecciono un Usuario o un Rol','** Error al Actualizar los Roles de Usuarios')
        }

      }
    }



  getUsuarios(){
    this.usuariosservices.getUsuarios().subscribe(
      res=>{
        this.usuarios = res;
      },error => console.error(error)
    );
  }

  getRoles(){
    this.rolesservices.getRoles().subscribe(
      res=>{
        this.roles = res;

      },error => console.error(error)
    );
  }
  testingreso(){
    let opcionRol = this.quitarespacios('#roles');
    let opcionUsuario = this.quitarespacios('#usuarios');
    if(opcionRol.length>0 &&
      opcionUsuario.length>0){
        this.roles_usuarios.rol.id_roles = opcionRol;
        this.roles_usuarios.user.id_usuarios = opcionUsuario;
        return true;
      }else{
        return false;
      }
  }
  quitarespacios(atributoHTML:string){
    let obtenerletras = $(atributoHTML).val();
    return obtenerletras.trim();
  }
}
