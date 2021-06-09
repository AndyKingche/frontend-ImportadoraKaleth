import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { auth } from 'firebase/app';
import { resolve } from 'url';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() action:string;
  email: string;
  pass: string;
 // autentificacion: AngularFireAuth;
  constructor(private auth: AngularFireAuth, private ruta : Router) { }

  ngOnInit() {
  }

  logingoogle(){
    try {   
      this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider).then((autentificacion)=>{
        
        if(autentificacion.user.emailVerified){
          this.ruta.navigate(['/login-register']);    
        }
        
      
      }).catch((error)=>{
        console.log("Este es el error");
        console.log(error);
      })
      // this.email='laqm_14@hotmail.com'
      // this.pass='32972546';
      // this.auth.auth.createUserWithEmailAndPassword(this.email,this.pass).then((user)=>{
      //   console.log(user)
      // }).catch((err)=>{console.log(err)})

      
      
     
    } catch (error) {
      console.log("error")
    }
    //this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider);
    
  }

}
