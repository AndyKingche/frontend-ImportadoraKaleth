import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { auth } from 'firebase/app';
import { UsuariosService } from  '../../services/usuarios.service';
import { HttpClient, HttpResponse ,HttpHeaders, HttpRequest} from '@angular/common/http';

import { CookieService } from "ngx-cookie-service";
import * as firebase from 'firebase/app';
import { EmailValidator } from '@angular/forms';
import { AcroFormPasswordField } from 'jspdf';
import { Usuarios } from 'src/app/models/Usuarios';
import { GeneroService } from '../../services/genero.service';
import {  EstadoCivilService } from '../../services/estado-civil.service';
import { Genero } from 'src/app/models/Genero';
import { Estadocivil } from 'src/app/models/Estadocivil';
import { NotificacionService } from "../../services/notificacion.service";
import { Clientes } from '../../models/Clientes';
import { ClientesService } from '../../services/clientes.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() action:string;
  login:any={
    username: '',
    password: ''
  }
 aux : any={
token: null
 }
 clienteNuevo: Clientes={
  idCliente:0,
  apellidoCli:"",
  cedulaCli:"",
  direccionCli:"",
  email:"",
  nombreCli:"",
  telefono:""
 }
 user: Usuarios = {
  apellido: "",
  cedula: "",
  direccion: "",
  email: "",
  estado: "",
  fechanacimiento: "",
  nombre: "",
  password: "",
  telefono: "",
  resetPassword:false,
  estadocivil: { idEstadocivil: 0 },
  genero: { idGenero: 0 },
};
usuarioRecibido: Usuarios = {
  apellido: "",
  cedula: "",
  direccion: "",
  email: "",
  estado: "",
  fechanacimiento: "",
  nombre: "",
  password: "",
  telefono: "",
  resetPassword:false,
  estadocivil: { idEstadocivil: 0 },
  genero: { idGenero: 0 },
};
userUpdateState:Usuarios = {
  apellido: "",
  cedula: "",
  direccion: "",
  email: "",
  estado: "",
  fechanacimiento: "",
  nombre: "",
  password: "",
  telefono: "",
  resetPassword:false,
  estadocivil: { idEstadocivil: 0 },
  genero: { idGenero: 0 },
};
genero:Genero;
estadocivil:Estadocivil;
generoEscogido:any=[];

estadocivilEscogido:any=[];
displayRegister:boolean=false;
verPassword:boolean=false;
displayForgot:boolean=false;
mensaje:string="";
emailRecuperacion:string="";
puedeRegistrarCliente:boolean=false;
 // autentificacion: AngularFireAuth;
  constructor(private auth: AngularFireAuth, private ruta : Router, private userSservice:UsuariosService, private cookieService:CookieService,
    private generoService:GeneroService, private civilService: EstadoCivilService, private notificacion:NotificacionService,
    private clienteService: ClientesService) { }
  
  
  
  regexpresion: RegExp= /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u

  ngOnInit() {
    this.getGenero();
    this.getEstadoCivil();
  }

  verContrase(){
    if(this.verPassword){
      this.verPassword = false;
    }else{
      this.verPassword = true;
    }
  }

  buscarCliente(event:string){
    console.log(event)
    this.clienteService.findClienteByEmail(event).subscribe(res=>{
      if(res!=0){
        this.puedeRegistrarCliente = false;
        this.user.nombre = res[0].nombreCli;
        this.user.apellido = res[0].apellidoCli;
        this.user.cedula = res[0].cedulaCli;
        this.user.direccion = res[0].direccionCli;
        this.user.telefono = res[0].telefono;
      }else{
        this.puedeRegistrarCliente = true;
      }
    })
  }

logingoogle(){
try {
  this.userSservice.loginUser(this.login).subscribe(res=>{
    
    this.aux=res;
    this.userSservice.setToken(this.aux.token);
    


  this.userSservice.getUserByEmail(this.login.username).subscribe(res=>{
    console.log(res[0].idUsuario)

    this.userSservice.updateUserLogged(this.aux.token,res[0].idUsuario).subscribe(
      res=>console.log(res)
      ,err=>console.log(err))

      
    if(res[0].rol == 1){
      this.ruta.navigate(['/admin'])
    }
    if(res[0].rol == 2){
      this.ruta.navigate(['/cashier'])
    }
    if(res[0].rol == 3){
      this.ruta.navigate(['/'])
    }
    
  },err=>console.log(err))
    
  },err=>{
    this.notificacion.showError("Revise su email o su contraseña","***ERROR")
  });
} catch (error) {
  console.log(error);
}
  

  

 

  }
  logOut() {
    this.cookieService.delete('token');
    firebase.auth().signOut();
  }

  showDisplayRegister(){
    this.displayRegister = true;
}

getGenero(){
  this.generoService.getGeneros().subscribe(res=>{
    this.genero = res;
  },err=>console.log(err))
}
getEstadoCivil(){
  this.civilService.getEstadociviles().subscribe(res=>{
    this.estadocivil = res;
  }, err=> console.log(err))
}
async Resgistrar(){
this.user.estado = "true";

this.user.genero.idGenero = this.generoEscogido.idGenero;
this.user.estadocivil.idEstadocivil = this.estadocivilEscogido.idEstadocivil;
this.user.rol = 3;
let emailConsultar : string = this.user.email

const consultarUser = new Promise(async (resolve,reject)=>{
await this.userSservice.getUserByEmail(this.user.email).subscribe(res=>{
  resolve(res[0]);
},err=>console.log(err))
})

let usuarioExistente = await consultarUser.then(res=>res);
console.log(usuarioExistente);

if(usuarioExistente == undefined){
  firebase.auth().createUserWithEmailAndPassword(this.user.email,this.user.password).then(res=>{
    console.log(res);
  })
    const register = new Promise(async (resolve,reject)=>{
    await this.userSservice.registerUserClient(this.user).subscribe(res=>{
      resolve(res); 
    },err=>console.log(err))
  });

  
  this.usuarioRecibido = await register.then(res=>res);
  this.login.username = this.usuarioRecibido.email;
  this.login.password = this.usuarioRecibido.password;
  //Obtener datos de los usuarios y ingresarlos en los clientes
  if(this.puedeRegistrarCliente){
  this.clienteNuevo.nombreCli = this.usuarioRecibido.nombre;
  this.clienteNuevo.apellidoCli = this.usuarioRecibido.apellido;
  this.clienteNuevo.cedulaCli = this.usuarioRecibido.cedula;
  this.clienteNuevo.telefono = this.usuarioRecibido.telefono;
  this.clienteNuevo.direccionCli = this.usuarioRecibido.direccion;
  this.clienteNuevo.email = this.usuarioRecibido.email;
  
  const clienteRegister = new Promise(async (resolve,reject)=>{
    await this.clienteService.saveCliente(this.clienteNuevo).subscribe(res=>{
      resolve(res);
    })
  })

  await clienteRegister.then(res=>res);
  console.log(this.login);
}
  
  const loginUserRegister = new Promise(async(resolve,reject)=>{
    await this.userSservice.loginUser(this.login).subscribe(resultado=>{
      resolve(resultado);          
    },err=>console.log(err))
  })

  this.aux = await loginUserRegister.then(res=>res);
  console.log(this.aux.token)
  this.userSservice.setToken(this.aux.token);

  const getuserRegister = new Promise(async (resolve,reject)=>{

    await this.userSservice.getUserByEmail(this.login.username).subscribe(res=>{
      resolve(res[0])
    },err=>console.log(err))
  })
this.usuarioRecibido = await getuserRegister.then(res=>res); 
console.log(this.usuarioRecibido.idUsuario)

 const updateUserLogin = new Promise(async (resolve,reject)=>{
  await  this.userSservice.updateUserLogged(this.aux.token,Number(this.usuarioRecibido.idUsuario)).subscribe(
    res=>{
      resolve(res);
    }
    ,err=>console.log(err))
 })

 let registroActualizado = await updateUserLogin.then(res=>res);
 console.log(registroActualizado);
 if(registroActualizado){
   this.mensaje = "";
   this.user = {
    apellido: "",
    cedula: "",
    direccion: "",
    email: "",
    estado: "",
    fechanacimiento: "",
    nombre: "",
    password: "",
    telefono: "",
    resetPassword:false,
    estadocivil: { idEstadocivil: 0 },
    genero: { idGenero: 0 },
   }
   this.clienteNuevo={
    idCliente:0,
    apellidoCli:"",
    cedulaCli:"",
    direccionCli:"",
    email:"",
    nombreCli:"",
    telefono:""
   }
   this.puedeRegistrarCliente = false;
  this.ruta.navigate(['/home'])
 }else{
   alert("Problemas al registrar su Usuario")
 }
  
}else{
  this.notificacion.showError(`Ya existe un usuario con ese email ${this.user.email}, Olvidaste la contraseña?`,"*** No se puede realizar el REGISTRO");
  this.mensaje = "Cambiar el email"
}

 
}
showDisplayForgot(){
  if(this.displayForgot){
    this.displayForgot = false;
  }else{
    this.displayForgot = true
  }
}
OnReset(){
  console.log(this.emailRecuperacion);
  firebase.auth().sendPasswordResetEmail(this.emailRecuperacion);
  this.userSservice.getUserByEmail(this.emailRecuperacion).subscribe(res=>{
    if(res[0]){
      this.userUpdateState = res[0];
      this.userUpdateState.resetPassword = true;
  
      this.userSservice.updateUsuario(this.userUpdateState.idUsuario,this.userUpdateState).subscribe(
        res=> {
          this.emailRecuperacion = "";
          this.notificacion.showSuccess("Se ha enviado un correo con un link para recuperar su contraseña","Recuperar Correo");
          this.displayForgot = false;
        }
        
      )
    }else{
      this.emailRecuperacion="";
      this.notificacion.showError("El email ingresado no coincide con ningun usuario en Kaleth Store, vuelva a ingresar el email","***ERROR")
    }
   
  })
}


}
