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


declare let $:any;
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
isloading:boolean=false;
disabled:boolean=false;
 // autentificacion: AngularFireAuth;
  constructor(private auth: AngularFireAuth, private ruta : Router, private userSservice:UsuariosService, private cookieService:CookieService,
    private generoService:GeneroService, private civilService: EstadoCivilService, private notificacion:NotificacionService,
    private clienteService: ClientesService) { }
  
  
  
  regexpresion: RegExp= /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u

  async ngOnInit() {
    
  }

  async verUsuarioLogeado(){
    let nuevoTOKEN = this.userSservice.getToken();
    if(nuevoTOKEN){
      
    const userLoged = new Promise(async (resolve,reject)=>{
      await this.userSservice.usuarioSINo(nuevoTOKEN).subscribe(res=>{
        resolve(res)
      },err=>console.log(err))
    });
    let rol = await userLoged.then(res=>res[0].rol);
    if(rol == 1){
      this.ruta.navigate(['/admin'])
    }
    if(rol == 2){
      this.ruta.navigate(['/cashier'])
    }
    if(rol == 3){
      this.ruta.navigate(['/'])
    }
  
    }else{
      //console.log("no hay nadie")
    }
  }

  verContrase(){
    if(this.verPassword){
      this.verPassword = false;
    }else{
      this.verPassword = true;
    }
  }

  buscarCliente(event:string){
    //console.log(event)
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
        this.disabled =true;
      }
    })
  }
  CancelarRegistro(){
    this.user.email='';
    this.user.nombre = '';
    this.user.apellido = '';
    this.user.cedula = '';
    this.user.direccion = '';
    this.user.telefono = '';
    this.displayRegister = false;
    this.disabled = false;
  }
  async buscarCli(){
    //console.log(event)
    let nuevoUsuario;
    if(this.user.email.length>5){
      const UserRegister = new Promise(async (resolve,reject)=>{
        await  this.userSservice.getUserByEmail(this.user.email).subscribe(res=>{
          resolve(res);
        })
       });
  
       await  UserRegister.then(res=>nuevoUsuario = res);
       
      if(Object.keys(nuevoUsuario).length==0){
          this.clienteService.findClienteByEmail(this.user.email).subscribe(res=>{
        if(res!=0){
          this.puedeRegistrarCliente = false;
          this.user.nombre = res[0].nombreCli;
          this.user.apellido = res[0].apellidoCli;
          this.user.cedula = res[0].cedulaCli;
          this.user.direccion = res[0].direccionCli;
          this.user.telefono = res[0].telefono;
          this.disabled =true;
        }else{
          this.puedeRegistrarCliente = true;
          this.disabled =true;
        }
      })
      }else{
        this.notificacion.showError('El email ya se encuentra registrado','**Email ya existe')
      }
    }else{
      this.notificacion.showError('El campo esta vacio o el email no esta correcto','**Email')

    }
    
  }

async logingoogle(){
try {
  this.isloading = true;
  const login = new Promise(async (resolve,reject)=>{
    await this.userSservice.loginUser(this.login).subscribe(res=>{
      if(res){
        resolve(res);
      }else{
        reject(res);
      }
    },err=>reject())
  })
  //obtenemos el objeto token
  this.aux =  await login.then(res=>res);

  //seteamos en las cookies.
  this.userSservice.setToken(this.aux.token);
  //obteneos el id del usuario logeado 
  const obtenerUsuarioLogin = new Promise(async (resolve,reject)=>{
    await this.userSservice.getUserByEmail(this.login.username).subscribe(res=>{
      resolve(res[0].idUsuario);
    });

  });

  //obtenemos el rol del ussuario logeado

  let idUsuario = await obtenerUsuarioLogin.then(res=>res);
  const obtenerROLogin = new Promise(async (resolve,reject)=>{
    await this.userSservice.getUserByEmail(this.login.username).subscribe(res=>{
      resolve(res[0].rol);
    });

  });
  let rol = await obtenerROLogin.then(res=>res)
// una vez que se haya logado obtenemos el token.
    const updateUserLogin = new Promise(async (resolve,reject)=>{
      this.userSservice.updateUserLogged(this.aux.token,Number(idUsuario)).subscribe(
        res=>{resolve(res)}
        )
    })

    

    await updateUserLogin.then(res=>res);
      

    if(rol == 1){
      this.isloading = false;
      this.ruta.navigate(['/admin'])
    }
    if(rol == 2){
      this.isloading = false;
      this.ruta.navigate(['/cashier'])
    }
    if(rol == 3){
      this.isloading = false;
      this.ruta.navigate(['/'])
    }
    

} catch (error) {
  //console.log(error);
  this.notificacion.showError("Las credenciales no coinciden con nuestros usuarios, revisa tu email o tu contraseña","**Kaleth Error")
  this.login={
    username: '',
    password: ''
  }
  this.isloading = false;
}
  
  }
  logOut() {
    this.cookieService.delete('token');
    firebase.auth().signOut();
  }

  showDisplayRegister(){
    this.displayRegister = true;
}

async getGenero(){
  const genero= new Promise(async (resolve,reject)=>{
    await this.generoService.getGeneros().subscribe(res=>{
      resolve(res);
    },err=>console.log(err))
  });

  await genero.then(res=>{
    this.genero = res;

  });
  
}
getEstadoCivil(){
  this.civilService.getEstadociviles().subscribe(res=>{
    this.estadocivil = res;
  }, err=> console.log(err))
}
async Resgistrar(){

this.user.estado = "true";

if(this.user.apellido.length > 0 &&
  this.user.nombre.length>0 &&
  this.user.cedula.length>0 &&
  this.user.direccion.length>0 &&
  this.user.fechanacimiento.length>0 &&
  this.user.email.length>0 &&
  this.user.estado.length>0 &&
  this.user.password.length> 0 &&
  this.user.telefono.length>0 && this.estadocivilEscogido.idEstadocivil > 0 && this.generoEscogido.idGenero > 0){
    this.isloading = true;
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
//console.log(usuarioExistente);

if(usuarioExistente == undefined){
  firebase.auth().createUserWithEmailAndPassword(this.user.email,this.user.password).then(res=>{
    //console.log(res);
  })
    const register = new Promise(async (resolve,reject)=>{
    await this.userSservice.registerUserClient(this.user).subscribe(res=>{
      resolve(res); 
    },err=>console.log(err))
  });

  
  this.usuarioRecibido = await register.then(res=>res);
  this.login.username = this.usuarioRecibido.email;

  this.login.password = this.user.password;
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
  //console.log(this.login);
}
 
  const loginUserRegister = new Promise(async(resolve,reject)=>{
    await this.userSservice.loginUser(this.login).subscribe(resultado=>{
      resolve(resultado);          
    },err=>console.log(err))
  })

  this.aux = await loginUserRegister.then(res=>res);
  //console.log(this.aux.token)
  this.userSservice.setToken(this.aux.token);

  const getuserRegister = new Promise(async (resolve,reject)=>{

    await this.userSservice.getUserByEmail(this.login.username).subscribe(res=>{
      resolve(res[0])
    },err=>console.log(err))
  })
this.usuarioRecibido = await getuserRegister.then(res=>res); 
//console.log(this.usuarioRecibido.idUsuario)

 const updateUserLogin = new Promise(async (resolve,reject)=>{
  await  this.userSservice.updateUserLogged(this.aux.token,Number(this.usuarioRecibido.idUsuario)).subscribe(
    res=>{
      resolve(res);
    }
    ,err=>console.log(err))
 })

 let registroActualizado = await updateUserLogin.then(res=>res);
 //console.log(registroActualizado);
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
   this.login={
    username: '',
    password: ''
  }
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
  };
   this.puedeRegistrarCliente = false;
   this.isloading = false;
  this.ruta.navigate(['/home'])
 }else{
   
   this.notificacion.showError('Error al registrar un usuario', '**ERROR');
   this.isloading = false;
 }
  
}else{
  this.notificacion.showError(`Ya existe un usuario con ese email ${this.user.email}, Olvidaste la contraseña?`,"*** No se puede realizar el REGISTRO");
  this.mensaje = "Cambiar el email";
  this.isloading = false;
}

}else{
  this.notificacion.showError("Llene todos los campos, requeridos","No se puede registrar")
  this.isloading = false;
}
}//fin de metodo resgistrar
showDisplayForgot(){
  if(this.displayForgot){
    this.displayForgot = false;
  }else{
    this.displayForgot = true
  }
}
OnReset(){
  //console.log(this.emailRecuperacion);
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
