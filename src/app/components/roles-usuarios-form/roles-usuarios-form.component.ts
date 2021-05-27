import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
//Roles usuarios
import { Rolusuarios } from '../../models/Rolusuarios';
import { RolesUsuariosService } from '../../services/roles-usuarios.service'; 
//Usuarios
import { Usuarios } from '../../models/Usuarios';
import { UsuariosService } from '../../services/usuarios.service';
//Roles
import { Roles } from '../../models/Roles';
import { RolesService } from '../../services/roles.service';
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
    private activedrouter: ActivatedRoute, private router : Router) { }

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
    let opcionRol = $('#roles').val();
    let opcionUsuario = $('#usuarios').val();
    this.roles_usuarios.rol.id_roles=opcionRol;
    this.roles_usuarios.user.id_usuarios=opcionUsuario;
    this.rolesusuariosservice.saveRolusuario(this.roles_usuarios).subscribe(
      res=>{
        this.roles_usuarios.rol = {id_roles:0};
        this.roles_usuarios.user = {id_usuarios:0}
      },error => console.error(error)
    );
  }

  updateRolusuario(){
    let opcionRol = $('#roles').val();
    let opcionUsuario = $('#usuarios').val();
    this.roles_usuarios.rol.id_roles=opcionRol;
    this.roles_usuarios.user.id_usuarios=opcionUsuario;
    this.rolesusuariosservice.updateRolusaurio(this.roles_usuarios.id_rolusuarios,this.roles_usuarios).subscribe(
      res => {
        this.roles_usuarios.rol = {id_roles:0};
        this.roles_usuarios.user = {id_usuarios:0}
        this.router.navigate(['/rol-user'])
      }
    );
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
}
