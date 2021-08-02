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
  usuarios: any=[];
  auxusuarios: any=[];
  auxrolusuarios: any=[];
  nuevosUsuarios:any=[];
  usuariosEscogidos: any=[];

  roles: Roles;
  rolesEscogidos: any =[];

  roles_usuarios: Rolusuarios = {
   id:{
     idRoles:0,
     idUsuario:0

   }
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
    //this.nuevosUsuarios[0].id=0;
  console.log(params.idu)
  console.log(params.idr)  
  
    if(params.idu && params.idr){
      console.log("entre primer if de acualizar")
      
      this.rolesusuariosservice.findusrol(params.idu,params.idr).subscribe(res=>{
        this.auxrolusuarios = res;
        
       
        this.usuariosservices.getUsuario(this.auxrolusuarios.id.idUsuario).subscribe(res=>{
          this.auxusuarios = res;
          this.usuariosEscogidos = {};
        this.usuariosEscogidos.id=this.auxusuarios.idUsuario;
        this.usuariosEscogidos.nombre=this.auxusuarios.nombre+' '+this.auxusuarios.apellido;
            
          
          console.log(this.usuariosEscogidos)
        },err=>console.log(err));

        this.rolesservices.getRol(this.auxrolusuarios.id.idRoles).subscribe(res=>{
          this.rolesEscogidos=res;
          console.log(this.rolesEscogidos)
        },err=>console.log(err))

      },err=>console.log(err))

    }else{
      console.log("no se pudo")
    }
    this.getUsuarios();
    this.getRoles();
  }
    saveRolusuario(){
    if(this.testingreso()){
      this.rolesusuariosservice.saveRolusuario(this.roles_usuarios).subscribe(
        res=>{
          setTimeout(()=>{
            this.notificacion.showSuccess('El Rol del Usuario se agrego correctamente','Rol usuarios Agregado');
          },200);
          this.router.navigate(['/admin/rol-user'])
          
        },error => console.error(error)
      );

    }else{
      console.log("no se pudo")
    }
  }

  updateRolusuario(){
    
    
        if(this.testingreso()){
          this.rolesusuariosservice.updateRolusaurio(this.roles_usuarios.id.idRoles,this.roles_usuarios).subscribe(
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



  async getUsuarios(){
    const user = new Promise (async (resolve,reject)=>{
      await this.usuariosservices.getUsuarios().subscribe(
      res=>{
        resolve(res);
      },error => console.error(error)
    );})
    await user.then(res=>this.usuarios = res);
    //console.log(this.usuarios);
    
    for(let x =0;x < this.usuarios.length;x++){
    
      
      this.nuevosUsuarios[x]={
        id:this.usuarios[x].idUsuario,
        nombre:this.usuarios[x].nombre+' '+this.usuarios[x].apellido
      }
      
    
    }
   console.log(this.nuevosUsuarios)

  }
  

  getRoles(){
    this.rolesservices.getRoles().subscribe(
      res=>{
        this.roles = res;

      },error => console.error(error)
    );
  }
  testingreso(){
    console.log(this.rolesEscogidos.idRoles)
    if(this.usuariosEscogidos.id>0 &&
      this.rolesEscogidos.idRoles>0){
       this.roles_usuarios.id={
         idRoles:this.rolesEscogidos.idRoles,
         idUsuario:this.usuariosEscogidos.id
       }
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
