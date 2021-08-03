import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { auth } from 'firebase/app';
import { UsuariosService } from  '../../services/usuarios.service';
import { HttpClient, HttpResponse ,HttpHeaders, HttpRequest} from '@angular/common/http';
import { TokenInterceptorService } from '../../services/token-interceptor.service';
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
  constructor(private auth: AngularFireAuth, private ruta : Router, private userSservice:UsuariosService
    ,private tokenService:TokenInterceptorService) { }

  ngOnInit() {
  }

  async logingoogle(){
    // try {   
    //   this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider).then((autentificacion)=>{
        
    //     if(autentificacion.user.emailVerified){
    //       this.ruta.navigate(['/login-register']);    
    //     }
        
      
    //   }).catch((error)=>{
    //     console.log("Este es el error");
    //     console.log(error);
    //   })
      
      
      
     
    // } catch (error) {
    //   console.log("error")
    // }
    //this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider);
    console.log(this.login)
    const tokenrecibido = new Promise(async (resolve,reject)=>{
      await this.userSservice.loginUser(this.login).subscribe(res=>{
      resolve(res);
        //console.log(this.userSservice.getToken())
        //this.userSservice.setToken("Bearer "+this.aux.token);
      //console.log(x);
    //  let reqHeader = new HttpHeaders()
    //  .set('Access-Control-Allow-Origin','*')
    //  .set('Authorization',  `Bearer ${this.aux.token}`)
    //  .set('Content-type','application/json')
      
    //  const httpOptions = {
    //   headers: new HttpHeaders({ 
    //     'Access-Control-Allow-Origin':'*',
    //     'Authorization':`Bearer ${this.aux.token}`,
    //     'Content-type':'application/json'
    //   })
    // };
      //localStorage.setItem('currentUser', JSON.stringify(this.aux.token));
        // this.userSservice.getUsers(this.aux.token).subscribe(res=>{
        //   console.log(res)
        // })
  
        //let tokenStr = 'Bearer ' + this.aux.token;
          //sessionStorage.setItem ('token', this.aux.token);
            //sessionStorage.removeItem('token')
  
            //this.ruta.navigate(['/admin'])
            //return res;
      },err=>console.log(err)
      
      
      )

    });

    await tokenrecibido.then(res=>{
      this.aux=res
    //sessionStorage.setItem('token', this.aux.token)
    this.tokenService.authenticate(this.aux.token);
    console.log(res);
    })
  

  }
  logOut() {
    sessionStorage.removeItem('token')
  }

}
