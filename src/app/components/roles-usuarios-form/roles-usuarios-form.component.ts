import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
//Roles usuarios
import { Rolusuarios } from '../../models/Rolusuarios';
import { Rolusuariosnew } from '../../models/Rolusuariosnew';
import { RolesUsuariosService } from '../../services/roles-usuarios.service'; 
//Usuarios
import { Usuarios } from '../../models/Usuarios';
import { UsuariosService } from '../../services/usuarios.service';
//Roles
import { Roles } from '../../models/Roles';
import { RolesService } from '../../services/roles.service';

import { NotificacionService } from '../../services/notificacion.service';

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
    rol:{id:""},
    usuarios:{id:""}
  }
  roles_usuariosnew: Rolusuariosnew={
    rol:"",
    usuarios:""
  };
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
            this.roles_usuariosnew.usuarios = this.roles_usuarios.usuarios.id;
            this.roles_usuariosnew.rol = this.roles_usuarios.rol.id;
            this.usuariosservices.getUsuario(this.roles_usuarios.usuarios.id).subscribe(
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
            this.rolesservices.getRol(this.roles_usuarios.rol.id).subscribe(
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
      this.rolesusuariosservice.saveRolusuario(this.roles_usuariosnew).subscribe(
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
    try {
      if(this.roles_usuarios.rol.id &&
        this.roles_usuarios.usuarios.id){
          if(this.testingreso()){
            this.rolesusuariosservice.updateRolusaurio(this.roles_usuarios.id,this.roles_usuariosnew).subscribe(
              res => {
                setTimeout(()=>{
                  this.notificacion.showSuccess('El rol actualizado ','Rol Usuarios actualizado');
                  
                },200);
                this.router.navigate(['/rol-user'])
              },error => {console.error(error)}
            );
          }
      }
    } catch (error) {
      this.notificacion.showSuccess('El rol actualizado ','Rol Usuarios actualizado');
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
    let opcionRol = $('#roles').val();
    let opcionUsuario = $('#usuarios').val();
    if(opcionRol.length>0 &&
      opcionUsuario.length>0){
        this.roles_usuariosnew.rol = opcionRol;
        this.roles_usuariosnew.usuarios = opcionUsuario;
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
