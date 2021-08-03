import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { auth } from 'firebase/app';
import { UsuariosService } from  '../../services/usuarios.service';
import { HttpClient, HttpResponse ,HttpHeaders, HttpRequest} from '@angular/common/http';

import { CookieService } from "ngx-cookie-service";
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
 // autentificacion: AngularFireAuth;
  constructor(private auth: AngularFireAuth, private ruta : Router, private userSservice:UsuariosService, private cookieService:CookieService) { }

  ngOnInit() {
  }

logingoogle(){
console.log(this.login)
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
          this.ruta.navigate(['/index.html'])
        }
        
      },err=>console.log(err))
        
      },err=>console.log(err)
      
      
      )

  
    

  }
  logOut() {
    sessionStorage.removeItem('token')
  }

}
