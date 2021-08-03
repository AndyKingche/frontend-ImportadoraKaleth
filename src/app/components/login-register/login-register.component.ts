import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  constructor(private auth: AngularFireAuth,private actived:ActivatedRoute) { }

  ngOnInit() {
   this.Obteneruser();
 
  }

Obteneruser(){
  console.log('si',
  this.auth.user.toPromise().then((user)=>{
    console.log("user",user.providerData);
  }))
}

  loginOut(){
    // this.auth.auth.signOut().then((x)=>{console.log(x)});
    // console.log("si me aplasta");
  
    
  }
   

}
