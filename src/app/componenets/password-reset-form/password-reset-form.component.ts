import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { UsuariosService  } from 'src/app/services/usuarios.service';
@Component({
  selector: 'app-password-reset-form',
  templateUrl: './password-reset-form.component.html',
  styleUrls: ['./password-reset-form.component.css']
})
export class PasswordResetFormComponent implements OnInit {

  usuario:string="";
  password:string="";
  constructor(private activedrouter: ActivatedRoute, private userService:UsuariosService,
    private ruta:Router) { }

  ngOnInit() {
    let usuarioObtenido = this.activedrouter.params;
    console.log(usuarioObtenido);
    usuarioObtenido.subscribe(res=>{
      this.usuario = res.id;
      
    })
  }

  updatePassword(){
    firebase.
    console.log(this.usuario);
    this.userService.updateResetPassword(this.usuario, this.password).subscribe(res=>{
      if(res){
         alert("Contraseña editada con exito");
         this.ruta.navigate(['/login']);
         this.usuario = " ";
         this.password = " ";
      }else{
        alert("vuelva a ingresar la contraseña");
      }
    },err=>console.log(err))
  }



  

}
